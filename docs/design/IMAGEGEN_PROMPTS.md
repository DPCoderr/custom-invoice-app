# ImageGen prompts

## Execution

- Mode: built-in ImageGen tool (default skill path)
- Use case: `ui-mockup`
- Calls: one independent generation call per asset, plus targeted review edits; discarded QA iterations were not copied into the project
- Inputs: no reference images
- Output: PNG copied from the built-in generated-images location into this directory

The prompts below are the final prompts used for the committed assets.

## Public landing hero — desktop

```text
Use case: ui-mockup
Asset type: desktop public landing-page hero reference mockup
Primary request: create a high-fidelity, implementation-realistic desktop hero page for the learning-focused Invoice Generator SaaS app. It should feel polished, calm, trustworthy, and achievable with the existing React, Tailwind, shadcn/ui base-vega, Lucide, and Inter stack.
Scene/backdrop: full 1440px-class desktop browser viewport, bright white canvas with very subtle neutral-gray section separation; no browser chrome.
Header: centered max-width navigation, 72px high. Left: generic outline document icon and exact product name "Invoice Generator". Right: quiet action "Log in" and dark primary action "Create account", both 44-48px high.
Hero composition: spacious two-column layout. Left uses eyebrow "Simple invoicing for independent work", 56-64px headline "Create clear invoices without the clutter.", and paragraph "Set up your business profile, reuse services, and generate downloadable PDF invoices in one focused workflow." Add 48px actions "Create account" and "Log in", then three check labels: "Reusable services", "Server-calculated totals", and "Secure PDF download".
Product preview: right column contains a large readable "Create invoice" UI card with "Example Customer B.V.", line summaries "Website development" / "8.5 × €100.00" / "€850.00" and "Architecture review" / "2 × €125.00" / "€250.00", "Total" / "€1,100.00", and "Create invoice". A subtle background card may show "Invoice prerequisites", "Business profile complete", and "Service added".
Lower edge: begin a three-column value section with "Set up once", "Reuse services", and "Download PDFs" plus one short supporting line each.
Style: realistic shippable shadcn/ui base-vega web UI with Lucide line icons; neutral white, charcoal, and gray palette; Inter-like type; subtle borders, 10-12px radii, restrained shadows, and one visible CTA focus ring.
Constraints: English only; accessible contrast; readable product preview; one coherent desktop viewport; no watermark.
Avoid: VAT, tax, discounts, customer-management module, invoice status or payment workflows, recurring invoices, email delivery, bank details, analytics, testimonials, fake logos, Dutch, storage URLs or keys, gradients, glassmorphism, bright branding, tiny preview text, exaggerated claims.
```

## Public landing hero — mobile

```text
Use case: ui-mockup
Asset type: mobile public landing-page hero reference mockup
Primary request: create a high-fidelity, genuinely mobile-first hero page for the same learning-focused Invoice Generator app. Do not shrink the desktop mockup; use a clear single-column hierarchy for a normal 390px-class phone viewport.
Scene/backdrop: one centered standard-height phone viewport on a plain white presentation background; white responsive web page inside.
Header: 64px high with at least 16px padding. Left shows a generic document icon and "Invoice Generator" in readable 18px-class type; right shows a 44-48px "Log in" action.
Hero: small eyebrow "Simple invoicing for independent work"; wrapping-friendly 38-42px headline "Create clear invoices without the clutter."; readable paragraph "Set up your business profile, reuse services, and generate downloadable PDF invoices in one focused workflow." Add full-width 52px actions "Create account" and "Log in", then check labels "Reusable services", "Server-calculated totals", and "Secure PDF download", wrapping rather than shrinking.
Product preview: below the actions, show a readable mobile card "Invoice preview" with "Example Customer B.V.", "Website development — €850.00", "Architecture review — €250.00", "Total — €1,100.00", and a 48px action "Create invoice". Natural continuation below the fold is allowed; no sticky overlap.
Style: realistic shippable mobile shadcn/ui base-vega UI, neutral white/charcoal/gray palette, Inter-like type, thin borders, restrained green checks, 16px side padding, 16-20px card padding, and 12-16px gaps.
Constraints: English only; standard-height viewport; body at least 17-18px visually; support labels at least 14px; controls 48-52px; accessible contrast; no horizontal scrolling, tiny copy, overlap, edge-cramped actions, or watermark.
Avoid: desktop two-column layout, tiny product screenshot, VAT, tax, discounts, customer-management module, invoice status or payment workflows, recurring invoices, email delivery, bank details, testimonials, fake logos, Dutch, storage URLs or keys, gradients, glassmorphism, bright branding, bottom tabs, exaggerated claims.
```

