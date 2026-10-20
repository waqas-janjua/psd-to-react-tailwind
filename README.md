# inFRONT landing page — HTML/CSS to React + Tailwind

A rebuild of a hand-coded HTML/CSS landing page ([`reference/`](reference/)) as typed React components
styled with Tailwind CSS v4. The goal was a pixel-faithful port: same layout, same responsive behaviour,
verified by automated screenshot diffs against the original rather than by eye.

At 1440px the React page differs from the original by **166 pixels out of 2.36 million (0.007%)**.

## Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4. Colours, fonts and the font weight are theme variables in [`src/index.css`](src/index.css). There are no UI libraries.
- A dependency-free screenshot-diff script (Node built-ins + a local Chrome)

## Getting started

```sh
npm install
npm run dev       # dev server
npm run build     # type-check and production build
npm run compare   # screenshot diff against reference/index.html
```

## Screenshot comparison

`npm run compare` opens the original and the React page in headless Chrome at **1440, 1024, 414 and
375px**. It takes full-page screenshots and reports, for each width, how many pixels differ and which
rows they're in:

```
 1440px       166 px differ (0.007%)  height 1637
          rows 885-896: 163 px
          rows 1081-1081: 3 px
```

The screenshots and a diff image (differences in red) are written to `.compare/`.

```sh
npm run compare -- --width 600,750    # other widths
npm run compare -- --threshold 8      # ignore per-channel differences up to 8
```

Rendering is made deterministic: images are decoded synchronously, rasterisation is done in software,
and the colour profile is fixed to sRGB. Repeated runs give identical numbers. The script finds Chrome
in the usual install locations; set `CHROME_PATH` to override.

## Structure

| Component | Section |
|---|---|
| `NavBar`, `Container`, `Button` | Header and navigation |
| `Hero` | Tagline, contact button and banner |
| `Services`, `ServiceCard` | Blue services band that overlaps the bottom of the banner |
| `About`, `SectionHeading`, `SkillList`, `ClientLogos` | "What do we really do?", skills and client logos |
| `Footer`, `FooterColumn`, `SocialLinks`, `BlogPostPreview` | Tweets, social links and contact details, blog posts, copyright |

Components take their content as props with the original's copy as defaults, so they can be reused.

## Approach

- **Match behaviour, not just a screenshot.** The original's responsive quirks are kept: the skills
  column wraps under the text below 1123px, client logos float right and drop one at a time, and social
  icons wrap. These are re-created with the same layout mechanics (floats, flex wrapping), not
  approximated.
- **Account for the original's quirks.** The original's CSS reset never applied (its stylesheet starts
  with a stray `<style>` tag), so it relies on browser defaults: the 8px body margin, `line-height:
  normal` and default heading margins. Tailwind's Preflight reset changes all of these. The port
  restores them where they affect layout.
- **Fixed heights become minimums.** The original uses fixed heights almost everywhere. They're kept
  wherever content fits, so the layout is pixel-identical there, and become minimums where content would
  otherwise overflow. Small, commented negative margins reproduce the original's allowed overruns: the
  intro text runs into the padding above the next heading, and the tweets text runs 2px past its box.
  Columns only grow once content would actually collide.
- **Breakpoints:** the original's `max-width: 600px` breakpoint is kept as a `mobile:` variant. A
  `stacked:` variant (≤893px) stacks the lower sections where the original's desktop columns break down.

## Known differences from the original

Each difference below is a deliberate fix where the original is visibly broken. Every other difference
was removed. To confirm the fixes don't hide other problems, each was temporarily reverted and the
comparison re-run. With the services-band fix reverted, 414px differs only by the copyright fix (#6)
and the stray "." (#7), about 7,900 pixels.

Fixes that add height push everything below them down, so the totals at 1024, 414 and 375px are large
even though the content itself matches:

| Width | Differing pixels | Page height (original → React) |
|---|---|---|
| 1440 | 166 (0.007%) | 1637 → 1637 |
| 1024 | 589,090 (29%) | 1881 → 1967 |
| 414 | 338,028 (31%) | 2508 → 2645 |
| 375 | 339,326 (34%) | 2508 → 2696 |

| # | Where | In the original | In this port |
|---|---|---|---|
| 1 | Services band, ≤600px | The band has a fixed height, so the Print design icon and description are hidden under the white section; only the title shows. | The band grows to fit all three services. This adds about 140px, which moves everything below it. |
| 2 | "Some of our skills", 375px | The heading prints on top of the last line of the paragraph above it. | The heading sits 6px below the text. |
| 3 | Orange logo, 375px and 1024px | It drops out of its strip: into the dark footer at 375px, across the strip's bottom rule at 1024px. | It drops to the same position, but the strip grows to contain it. |
| 4 | Footer, 894–1122px (e.g. 1024px) | The white section has a fixed height, so the skills list and logos are drawn over the dark footer. The footer's columns spill below it onto the light background, the RSS icon prints over the address, and the tweets text runs out of its box. | The white section grows and the footer follows it. Everything from the original's footer edge (y=1225) down differs. |
| 5 | Tweets box, 375px | The last line of text spills out under the box. | The box grows to fit the text. |
| 6 | Copyright rule, ≤600px | The rule and copyright line run through the second blog post's text. | They sit 11px below the post; the footer height is unchanged. |
| 7 | Clients strip, all widths | A stray `.` in the HTML renders as a dot above "Our satisfied clients:". | The dot is removed and its space is kept (3 pixels). |
| 8 | 601–893px (all sections) | The desktop layout breaks down: the service, skills and footer columns are too narrow for their content. | The sections below the hero stack into a single column, keeping desktop type sizes. This range isn't part of the diff. |

### Matched on purpose, although arguably broken

- **Service descriptions at desktop widths** are cut off after three lines by the band's fixed 228px
  height, exactly as in the original. Showing them in full would move the rest of the page down by about
  30px.

### Rendering differences that remain

- **One glyph in "Web Development"** (163 pixels at 1440px) is anti-aliased slightly differently. Its
  position is identical; the cause is likely sub-pixel glyph positioning.
- **Header at 1024px** (64 pixels in the nav) remains from the header pass.
