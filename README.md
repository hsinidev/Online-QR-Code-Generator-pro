# 🌌 Doodax Online QR Code Generator

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Technology: React](https://img.shields.io/badge/tech-React_18-61DAFB.svg?logo=react)
![Styling: TailwindCSS](https://img.shields.io/badge/style-TailwindCSS-38B2AC.svg?logo=tailwind-css)
![Status: Production](https://img.shields.io/badge/status-Live-brightgreen.svg)

**Doodax** is a premium, enterprise-grade web utility for generating custom Quick Response (QR) codes instantly. Engineered with privacy and performance as non-negotiable pillars, it leverages WebAssembly and advanced client-side JavaScript to ensure no user data is ever transmitted to a backend server.

The application features a stunning, immersive "Nebula Galaxy" theme, a fully centralized responsive design, and a comprehensive SEO-optimized architecture compliant with modern web standards.

## 🚀 LIVE DEMO
**Experience the application live:**  
👉 **[QRCodes.doodax.com](https://doodax.com)**

---

## ✨ Key Features

### ⚡ Core Functionality
-   **Instant Client-Side Rendering:** Zero-latency generation using `node-qrcode`.
-   **Universal Format Support:**
    -   🌐 **URL:** Link websites, portfolios, and social media.
    -   📝 **Text:** Encode plain text messages, Wi-Fi keys, or serial numbers.
    -   📞 **Phone:** "Click-to-call" functionality.
    -   📧 **Email:** Pre-formatted "mailto" links.
-   **High-Fidelity Export:** Download production-ready PNG files.

### 🎨 Visual Experience
-   **Immersive Galaxy Theme:** A multi-layered, CSS-animated background featuring nebulas and dynamic star fields.
-   **Modern UI/UX:** Glassmorphism design language with centralized layout and friendly typography.
-   **Customization:** Full hex control for foreground/background colors and dynamic sizing (100px - 1000px).

### 🛡️ Architecture & Privacy
-   **Zero Backend:** 100% offline-capable generation logic.
-   **Privacy First:** No tracking cookies, no data logging, no analytics injection.
-   **SEO Optimized:** Full JSON-LD Schema, semantic HTML5, Open Graph metadata, and sitemap.

---

## 📂 Project Structure

The codebase is organized for scalability, utilizing React functional components, TypeScript for type safety, and Tailwind CSS for styling.

```plaintext
/
├── components/
│   ├── Layout.tsx         # Global Application Wrapper
│   │                      # - Handles Modal System (Privacy, Terms, About)
│   │                      # - Manages Navigation and Footer
│   │                      # - Implements "Powered by HSINI MOHAMED" logic
│   ├── QRCodeTool.tsx     # Core Logic Component
│   │                      # - Canvas Rendering
│   │                      # - Input State Management
│   │                      # - Download Handlers
│   └── SeoArticle.tsx     # Content Module
│                          # - 3500-word equivalent SEO guide
│                          # - "Read More" toggle functionality
│                          # - Structured FAQ and Table of Contents
├── public/
│   ├── favicon.svg        # Brand Identity Icon
│   ├── robots.txt         # SEO Crawler Directives
│   └── sitemap.xml        # Search Engine Discovery Map
├── App.tsx                # Root Layout Assembler
├── index.html             # Entry Point
│                          # - Global CSS / Galaxy Animation
│                          # - Meta Tags / JSON-LD
├── index.tsx              # React DOM Mount
├── types.ts               # Shared TypeScript Interfaces
└── README.md              # Professional Documentation
```

---

## 🔧 Installation & Development

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/hsinidev/online-qr-code-generator.git
    cd online-qr-code-generator
    ```

2.  **Run with a static server**
    Since this project uses ESM imports via CDN (no build step required for the provided version), you can serve it directly using `npx` or Python.
    ```bash
    npx serve .
    ```

3.  **Access**
    Open `http://localhost:3000` in your browser.

---

## 📜 Legal & Attribution

-   **Developer:** [HSINI MOHAMED](https://github.com/hsinidev)
-   **Website:** [doodax.com](https://doodax.com)
-   **Contact:** [hsini.web@gmail.com](mailto:hsini.web@gmail.com)

This project is open-source software.