## Public landing hero mobile — accessibility sizing edit

```text
Use case: precise-object-edit
Asset type: accessible mobile public landing-page hero reference mockup
Input images: Image 1 is the first mobile hero and visual-system reference.
Primary request: preserve the content, English copy, phone width, single-column hierarchy, and neutral styling while correcting proportional accessibility sizing for a screen approximately 760 source pixels wide representing a 390px CSS viewport at about 1.95x scale.
Sizing: make the header Log in target 88-96 source pixels high; both hero actions 100-104 source pixels high; reassurance labels at least 28-30 source pixels with 40-44 source-pixel check icons; invoice-preview heading 36 source pixels; customer and line text 28-32 source pixels; total 32-36 source pixels; and preview Create invoice action 96-104 source pixels high. Keep at least 32 source pixels side padding and 24-32 source pixels between actions.
Composition: reflow vertically and reduce only decorative empty space. Natural continuation below the fold is allowed, but every visible element must be complete. Keep a standard-height phone rather than a full-page capture.
Constraints: preserve all exact strings, visible focus ring, neutral shadcn appearance, document icon, and readable invoice data; no overlap, clipping, horizontal overflow, tiny copy, or watermark.
Avoid: new features, VAT, tax, discounts, customer-management module, status/payment UI, recurring invoices, email delivery, Dutch, storage URLs or keys, gradients, bright branding, bottom tabs.
```

## Public landing hero mobile — final preview sizing edit

```text
Use case: precise-object-edit
Asset type: accessible mobile public landing-page hero reference mockup
Input images: Image 1 is the accessibility-edited mobile hero.
Primary request: preserve the header, hero, both primary actions, exact copy, phone size, focus ring, and neutral hierarchy while enlarging only the reassurance labels and invoice-preview card.
Sizing: reassurance-label glyphs 34-36 source pixels with 44-48 source-pixel check icons; Invoice preview heading 40 source pixels; customer 34-36; line descriptions and amounts 32-34; total 36-38; Create invoice action 104 source pixels high with 34-36 source-pixel text.
Composition: make room only by reducing decorative blank space above the reassurance rows, before the preview, and inside the card. Retain at least 24 source pixels between readable rows and 32 source pixels side padding. Keep the complete preview and action above the safe area.
Constraints: exact English strings and values unchanged; no clipping, overlap, horizontal overflow, malformed text, tiny copy, or watermark.
Avoid: new content, VAT, tax, discounts, customer-management module, status/payment UI, recurring invoices, email delivery, Dutch, storage URLs or keys, gradients, bright branding, bottom tabs.
```

## Public landing hero mobile — final CTA hierarchy edit

```text
Use case: precise-object-edit
Asset type: accessible mobile public landing-page hero reference mockup
Input images: Image 1 is the preview-sizing mobile hero.
Primary request: remove only the redundant full-width hero Log in button because Log in remains clearly available in the header. Move the reassurance list and invoice preview upward, then use the freed space for unambiguously readable preview typography and controls.
Sizing: Invoice preview heading 40 source pixels; customer 36; line descriptions and amounts 34; total 38; bottom Create invoice action 104 source pixels high with 36 source-pixel text. Maintain at least 32 source pixels between rows and at least 32 source pixels side padding.
Constraints: preserve the header Log in, focused Create account action, all exact hero and invoice copy, phone dimensions, neutral shadcn styling, safe area, and home indicator. Keep the complete preview and action visible with no clipping, overlap, horizontal overflow, malformed text, new content, or watermark.
Avoid: a second hero Log in action, VAT, tax, discounts, customer-management module, status/payment UI, recurring invoices, email delivery, Dutch, storage URLs or keys, gradients, bright branding, bottom tabs.
```

## Public landing hero mobile — result-section edit

