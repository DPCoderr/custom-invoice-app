# ImageGen prompts

## Execution

- Mode: built-in ImageGen tool (default skill path)
- Use case: `ui-mockup`
- Calls: one independent generation call per asset, plus targeted review edits; discarded QA iterations were not copied into the project
- Inputs: no reference images
- Output: PNG copied from the built-in generated-images location into this directory

The prompts below are the final prompts used for the committed assets.

## Profile and services prerequisites — desktop

```text
Use case: ui-mockup
Asset type: desktop web application reference mockup
Primary request: create a high-fidelity, implementation-realistic authenticated SaaS screen for the learning-focused Invoice Generator app, combining the business profile prerequisite and reusable services prerequisite on one desktop page.
Scene/backdrop: full 1440px-class desktop browser viewport, white main canvas with a very light neutral gray off-canvas sidebar.
Subject: persistent left sidebar with a simple document icon and the product name "Invoice Generator"; navigation items "Invoices", "Create invoice", "Business profile", and "Services", with "Business profile" active. Main page header reads "Business profile" with supporting copy "Complete your seller details before creating an invoice." Below, use two clean cards: a large "Seller details" form containing labeled inputs "Business name", "Email", "Address line 1", "Address line 2 (optional)", "Postal code", "City", and "Country"; and a "Reusable services" card containing a compact service creation row with "Service name", "Description (optional)", "Default unit price", a small "EUR" suffix, a dark "Add service" button, and an existing-services table with rows "Website development" / "Implementation work per hour" / "€100.00" and "Consulting" / "Architecture review" / "€125.00". Include a dark "Save profile" button for the seller form. Add a subtle prerequisite callout near the top: "Invoice prerequisites" with two checklist items, "Business profile complete" and "At least one service added".
Style/medium: realistic shippable React web product UI, visually matching shadcn/ui base-vega components and Lucide line icons, not concept art, not an illustration.
Composition/framing: landscape desktop screenshot, 16:10 feel, balanced 240px sidebar and spacious centered content, clear page hierarchy, 8px spacing rhythm, restrained cards with 10px radius, thin neutral borders, subtle shadows, readable controls.
Lighting/mood: bright neutral application UI, calm and practical.
Color palette: existing neutral shadcn light theme only: white, near-black, neutral gray, muted gray; dark charcoal primary buttons; a tiny restrained green check accent only for completed prerequisite icons.
Text (verbatim): "Invoice Generator", "Invoices", "Create invoice", "Business profile", "Services", "Complete your seller details before creating an invoice.", "Invoice prerequisites", "Business profile complete", "At least one service added", "Seller details", "Business name", "Email", "Address line 1", "Address line 2 (optional)", "Postal code", "City", "Country", "Save profile", "Reusable services", "Service name", "Description (optional)", "Default unit price", "EUR", "Add service", "Website development", "Implementation work per hour", "€100.00", "Consulting", "Architecture review", "€125.00"
Typography: Inter-like sans serif throughout, legible, natural product UI sizing, no decorative display font.
Constraints: English only; all labels associated visually with their controls; visible keyboard focus ring on one input; clear 44px-class action targets; practical shadcn Card, Input, Select, Button, Table, Separator and Sidebar component appearance; no logos besides the generic document icon; no watermark; render only one coherent browser screen.
Avoid: VAT, tax, discounts, customer management module, invoice status, paid or overdue labels, payment workflow, bank details, KVK numbers, Dutch text, public storage URLs, private storage keys, gradients, glassmorphism, bright brand colors, analytics charts, placeholder lorem ipsum, tiny unreadable text.
```

## Invoice creation — desktop

