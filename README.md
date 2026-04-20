# Private Dental Clinic Website

A premium static website template for a private dental clinic, built with React, Vite, and Tailwind CSS. The structure is intentionally reusable so future clinics can be created by swapping the shared data and updating page copy.

## Stack

- React
- Vite
- Tailwind CSS
- Static multi-page output
- GitHub Pages compatible

## Pages

- `Home`
- `About`
- `Services`
- `Contact`

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Create a production build:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

## Reusable Structure

- Update clinic-wide content in `src/data/clinic.json`
- Reuse shared layout in `src/layouts/SiteShell.jsx`
- Reuse presentation components from `src/components/`
- Adjust branding and design tokens in `tailwind.config.js`

## GitHub Pages Deployment

This project is configured as a fully static multi-page site and can be deployed directly to GitHub Pages.

- The Vite `base` option is set to `./` so built assets resolve correctly from a repository subpath on GitHub Pages.
- The build output is static HTML, CSS, JS, and assets only.
- The included GitHub Actions workflow publishes the contents of `dist/` to GitHub Pages.

### One-Time Repository Setup

1. Push this project to a GitHub repository.
2. In GitHub, open `Settings` > `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Make sure your default deployment branch matches the workflow trigger, currently `main`.

### Automatic Deployment

After the repository is configured:

1. Commit and push to `main`.
2. GitHub Actions will install dependencies, run `npm run build`, and deploy the static `dist/` output to Pages.

### Manual Local Build Check

Before pushing, you can verify the production build locally:

```bash
npm run build
```

The deployment workflow lives at `.github/workflows/deploy-pages.yml`.