```text
Use case: precise-object-edit
Asset type: mobile public landing-page hero reference mockup
Input images: Image 1 is the accessible mobile hero edit target.
Primary request: preserve the complete header, eyebrow, headline, paragraph, focused Create account action, and three reassurance labels. Replace everything below the reassurance labels so the hero and product evidence no longer look like two repeated CTA cards.
Composition: remove the bordered Invoice preview application card, document-icon tile, and its Create invoice button. There must be only one dark CTA on the page. Introduce a full-width very-light-neutral-gray result section with generous top padding and caption "A clean invoice, ready to download." Center a narrower white paper document, about 78-82% of the content width, with near-square corners and subtle paper shadow.
Document content: uppercase "INVOICE", "Example Customer B.V.", rows "Website development" / "€850.00" and "Architecture review" / "€250.00", a thin rule, and bold "Total" / "€1,100.00". Use document-like margins and tabular alignment. No button, card header, icon tile, form control, or action inside the preview.
Visual hierarchy: the white hero ends after the benefit checks; the gray full-width section creates a clear sectional change. The narrower document is secondary product evidence, not a second conversion block.
Constraints: preserve phone dimensions, header Log in, hero sizing, Create account focus ring, benefit labels, neutral shadcn/Inter direction, English copy, exact values, and safe area. Every visible row is complete and readable; no overlap, horizontal overflow, malformed text, or watermark.
Avoid: a second CTA, any preview button, the phrase Invoice preview, a large rounded application card, VAT, tax, discounts, customer-management module, status/payment UI, recurring invoices, email delivery, Dutch, storage URLs or keys, gradients, bright branding, bottom tabs.
```

## Public landing hero mobile — professional invoice edit

```text
Use case: precise-object-edit
Asset type: professional invoice-document preview inside a mobile landing-page hero
Input images: Image 1 is the result-section mobile hero.
Primary request: preserve the entire phone, hero, single Create account action, benefits, gray section, and caption. Edit only the white invoice paper so it is cleaner, more polished, and professional while matching the neutral shadcn/Inter visual language.
Document treatment: narrow white paper at 82-84% of the phone content width, 4-6px radius, hairline border, generous margins, and refined soft paper shadow.
Layout: top row with generic document mark and "Pixel & Paper Studio" left and uppercase "INVOICE" right; metadata "INV-2026-3654B204" and "Aug 23, 2026"; label "BILL TO" and bold "Example Customer B.V."; a light-neutral table header with "DESCRIPTION" and "AMOUNT"; rows "Website development" / "€850.00" and "Architecture review" / "€250.00"; then a strong rule or pale summary band with bold "Total" / "€1,100.00".
Sizing: document labels at least 28 source pixels; headings and total 32-38 source pixels; aligned tabular numbers; every visible row complete and readable.
Constraints: edit only the invoice paper and content; no button or control; preserve exactly one dark page action; English only; exact values; no clipping, malformed text, overlap, horizontal overflow, extra logo, brand color, or watermark.
Avoid: application-card header, large rounded card, preview CTA, VAT, tax, discounts, invoice status, payment terms/workflow, bank details, QR code, customer-management module, Dutch, storage URLs or keys, gradients, bright colors, fake logos.
```

## Public landing hero mobile — invoice readability edit

```text
Use case: precise-object-edit
Asset type: accessible professional invoice-document preview in mobile landing hero
Input images: Image 1 is the professional invoice-paper hero.
Primary request: preserve the complete page, professional document structure, exact text, and single-CTA hierarchy while increasing only the invoice paper and typography for 390px-class readability.
Scale: enlarge the paper to 88% of the content width while retaining gray space, paper corners, border, and shadow. Seller 34-36 source pixels; INVOICE 40-42; invoice number/date 30-32; BILL TO and table headers 28-30; customer 34-36; rows 32-34; total 38-40; icon 44-48. Use compact 20-28 source-pixel spacing rather than shrinking text.
Constraints: amounts remain right-aligned; every row and total band is visible above the home indicator; change nothing outside the invoice paper except a small upward reposition; exact copy and values; one dark page action; no clipping, overlap, horizontal overflow, malformed text, tiny metadata, or watermark.
Avoid: new content, preview button, application-card styling, VAT, tax, discounts, status/payment UI, bank details, QR code, customer-management module, Dutch, storage URLs or keys, gradients, bright colors, fake logos.
```

## Public landing hero mobile — simplified readable invoice edit