```text
Use case: ui-mockup
Asset type: desktop web application reference mockup
Primary request: create a high-fidelity, implementation-realistic authenticated "Create invoice" screen for a learning-focused Invoice Generator app, showing a complete multi-line invoice form that maps exactly to the documented MVP create contract.
Scene/backdrop: full 1440px-class desktop browser viewport, white main canvas with very light neutral gray sidebar.
Subject: persistent left sidebar with generic document icon and product name "Invoice Generator"; navigation items "Invoices", "Create invoice", "Business profile", "Services", with "Create invoice" active. Main header "Create invoice" and supporting line "Enter customer details and add at least one invoice line." Use a spacious two-column form: primary left column with cards "Invoice details", "Customer", and "Invoice lines"; narrow right sticky "Summary" card. Invoice details has "Issue date" value "Aug 23, 2026", "Due date" value "Sep 6, 2026", and "Currency" fixed to "EUR". Customer card has labeled fields "Customer name" value "Example Customer B.V.", "Customer email (optional)" value "finance@example.test", "Customer address" value "Main Street 10, 1234 AB Amsterdam, NL", and "Notes (optional)" value "Thank you for your business." Invoice lines contains two editable rows. Row 1: "Service" select value "Website development", "Description" value "Website development", "Unit price" value "100.00", "Quantity" value "8.5", read-only preview "€850.00", and a trash icon action. Row 2: service select value "Consulting", description "Architecture review", unit price "125.00", quantity "2", preview "€250.00", and trash icon. A secondary outline button reads "Add line". Summary lists "2 lines", "Subtotal preview" and "€1,100.00", with helper text "The final total is calculated by the server." Primary action "Create invoice" and secondary "Cancel".
Style/medium: realistic shippable React web product UI matching shadcn/ui base-vega and Lucide icons, not concept art or an illustration.
Composition/framing: landscape desktop screenshot, 16:10 feel, 240px sidebar, centered max-width form, practical card spacing, 10px radius, thin neutral borders, subtle shadow, precise alignment and readable dense controls.
Lighting/mood: bright, quiet, focused productivity UI.
Color palette: existing neutral shadcn light theme only—white, near-black, neutral gray, muted gray; charcoal primary buttons; no colorful branding.
Text (verbatim): "Invoice Generator", "Invoices", "Create invoice", "Business profile", "Services", "Enter customer details and add at least one invoice line.", "Invoice details", "Issue date", "Aug 23, 2026", "Due date", "Sep 6, 2026", "Currency", "EUR", "Customer", "Customer name", "Example Customer B.V.", "Customer email (optional)", "finance@example.test", "Customer address", "Main Street 10, 1234 AB Amsterdam, NL", "Notes (optional)", "Thank you for your business.", "Invoice lines", "Service", "Description", "Unit price", "Quantity", "Website development", "100.00", "8.5", "€850.00", "Consulting", "Architecture review", "125.00", "2", "€250.00", "Add line", "Summary", "2 lines", "Subtotal preview", "€1,100.00", "The final total is calculated by the server.", "Cancel"
Typography: Inter-like sans serif throughout, legible product UI sizing.
Constraints: English only; multiple invoice lines are visually obvious and editable; preserve a final line; visible labels; keyboard focus ring on one control; 44px-class actions; use shadcn Card, Input, Select, Button, Textarea, Separator appearance; no watermark; one coherent browser screen.
Avoid: VAT, tax rates, discounts, tax subtotal, customer selector or customer module, invoice status, payments, paid, overdue, draft, bank details, Dutch, private storage keys, public or signed URLs, client-owned invoice number, gradients, glassmorphism, charts, tiny unreadable text.
```

## Invoice list states — desktop

