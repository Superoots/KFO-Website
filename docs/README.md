# Kieferorthopädie Übersee – Modern Website

Modern, white-mode website for the orthodontic practice **Kieferorthopädische Fachpraxis Dimitrios Mavroeidakos** in Übersee am Chiemsee.

## Pages

- **index.html** – Homepage with hero, services overview, testimonials, FAQ, CTA
- **praxis.html** – Practice info, doctor welcome, highlights, photo gallery
- **leistungen.html** – Treatment services for children, teens, adults + before/after slider
- **team.html** – Team members + job opening
- **kontakt.html** – Contact form, appointment booking, Google Maps, directions
- **impressum.html** – Legal notice (Impressum)
- **datenschutz.html** – Privacy policy (Datenschutzerklärung)

## Tech Stack

- Plain HTML5, CSS3, vanilla JavaScript
- Google Fonts (Inter + Playfair Display)
- No build step required

## Features

- Responsive (mobile-first)
- Scroll animations (Intersection Observer)
- FAQ accordion
- Testimonials slider
- Before/After image comparison slider
- Online appointment booking form
- Google Maps embed
- GDPR cookie consent banner
- Structured data (JSON-LD)
- SEO meta tags + sitemap

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

## Deployment (GitHub Pages)

1. Push to GitHub repository
2. Go to Settings > Pages
3. Set source to `main` branch, root `/`
4. (Optional) Configure custom domain via CNAME

## Placeholder Content

- Team photos, practice gallery images, and before/after photos need to be replaced with real images
- Contact form currently simulates submission – connect to Formspree or similar for production
- Testimonials are placeholder – replace with real patient reviews
