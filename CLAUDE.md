# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for **Brazweed**, a cannabis retail management SaaS targeting Canadian dispensaries. No build system — plain HTML/CSS/JS served directly from the file system or any static host.

## Development

Open `index.html` in a browser directly, or use a local dev server:

```bash
# VS Code Live Server, Python, or npx serve
python -m http.server 8080
# or
npx serve .
```

No build, no npm, no compilation step.

## Architecture

Three files comprise the entire site:

- **`index.html`** — Single-page layout with sections: Header/Nav, Hero, Main Features (with interactive simulator), Powerful Features (carousel), Pricing (3 static cards), Join Waitlist CTA, Footer.
- **`styles.css`** — All styles. CSS custom properties defined in `:root` (colors, shadows, etc.). Responsive breakpoints: 1024px (desktop), 768px (tablet), 767px (mobile).
- **`script.js`** — Vanilla JS ES6+. Entry point is `initializeApp()` called on `DOMContentLoaded`. Key subsystems:
  - `initMobileMenu()` — hamburger toggle
  - `initHeaderScroll()` — hide/show header on scroll direction
  - `initScrollAnimations()` — IntersectionObserver for `.fade-in-up`
  - `initJoinWaitlistButtons()` — all CTA buttons open the modal
  - `openWaitlistModal(preselectedPlan)` — dynamically injects modal HTML + inline styles into DOM
  - `handleWaitlistSubmission(form)` — opens WhatsApp (`wa.me`) with pre-filled message instead of a backend POST
  - `initInteractiveSimulator()` — tab switching + Canvas-drawn sales chart in the Features section
  - `initFeaturesCarousel()` — auto-advancing carousel (4s interval) with indicator dots and feature-hover triggers
  - `initFloatingButton()` — scroll-aware floating "Join Waitlist" button

## Key Design Decisions

- **No backend**: Waitlist form submissions open WhatsApp (`https://wa.me/16042597965`) with a pre-filled message — no server or email integration.
- **Modal styles injected at runtime**: The waitlist modal CSS is injected via `<style id="modal-styles">` on first open, not in `styles.css`. Additional animation styles are also appended to `<head>` at script load.
- **Pricing is static**: Three cards (Basic Monthly CAD $599, Basic Annual CAD $499, Enterprise custom). The `initPricingToggle()` function is intentionally a no-op (toggle was removed but the call kept for compatibility).
- **Canvas charts**: Sales charts in both the interactive simulator and the "Powerful Features" carousel are drawn with the native Canvas 2D API — no chart library.
- **Color palette**: Primary green `#00C851`, accent/chart color `#b65843` (terracotta). These appear in both CSS variables and hardcoded in canvas drawing code.

## External Dependencies (CDN only)

- Google Fonts — Inter (300–700)
- Font Awesome 6.0.0 — icons
- `logo-brazweed.svg` — local SVG asset
