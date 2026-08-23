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
- **Mobile (below 768 px):** use 16 px page padding, a single column, at least 44 px touch targets,
  vertical line-item cards, and a bottom summary action that never obscures form content.
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
| `profile-services-prerequisites-desktop.png` | Profile plus reusable-service prerequisites | Every required seller value is populated consistently with the completed check; service rows are read-only and expose no overflow/edit/delete action. |
| `invoice-create-desktop.png` | Complete desktop create form with two editable lines | Two-line layout, dates, EUR preview, server-authority helper, and actions are clear. |
| `invoice-list-states-desktop.png` | Populated and empty list states | Both states share one navigation hierarchy; row focus and named download actions are visible; no status column exists. |
| `invoice-detail-desktop.png` | Read-only snapshots and PDF download | Seller/customer snapshots, line totals, PDF metadata, and focus-visible download action are legible; no storage URL/key is shown. |
| `invoice-create-mobile.png` | Narrow-screen create-form reflow | Customer notes, both line cards, and actions remain visible without horizontal scrolling; the complete 44px `Add line` button, bottom border, and clear gap sit above the sticky total/action footer. |

Visual QA was performed at original generated resolution. These bitmap references are not pixel
specifications, and generated copy should be checked against locale resources during implementation.
The invoice-list asset intentionally presents two design states on one reference canvas.

## Generation record

All five PNGs were generated with the built-in ImageGen tool in `ui-mockup` mode, one initial call
per distinct asset. Built-in targeted edits replaced a brand-like PDF symbol, corrected completed
profile/service state, and added mobile notes without changing the overall visual system. No CLI/API
fallback or production UI code was used. A final vertical outpaint removed the mobile footer overlap
without changing form content. The exact committed-asset prompt set is in `IMAGEGEN_PROMPTS.md`.