```text
Use case: precise-object-edit
Asset type: highly readable professional invoice-document preview in mobile landing hero
Input images: Image 1 is the invoice-readability hero.
Primary request: preserve the full header, hero, Create account action, and benefits. Simplify and enlarge only the invoice-document area for genuine 390px-class readability.
Composition: remove the result caption and internal document icon. Move the paper upward, enlarge it to 92-94% of the phone content width, and retain a thin border, subtle shadow, and near-square corners.
Layout and scale: header "Pixel & Paper Studio" 44-48 source pixels and "INVOICE" 56-60; metadata number/date 40-44; compact bill-to label 36-40 plus customer 44-48; table headers 36-40; rows 42-46; total 48-52. Use 16-20 source-pixel gaps and 24-28 source-pixel paper padding.
Constraints: exact English copy and values; all rows and total visible above the home indicator; only one dark page CTA; no caption, internal icon, preview button, clipping, overlap, malformed text, horizontal overflow, or watermark.
Avoid: small metadata, app-card controls, VAT, tax, discounts, status/payment UI, bank details, QR code, customer-management module, Dutch, storage URLs or keys, gradients, bright colors, fake logos.
```

## Public landing hero mobile — minimal invoice edit

```text
Use case: precise-object-edit
Asset type: minimal professional invoice-document preview in mobile landing hero
Input images: Image 1 is the readable professional invoice hero.
Primary request: preserve the page outside the invoice paper. Remove the date, standalone BILL TO label, and DESCRIPTION/AMOUNT table header so the document can use large mobile-readable typography.
Document content: header "Pixel & Paper Studio" and "INVOICE"; number "INV-2026-3654B204"; one customer row "Bill to · Example Customer B.V."; rows "Website development" / "€850.00" and "Architecture review" / "€250.00"; then a top rule and pale total band "Total" / "€1,100.00".
Scale: paper 92-94% of content width; seller 52-56 source pixels; INVOICE 64-70; number 44-48; customer 52-56; rows 50-54; total 58-62. Use 24-32 source-pixel row gaps, right-aligned amounts, thin separators, subtle border/shadow, and near-square corners.
Constraints: exact copy and amounts; no other metadata/label; every rendered glyph at least 28 source pixels and body at least 31; all content above home indicator; one dark page CTA; no clipping, overlap, malformed text, horizontal overflow, or watermark.
Avoid: date, standalone BILL TO, table headers, tiny text, preview button, app controls, VAT, tax, discounts, status/payment UI, bank details, QR code, customer-management module, Dutch, storage URLs or keys, gradients, bright colors, fake logos.
```

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
Use case: precise-object-edit
Asset type: mobile web application reference mockup
Input images: Image 1 is the rejected first revision and visual-system reference.
Primary request: correct the proportional accessibility sizing. The phone interior is approximately 786 source pixels wide and represents a 390px CSS viewport at roughly 2x scale. Every input, select, and button must therefore be visibly 96-104 source pixels high, representing 48-52 CSS pixels. Labels must be about 28-32 source pixels high, input values about 32 source pixels high, and icons 40-48 source pixels.
Composition: show a standard-height mobile viewport farther down the scroll position. Keep the 56px-class app bar with a large hamburger target, generic document icon, "Invoice Generator", and avatar. Earlier page sections are above the viewport; start visible content with expanded heading "Invoice lines" and a generous "Line 1" card. Do not shrink controls to show earlier content.
Line card: use full-width, 96-104 source-pixel-high controls for "Service" / "Website development", "Description" / "Website development", "Unit price" / "100.00", and "Quantity" / "8.5". Do not place fields side by side. Show "€850.00" and a full-width 96-104 source-pixel-high "Remove line 1" button. Below, leave at least 32 source pixels of whitespace and add a full-width 96-104 source-pixel-high "Add line" button.
Footer: leave at least 32 source pixels between Add line and a non-overlapping sticky footer. Show "Total preview", "€850.00", helper "Final total calculated by the server.", and a full-width dark 104 source-pixel-high "Create invoice" button with device safe-area clearance.
Spacing and style: use 32 source-pixel horizontal page padding, 32-40 source-pixel card padding, 24-32 source-pixel gaps, Inter-like typography, neutral shadcn colors, thin borders, and 10-12px radii. Keep a visible blue focus ring on Service.
Constraints: all interactive targets, including hamburger, fields, Remove line 1, Add line, and Create invoice, meet the explicit source-pixel height; English only; no clipping, overlap, horizontal overflow, tiny helper copy, or edge-cramped action. This is visual direction, not a contract.
Avoid: miniature controls, compressed full-page capture, collapsed rows in this viewport, two-column mobile inputs, VAT, tax, discounts, customer module or selector, invoice status, payment workflow, Dutch, public storage URLs, private keys, bottom tabs, gradients, bright branding, watermark.
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
