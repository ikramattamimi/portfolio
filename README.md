# Ikram Muhammad — Portfolio

Personal portfolio built around a **workflow / approval** theme — the kind of systems I build at work. It serves two audiences: recruiters (experience, case studies, CV) and freelance clients (projects, process, contact).

## Demo
Live: [ikramattamimi.github.io/portfolio](https://ikramattamimi.github.io/portfolio/)

## Features
- **Bilingual (ID / EN)** — toggle in the navbar, choice is remembered per visitor
- **Dark / light theme** — dark by default (original near-black, deep purple and red palette), warm "paper" light theme on toggle
- **Hero request form** — animated approval stepper with an "Approved" stamp
- **Experience as case studies** — plain-language results first, technical details (problem/solution, diagrams, stack) behind a click
- **Freelance projects** — bento grid with screenshot galleries and two live mini-demos (Smart Home power monitor, Salary Payment slip sender)
- **Skills linked to proof** — click a technology to see which projects used it
- **Work-with-me process**, testimonials, CV download, and a contact form that sends via WhatsApp or email
- Single static HTML file, no build step, responsive down to phone width

## Structure
```
├── index.html     # the whole site (HTML, CSS, JS)
├── images/        # project screenshots
└── doc/CV.pdf     # downloadable CV
```

## Editing content
Everything lives in `index.html`:
- **Text** — Indonesian is the element's content; English is in its `data-en` attribute, side by side.
- **Testimonials** — fill the `TESTIMONIALS` array at the top of the `<script>`. Cards with an empty quote show as placeholders.
- **Skills** — `SKILLS` maps each technology to the project ids that use it; `WHERE` holds the project names.
- **WhatsApp number** — `WA` constant.

## Run locally
Open `index.html` directly in a browser, or serve the folder:
```bash
npx http-server -p 8765
```

## Previous version
The earlier Bootstrap 5 version is kept on the `legacy-bootstrap` branch.