```text
Use case: ui-mockup
Asset type: desktop web application state-reference mockup
Primary request: create one high-fidelity reference image showing both the populated and empty states of the authenticated "Invoices" list for the learning-focused Invoice Generator app.
Scene/backdrop: a clean neutral presentation canvas containing two separate realistic desktop application frames side by side, each with the same white main area and very light gray compact left sidebar. Add small unobtrusive canvas labels above the frames: "Populated state" and "Empty state". These labels describe the design states, not app navigation.
Subject: both app frames use a generic document icon and product name "Invoice Generator"; sidebar navigation "Invoices", "Create invoice", "Business profile", "Services", with "Invoices" active. Both page headers read "Invoices" and include the primary button "Create invoice". In the populated frame, supporting copy reads "View and download your generated invoices." A shadcn-style table has column headers "Invoice number", "Customer", "Issue date", "Due date", "Total", "PDF", and three rows: "INV-2026-3654B204" / "Example Customer B.V." / "Aug 23, 2026" / "Sep 6, 2026" / "€850.00" / a subtle "Download" action; "INV-2026-22A19C4F" / "Northstar Studio" / "Aug 18, 2026" / "Sep 1, 2026" / "€1,240.00" / "Download"; "INV-2026-19DC726A" / "Riverline Co." / "Aug 12, 2026" / "Aug 26, 2026" / "€375.00" / "Download". Rows appear clickable with a chevron at far right, but no status field. In the empty frame, supporting copy is identical and the table area becomes a centered, bordered empty-state card with a simple outline file icon, headline "No invoices yet", copy "Create your first invoice to see it here.", and dark button "Create invoice".
Style/medium: realistic shippable React web product UI matching shadcn/ui base-vega Table, Button, Sidebar, Card and Lucide line icons; not concept art, not an illustration.
Composition/framing: wide landscape design-state sheet, two complete smaller desktop screens side by side with crisp hierarchy and enough scale for readable core labels; restrained 10px radii, thin neutral borders, subtle shadows, practical spacing.
Lighting/mood: bright, calm, professional.
Color palette: existing neutral shadcn light theme only—white, near-black, neutral gray, muted gray, charcoal primary actions.
Text (verbatim): "Populated state", "Empty state", "Invoice Generator", "Invoices", "Create invoice", "Business profile", "Services", "View and download your generated invoices.", "Invoice number", "Customer", "Issue date", "Due date", "Total", "PDF", "INV-2026-3654B204", "Example Customer B.V.", "Aug 23, 2026", "Sep 6, 2026", "€850.00", "Download", "INV-2026-22A19C4F", "Northstar Studio", "Aug 18, 2026", "Sep 1, 2026", "€1,240.00", "INV-2026-19DC726A", "Riverline Co.", "Aug 12, 2026", "Aug 26, 2026", "€375.00", "No invoices yet", "Create your first invoice to see it here."
Typography: Inter-like sans serif throughout, legible natural application sizing.
Constraints: English only; represent loading/error elsewhere, not in this asset; visible row focus outline on one populated row; semantic table-like alignment; 44px-class primary actions; one invoice-list asset with exactly two state examples; no watermark.
Avoid: invoice status column, status badges, draft, sent, paid, overdue, payments, VAT, tax, discounts, customer management navigation, filters, pagination, analytics, private storage keys, public or signed URLs, Dutch text, bright colors, gradients, glassmorphism, tiny unreadable text.
```

## Invoice detail and PDF download — desktop

