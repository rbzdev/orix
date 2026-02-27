# Contributing to Orix 🚀

Thank you for your interest in contributing to Orix! We're excited to build the future of premium UI components together. Whether you're a seasoned pro or just starting out, your help is invaluable.

This guide will walk you through the process of contributing step by step.

---

## 🌟 Our Vision

Orix is more than just a component library; it's a **premium design ecosystem**. We focus on high-fidelity animations, sophisticated aesthetics, and modern web standards (Tailwind CSS 4, View Transitions API). Our goal is to make "Premium" the new "Standard" for open-source UI.

---

## 🛠️ Setting Up Your Environment

To get started, make sure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

1.  **Fork the Repository**: Create your own copy of the Orix repo on GitHub.
2.  **Clone Locally**:
    ```bash
    git clone https://github.com/rbzdev
    cd orix
    ```
3.  **Install Dependencies**:
    ```bash
    pnpm install
    ```
4.  **Run Development Server**:
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to see the documentation and component previews.

---

## 🏗️ How to Add a New Component

Orix uses a registry-based system similar to shadcn/ui. Here’s the workflow to add a new component:

### 1. Build & Test
Create your component in the appropriate directory for testing:
- UI Components: `registry/orix-default/ui/`
- Complex Blocks: `registry/orix-default/block/`

Use the `components/docs/component-preview.tsx` file to verify your component's appearance and behavior.

### 2. Style Requirements
- **Tailwind CSS 4**: Use only Tailwind utility classes for styling. Avoid external CSS files.
- **Pure Logic**: Prefer native CSS/Tailwind animations. If complex physics are needed, use `framer-motion` but keep it lightweight.
- **Dark/Light Mode**: Ensure your component looks stunning in both modes.

### 3. Registry & Metadata
Once your component is ready:
1.  **Update `registry.json`**: Add your component's definition at the end of the `items` array.
    ```json
    {
      "name": "my-new-component",
      "type": "registry:ui",
      "title": "My New Component",
      "description": "A brief description.",
      "files": [
        { "path": "registry/orix-default/ui/my-new-component.tsx", "type": "registry:ui" }
      ]
    }
    ```
2.  **Update `registry/metadata.ts`**: Add a usage example and prop definitions so it appears correctly in the documentation.

### 4. Build the Registry
Run the build script to generate the distribution files:
```bash
pnpm registry:build
```

---

## 📝 Contribution Workflow

1.  **Create a Branch**: `git checkout -b feat/your-component-name`
2.  **Commit with Clarity**: Use descriptive messages like `feat: add holographic button component`.
3.  **Push Changes**: `git push origin feat/your-component-name`
4.  **Open a Pull Request**: Go to the main Orix repository and open a PR. Describe what you've built and include a screenshot/video if possible!

---

## ❤️ First-Time Contributors

If you've never contributed to open source before, don't worry! We're here to help.
- If you're stuck, open an **Issue** or ask for help in your PR.
- No contribution is too small! Fixing a typo in the documentation is just as appreciated as a new 3D component.

---

## 📜 Code of Conduct

Be respectful, be kind, and keep the "Premium" spirit alive. We value inclusive, collaborative energy.

---

**Ready to start? Let's build something beautiful!** ✨
