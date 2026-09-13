# Invoice Generator UI direction

Build directly from [Pages](../PAGES.md) using the [Astra-high workflow](../FRONTEND-WORKFLOW.md).
Refine the actual interface during implementation and inspect the rendered result on mobile,
tablet, and desktop. No generated mockup or advance design approval is required.

The existing mockups and generation record are optional historical reference material, not
required deliverables or fixed pixel specifications. Preserve these assets. The current page
specifications and contracts govern behavior. Build the landing last using screenshots of the
implemented app with fictitious records; keep explanatory copy and CTAs as responsive HTML.

## Product direction

- Keep the interface quiet, practical, and document-focused. Use the existing Inter variable font,
  shadcn `base-vega` styling, neutral light-theme tokens, thin borders, and restrained shadows.
- Use a persistent desktop sidebar for `Dashboard`, `Invoices`, `Customers`, `Services`, and
  `Business profile`, with a prominent `Create invoice` action. On mobile, use the off-canvas sheet.
- Treat invoice creation as the primary journey. A profile is required; customers and services
  are reusable helpers, with manual invoice entry available when their lists are empty.
- Use a centered content column with page title, one-line description, and a clear primary action.
  Prefer cards only where they group a meaningful form section or read-only snapshot.
- Give the public landing page one focused promise, direct account/login actions, and readable
  screenshots of implemented features. On mobile, recompose it as one column with full-width
  actions and appropriately cropped/resized screenshots instead of shrinking the desktop hero.
- Use English only. Do not introduce tax, VAT, discounts, invoice statuses,
  payment workflows, or storage details.

## Information architecture

```text
Authenticated shell
|-- Dashboard
|-- Invoices
|   |-- Empty or populated list
|   `-- Invoice detail -> authorized PDF download
|-- Create invoice
|-- Customers
|-- Business profile
`-- Services
```

Historical desktop references combine profile and services; the implementation uses their separate
specified routes and can reuse the profile completion callout.

## Component mapping

| UI pattern | Existing shadcn primitive(s) | Behavior note |
| --- | --- | --- |
| Authenticated navigation | `Sidebar`, `SidebarMenuButton`, `Sheet` | Active item uses the subtle neutral accent; mobile uses the off-canvas sheet. |
| Page structure | `SidebarInset`, semantic `main`, existing layout wrappers | Keep one `h1`; page actions follow the title on desktop and stack on narrow screens. |
| Form sections | Existing `Card`, `Field`, `Label`, `Input`, and `Select`; add a shadcn `Textarea` during the relevant frontend ticket | Labels remain visible; optional fields are marked in the label. `Textarea` is not currently present in the repository. |
| Dates | Existing form date picker and `Popover`/`Calendar` | Display localized dates; requests still map to local `yyyy-MM-dd`. |
| Invoice lines | `Card`, `Select`, `Input`, `Button`, `Separator` | Desktop uses a compact row; mobile turns every line into a vertical card. |
| Invoice list | `Table`, `Button` or semantic link | Provide clear detail navigation; the PDF download action lives on detail. |
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
  dates, total, and detail navigation; keep the detail page's PDF action explicitly named.
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

## Historical reference assets (optional)

| Asset | Intent | Visual QA |
| --- | --- | --- |
| `landing-hero-desktop.png` | Public desktop landing hero | Account/login actions and focused MVP promise sit beside the same professional invoice-paper result presentation used on mobile. |
| `landing-hero-mobile.png` | Public mobile landing hero | One focused account CTA owns conversion; the user-selected invoice paper retains seller, date, bill-to, table headers, line items, and a restrained total band without a second action. |
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
evidence into a quiet result area without a second CTA. The user-selected professional invoice-paper
direction—with metadata, bill-to hierarchy, table, and total—now appears consistently on mobile and
desktop. Other targeted edits replaced a
brand-like PDF symbol, corrected completed profile/service state, and replaced the rejected
full-page mobile capture with a standard-height, task-focused viewport using accessible sizing.
No CLI/API fallback or production UI code was used. The exact committed-asset prompt set is in
`IMAGEGEN_PROMPTS.md`.