```text
Use case: ui-mockup
Asset type: desktop web application reference mockup
Primary request: create a high-fidelity, implementation-realistic authenticated invoice detail screen for the learning-focused Invoice Generator app, focused on immutable seller/customer/line snapshots and the secure PDF download action.
Scene/backdrop: full 1440px-class desktop browser viewport, white main canvas and a very light neutral gray left sidebar.
Subject: persistent sidebar with generic document icon and product name "Invoice Generator"; navigation "Invoices", "Create invoice", "Business profile", "Services", with "Invoices" active. Add a breadcrumb "Invoices / INV-2026-3654B204". Main header shows "INV-2026-3654B204", helper "Created Aug 23, 2026", an outline "Back to invoices" link-button, and a dark primary button with download icon reading "Download PDF". Main content is a balanced two-column desktop detail. Large left card "Invoice" contains dates row "Issue date" / "Aug 23, 2026", "Due date" / "Sep 6, 2026", "Currency" / "EUR"; two compact snapshot panels "From" with "Pixel & Paper Studio", "alex@example.test", "Canal Street 12", "1012 AB Amsterdam, NL", and "Bill to" with "Example Customer B.V.", "finance@example.test", "Main Street 10", "1234 AB Amsterdam, NL"; then a line table with headers "Description", "Unit price", "Quantity", "Line total" and two rows "Website development" / "€100.00" / "8.5" / "€850.00", and "Architecture review" / "€125.00" / "2" / "€250.00". Table footer "Total" / "€1,100.00". Notes section reads "Notes" and "Thank you for your business." Narrow right card "PDF" shows a simple file icon, "PDF ready", supporting copy "Your invoice PDF is ready to download.", metadata labels "Generated" / "Aug 23, 2026 at 2:42 PM", "File size" / "86 KB", and another outline "Download PDF" action. No raw URL is shown.
Style/medium: realistic shippable React web product UI matching shadcn/ui base-vega Card, Table, Button, Breadcrumb, Separator and Lucide icons; not concept art, not a PDF document preview.
Composition/framing: landscape desktop screenshot, 16:10 feel, 240px sidebar, centered detailed content with 2:1 columns, strong whitespace, 10px card radius, thin neutral borders, subtle shadow, tabular numeric alignment.
Lighting/mood: bright, calm, trustworthy productivity UI.
Color palette: existing neutral shadcn light theme only—white, near-black, neutral gray, muted gray, charcoal primary button; one restrained green check dot for PDF-ready confirmation only.
Text (verbatim): "Invoice Generator", "Invoices", "Create invoice", "Business profile", "Services", "INV-2026-3654B204", "Created Aug 23, 2026", "Back to invoices", "Download PDF", "Invoice", "Issue date", "Aug 23, 2026", "Due date", "Sep 6, 2026", "Currency", "EUR", "From", "Pixel & Paper Studio", "alex@example.test", "Canal Street 12", "1012 AB Amsterdam, NL", "Bill to", "Example Customer B.V.", "finance@example.test", "Main Street 10", "1234 AB Amsterdam, NL", "Description", "Unit price", "Quantity", "Line total", "Website development", "€100.00", "8.5", "€850.00", "Architecture review", "€125.00", "2", "€250.00", "Total", "€1,100.00", "Notes", "Thank you for your business.", "PDF", "PDF ready", "Your invoice PDF is ready to download.", "Generated", "Aug 23, 2026 at 2:42 PM", "File size", "86 KB"
Typography: Inter-like sans serif throughout, accessible and legible.
Constraints: English only; semantic-looking table; clear keyboard focus ring on the primary PDF button; 44px-class actions; snapshot content presented read-only; no watermark; one coherent browser screen.
Avoid: invoice status, badges such as paid/draft/overdue/sent, payment actions, VAT, tax, discounts, customer module, edit invoice action, raw storage key, public URL, signed URL, Supabase branding, Dutch, bank details, gradients, glassmorphism, analytics, tiny unreadable text.
```

## Invoice creation — mobile

