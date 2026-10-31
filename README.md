# Portfolio site

Plain HTML/CSS/JS with no build step. Open `index.html` in a browser, or upload the whole folder to any static host (Netlify, Vercel, GitHub Pages).

```
index.html          Home page
contact.html        Contact page (Contact nav link + "Get in touch" button go here)
assets/css/style.css
assets/js/main.js   Clock/status widget, CTA background, contact form
assets/fonts/       Bigger Display, Neue Montreal (Light/Medium/Bold), Aux Mono
assets/images/      logo.svg, project images
```

## Common edits

**Fill a grey placeholder project.** In `index.html`, find the project and put an image inside its `project-media` div:
```html
<div class="project-media"><img src="assets/images/my-project.jpg" alt="My project"></div>
```
Change the `project-name` text and the `<li>` tags under it. Set the `<a class="project" href="#">` href to link to a case study.

**Logo & favicon.** Header logo is `assets/images/logo.svg` (viewBox cropped tight to the mark so it sizes cleanly); favicon is `assets/images/favicon.svg`.

**Replace the project images.** Overwrite `giftian-garb.webp` / `zenith-logistics.webp`, or change the `src` in `index.html`.

**Clock and status.** At the top of `assets/js/main.js`:
- `timeZone`: `null` uses each visitor's local time. Set it to e.g. `"Africa/Accra"` to always show your own time.
- `onlineFrom` / `onlineUntil`: ONLINE from 9:00 AM until 9:00 PM by default, OFFLINE otherwise.

**Brand colour.** Change `--green` at the top of `style.css`.

**Contact page.** Change the email in `contact.html` (the big link and the footer). The background is `assets/images/contact-bg.webp`.
