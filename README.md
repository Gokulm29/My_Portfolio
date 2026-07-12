# Gokul M — Personal Portfolio

A modern, dark-themed, single-page portfolio built with plain HTML5, CSS3 and vanilla
JavaScript (no frameworks). Features a canvas-based animated network background,
typing hero text, scroll-reveal animations, animated skill bars and counters,
a validated contact form, and live GitHub stats.

## Structure

```
portfolio/
├── index.html              Main page — all sections
├── css/
│   ├── style.css            Design tokens, layout, components
│   ├── responsive.css       Tablet/mobile breakpoints
│   └── animations.css       Keyframes & reveal transitions
├── js/
│   ├── script.js             Nav, scroll-spy, reveals, counters, form
│   ├── animation.js          Hero network-graph canvas animation
│   └── typing.js             Hero role typing effect
├── assets/
│   ├── images/               (add profile photo / project screenshots here)
│   ├── icons/                (add extra icons here if needed)
│   ├── resume/               Gokul_M_Resume.pdf — powers the "Download Résumé" button
│   └── fonts/                (unused — fonts are loaded from Google Fonts CDN)
├── README.md
└── favicon.ico
```

## Running locally

No build step required. Just open `index.html` in a browser, or serve the folder:

```bash
cd portfolio
python3 -m http.server 8080
# visit http://localhost:8080
```

## Customizing

- **Profile photo**: drop an image into `assets/images/` and reference it in the
  `.hero` section of `index.html` if you'd like a photo instead of the network animation alone.
- **GitHub stats**: the widgets under `#github` use `github-readme-stats`,
  `streak-stats.demolab.com`, and `github-readme-activity-graph`, all pointed at
  `Gokulm29`. Swap the `username` query param if this ever changes.
- **Resume**: replace `assets/resume/Gokul_M_Resume.pdf` with an updated file of
  the same name to update the download button automatically.
- **Colors**: all design tokens (colors, fonts, spacing) are CSS variables at the
  top of `css/style.css` under `:root`.
- **Contact form**: currently client-side validated only and falls back to a
  `mailto:` link on submit (no backend). Wire it up to a form service (e.g.
  Formspree) or your own endpoint if you want submissions delivered without
  opening the visitor's email client.

## Notes

- Testimonials and a live-demo project section were intentionally left out since
  no testimonial quotes or hosted demo links were provided — add a `#testimonials`
  section following the same card pattern if you'd like one later.
- Soft skills and skill-bar percentages are reasonable defaults based on the
  resume; adjust freely in `index.html`.