```text
Use case: ui-mockup
Asset type: mobile web application reference mockup
Primary request: create a high-fidelity, implementation-realistic mobile responsive "Create invoice" screen for the learning-focused Invoice Generator app, showing how the same documented multi-line invoice form adapts to a narrow phone without becoming a desktop form shrunk down.
Scene/backdrop: one centered modern phone viewport on a plain white presentation background; inside the phone use a white application canvas.
Subject: top app bar with hamburger menu button, generic document icon, compact product title "Invoice Generator", and a small circular account avatar. Page title "Create invoice" with supporting text "Enter customer details and add at least one invoice line." Stack collapsible-looking but open shadcn-style sections. "Invoice details" card has full-width labeled date controls "Issue date" value "Aug 23, 2026", "Due date" value "Sep 6, 2026", and read-only "Currency" value "EUR". "Customer" card shows "Customer name" value "Example Customer B.V.", "Customer email (optional)" value "finance@example.test", and a multiline "Customer address" value "Main Street 10, 1234 AB Amsterdam, NL". "Invoice lines" shows two clearly separated vertical line cards with headers "Line 1" and "Line 2". Each line has full-width "Service" select, "Description", then a two-column row "Unit price" and "Quantity", a right-aligned line preview. Line 1 values "Website development", "Website development", "100.00", "8.5", "€850.00"; Line 2 values "Consulting", "Architecture review", "125.00", "2", "€250.00". Each line has a labeled small outline action "Remove line"; below is full-width outline "Add line". Sticky bottom summary bar reads "Total preview" and "€1,100.00" with dark full-width button "Create invoice". Include short helper "Final total calculated by the server."
Style/medium: realistic shippable responsive React web product UI matching shadcn/ui base-vega Input, Select, Card, Button and Lucide line icons; not concept art and not a native iOS design.
Composition/framing: portrait mobile screenshot, approximate 390px-class viewport, vertically scrollable page captured as a tall full-page reference, 16px outer padding, single-column hierarchy, 12px gaps, 10px card radius, thin neutral borders, readable controls, no horizontal scrolling.
Lighting/mood: bright, calm, focused.
Color palette: existing neutral shadcn light theme only—white, near-black, neutral gray, muted gray, charcoal primary button.
Text (verbatim): "Invoice Generator", "Create invoice", "Enter customer details and add at least one invoice line.", "Invoice details", "Issue date", "Aug 23, 2026", "Due date", "Sep 6, 2026", "Currency", "EUR", "Customer", "Customer name", "Example Customer B.V.", "Customer email (optional)", "finance@example.test", "Customer address", "Main Street 10, 1234 AB Amsterdam, NL", "Invoice lines", "Line 1", "Service", "Website development", "Description", "Unit price", "100.00", "Quantity", "8.5", "€850.00", "Remove line", "Line 2", "Consulting", "Architecture review", "125.00", "2", "€250.00", "Add line", "Total preview", "€1,100.00", "Final total calculated by the server."
Typography: Inter-like sans serif throughout, minimum practical mobile readability.
Constraints: English only; 44px minimum touch targets; labels visually associated; visible keyboard focus ring on the first service select; sticky footer does not obscure form content; preserve at least one line; practical responsive stacking; no watermark; one coherent mobile web screen.
Avoid: VAT, tax, discounts, customer selector or customer module, invoice status, draft/sent/paid/overdue, payments, bank details, Dutch, private storage keys, public or signed URLs, bottom-tab navigation, desktop sidebar, tiny text, clipped controls, horizontal scrolling, gradients, glassmorphism, bright brand colors.
```

## Invoice detail — final icon edit

This targeted edit produced the committed invoice-detail PNG from its initial generation.

```text
Use case: precise-object-edit
Asset type: desktop web application reference mockup
Input images: Image 1: edit target, the existing Invoice Generator invoice-detail UI mockup
Primary request: change only the large PDF illustration inside the right-hand "PDF" card. Replace the Acrobat-like symbol with a completely generic neutral outline document icon containing the plain letters "PDF".
Constraints: preserve the entire app layout, exact crop, dimensions, typography, colors, focus ring, sidebar, breadcrumb, buttons, all English copy, invoice number, dates, seller and customer snapshots, table values, totals, notes, PDF metadata, spacing, borders, and shadows unchanged. Keep both "Download PDF" buttons unchanged. Do not add or remove any other element. No brand logo, no watermark.
Avoid: Adobe or Acrobat symbols, Supabase branding, storage URLs, private keys, VAT, discounts, status or payment UI, Dutch text.
```

## Profile and services — completed-state edit

This targeted edit produced the committed profile/services PNG from its initial generation.

