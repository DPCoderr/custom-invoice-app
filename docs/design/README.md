# Invoice Generator UI direction

These mockups are implementation references for the learning MVP. They illustrate hierarchy,
responsive behavior, and component composition; the contracts in `docs/REQUIREMENTS.md` remain
the source of truth.

## Product direction

- Keep the interface quiet, practical, and document-focused. Use the existing Inter variable font,
  shadcn `base-vega` styling, neutral light-theme tokens, thin borders, and restrained shadows.
- Use a persistent desktop sidebar for `Invoices`, `Create invoice`, `Business profile`, and
  `Services`. On mobile, replace it with the existing off-canvas sheet triggered from the top bar.
- Treat invoice creation as the primary journey. Profile and services are prerequisites, not
  separate administration products.
- Use a centered content column with page title, one-line description, and a clear primary action.
  Prefer cards only where they group a meaningful form section or read-only snapshot.
- Give the public landing page one focused promise, direct account/login actions, and a readable
  product preview. On mobile, recompose it as one column with full-width actions instead of scaling
  down the desktop hero.
- Use English only. Do not introduce tax, VAT, discounts, a customer module, invoice statuses,
  payment workflows, or storage details.

## Information architecture

```text
Authenticated shell
|-- Invoices
|   |-- Empty or populated list
|   `-- Invoice detail -> authorized PDF download
|-- Create invoice
|-- Business profile
`-- Services
```

The desktop references show profile and services together to explain the prerequisite relationship.
The implementation may keep them as separate routes while reusing the same completion callout.

## Component mapping

| UI pattern | Existing shadcn primitive(s) | Behavior note |
| --- | --- | --- |
| Authenticated navigation | `Sidebar`, `SidebarMenuButton`, `Sheet` | Active item uses the subtle neutral accent; mobile uses the off-canvas sheet. |
| Page structure | `SidebarInset`, semantic `main`, existing layout wrappers | Keep one `h1`; page actions follow the title on desktop and stack on narrow screens. |
| Form sections | Existing `Card`, `Field`, `Label`, `Input`, and `Select`; add a shadcn `Textarea` during the relevant frontend ticket | Labels remain visible; optional fields are marked in the label. `Textarea` is not currently present in the repository. |
| Dates | Existing form date picker and `Popover`/`Calendar` | Display localized dates; requests still map to local `yyyy-MM-dd`. |
| Invoice lines | `Card`, `Select`, `Input`, `Button`, `Separator` | Desktop uses a compact row; mobile turns every line into a vertical card. |
| Invoice list | `Table`, `Button` or semantic link | Whole-row detail navigation must not hide the separately named PDF action. |
| Empty state | `Card`, Lucide file icon, `Button` | State explains what is missing and offers one direct action. |
| Invoice detail | `Breadcrumb`, `Card`, `Table`, `Separator`, `Button` | Snapshot fields are read-only; download points to the owned API endpoint. |
| Feedback | `Skeleton`, inline error region, `Sonner` | Provide loading, error, empty, and success states; a toast is never the only error detail. |

## Responsive behavior

- **Desktop (1024 px and wider):** show the sidebar. Use a two-column invoice-create layout with a
  sticky summary and a two-column invoice-detail layout with a narrow PDF card.
- **Tablet (768-1023 px):** collapse the sidebar to the sheet, keep form sections full width, and
  move summary/PDF cards below the primary content when space is tight.
- **Mobile (below 768 px):** use 16 px page padding, 16 px input text, 48-52 px controls,
  full-width fields and actions, and a bottom summary that respects the device safe area. Do not
  shrink a full desktop-length form into one screen: earlier sections scroll out of view while the
  active section receives normal viewport space.
- Tables may become stacked summary rows on small screens. Preserve invoice number, customer,
  dates, total, detail navigation, and an explicitly named PDF action.
- Never shrink desktop controls until labels or values become unreadable; reflow before reducing
  type size.

## Accessibility requirements

- Associate every visible label with its control and expose optional/required state in text.
- Preserve logical DOM and tab order, visible focus rings, keyboard-operable selects/date pickers,
  and named icon actions.
- Use semantic links for navigation and buttons for actions. Give delete-line controls an accessible
  name containing the line number.
- Announce added/removed invoice lines and form/server errors. Move focus to the first invalid field
  after submit while retaining a root error summary.
- Keep contrast on the existing neutral tokens; color alone must not communicate prerequisite or PDF
  readiness.
- Use table semantics on desktop and retain equivalent label/value relationships in mobile rows.

## Reference assets

| Asset | Intent | Visual QA |
| --- | --- | --- |
| `landing-hero-desktop.png` | Public desktop landing hero | Account/login actions, focused MVP promise, readable create-invoice preview, and restrained value summary use the existing neutral visual system. |
| `landing-hero-mobile.png` | Public mobile landing hero | One focused account CTA owns conversion; a full-width gray result section and narrower invoice document provide product evidence without repeating the CTA/card pattern. |
| `profile-services-prerequisites-desktop.png` | Profile plus reusable-service prerequisites | Every required seller value is populated consistently with the completed check; service rows are read-only and expose no overflow/edit/delete action. |
| `invoice-create-desktop.png` | Complete desktop create form with two editable lines | Two-line layout, dates, EUR preview, server-authority helper, and actions are clear. |
| `invoice-list-states-desktop.png` | Populated and empty list states | Both states share one navigation hierarchy; row focus and named download actions are visible; no status column exists. |
| `invoice-detail-desktop.png` | Read-only snapshots and PDF download | Seller/customer snapshots, line totals, PDF metadata, and focus-visible download action are legible; no storage URL/key is shown. |
| `invoice-create-mobile.png` | Usable narrow-screen create-form viewport | The mid-scroll reference gives active fields 16px text and 48-52px targets; `Add line` is full width with clear spacing above a non-overlapping safe-area footer. |

Visual QA was performed at original generated resolution. These bitmap references are not pixel
specifications, and generated copy should be checked against locale resources during implementation.
The invoice-list asset intentionally presents two design states on one reference canvas.

## Generation record

All seven PNGs were generated with the built-in ImageGen tool. The landing hero has separate desktop
and mobile compositions rather than one scaled layout. Targeted edits removed a redundant mobile
login action, brought interactive elements to an accessible scale, and separated the mobile product
evidence into a quiet gray result section without a second CTA. Other targeted edits replaced a
brand-like PDF symbol, corrected completed profile/service state, and replaced the rejected
full-page mobile capture with a standard-height, task-focused viewport using accessible sizing.
No CLI/API fallback or production UI code was used. The exact committed-asset prompt set is in
`IMAGEGEN_PROMPTS.md`.