```text
Use case: precise-object-edit
Asset type: desktop web application reference mockup
Input images: Image 1: edit target, the existing Invoice Generator business-profile and services prerequisite UI mockup
Primary request: make exactly two scoped corrections. First, populate every required seller field so the green "Business profile complete" prerequisite is truthful: "Business name" = "Pixel & Paper Studio", "Email" = "alex@example.test", "Address line 1" = "Canal Street 12", leave only "Address line 2 (optional)" empty, "Postal code" = "1012 AB", "City" = "Amsterdam", and "Country" = "Netherlands". Second, remove the three-dot overflow/ellipsis action at the far right of each existing service row and use the freed space as clean table whitespace; services are list-only in this MVP.
Constraints: change only the field values and removal of the two service-row ellipsis actions. Preserve the full browser crop, URL bar, sidebar, active navigation, avatar, all headings and English labels, green prerequisite checkmarks, form structure, service creation controls, two existing service rows and values, colors, Inter-like typography, focus ring, spacing, borders, and shadows. Keep "Save profile" and "Add service" unchanged. No other new action or field. No watermark.
Avoid: edit or delete service actions, kebab menus, overflow icons, VAT, tax, discounts, customer module, status/payment UI, Dutch text, storage URLs, private keys, new branding or logos.
```

## Invoice creation mobile — notes edit

This targeted edit produced the committed mobile PNG from its initial generation.

```text
Use case: precise-object-edit
Asset type: mobile web application reference mockup
Input images: Image 1: edit target, the existing Invoice Generator mobile create-invoice UI mockup
Primary request: add one visible, full-width multiline control labeled "Notes (optional)" with the value "Thank you for your business." inside the "Customer" card, directly below the existing "Customer address" control and before the "Invoice lines" card.
Constraints: preserve the complete phone frame, responsive single-column layout, all existing English copy and values, invoice detail fields, customer fields, both line-item cards and their controls/values, focus ring, add/remove actions, sticky total preview, server-authority helper, and "Create invoice" action. Reflow vertically as needed so the new notes textarea is fully visible, nothing overlaps the sticky total, no content is clipped, and there is no horizontal scrolling. Maintain 16px-class page padding, readable Inter-like typography, 44px touch targets, neutral shadcn base-vega styling, thin borders, spacing rhythm, and white background. Change nothing else. No watermark.
Avoid: horizontal overflow, clipped form controls, tiny text, VAT, tax, discounts, customer selector/module, invoice status, payment workflow, Dutch, storage URLs, private keys, desktop sidebar, bottom-tab navigation, gradients or bright colors.
```

## Invoice creation mobile — footer-clearance edit

This final vertical outpaint produced the committed mobile PNG from the content-correct notes asset.

```text
Use case: precise-object-edit
Asset type: mobile web application reference mockup
Input images: Image 1: edit target, the original content-correct Invoice Generator mobile create-invoice UI mockup
Primary request: perform a vertical canvas/phone-viewport extension only. Preserve the entire existing form and every pixel of its UI content through the complete "Add line" button. Extend the phone viewport and surrounding canvas downward by enough neutral space, approximately 72–96px, then move only the sticky "Total preview" / "Create invoice" footer and phone home indicator into that newly extended bottom area. The complete 44px Add line button, including its exact plus icon, exact "Add line" label, full bottom border, and 12–16px of whitespace below it, must be fully visible above the sticky footer.
Constraints: do not re-render, retype, compress, remove, replace, or reflow any form field or action above the footer. Preserve exact original English text and values, Notes (optional), both invoice lines, both exact "Remove line" buttons, exact "Add line" button, focus ring, colors, widths, spacing, and typography. Preserve phone width and no horizontal scrolling. Only add vertical bottom canvas/phone space and reposition the sticky footer/home indicator downward. No clipping, overlap, malformed text, missing controls, or watermark.
Avoid: modifying any label or value, deleting actions, shrinking controls, footer overlap, horizontal overflow, VAT, discounts, status/payment UI, Dutch, storage URLs, new colors or branding.
```
