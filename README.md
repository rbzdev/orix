# Orix — The Future of Premium UI Components 🚀

Orix is a modern, open-source component registry designed for developers who value **aesthetic excellence** and **high-fidelity performance**. Built on top of [shadcn/ui](https://ui.shadcn.com/), Orix provides a collection of sophisticated UI components and blocks that go beyond basic layouts.

---

## ✨ Our Mission

Orix aims to bridge the gap between "Open Source" and "Premium Design." We provide components with:
- **Refined Micro-animations**: Handcrafted transitions using Tailwind CSS 4 and native CSS.
- **Modern Standards**: Leveraging the View Transitions API for seamless navigation.
- **Total Ownership**: You own the code. Copy, paste, and customize it to your project’s identity.

---

## ⚡ Quick Start

You can install any component directly into your project using the `shadcn` CLI. 

### Install a Component
```bash
npx shadcn@latest add https://orix-rbr2.vercel.app/r/[component-name].json
```
*(Replace `[component-name]` with the name of the component, e.g., `carousel`, `tabs`, `button`)*

---

## ☕ Support the Vision

If you like what we're building and want to see more Orix components, consider supporting the project!

- **Star on GitHub**: Help us grow and reach more developers by giving us a ⭐.
- **Buy Me a Coffee**: [Support our work directly with a coffee](https://www.buymeacoffee.com/rbzdev). ☕☕️
- **GitHub Sponsors**: [Become a monthly sponsor](https://github.com/sponsors/rbzdev) and get early access to new blocks. 💖
- **Corporate Sponsorship**: Reach us at `your-email@example.com` for official site partnerships.

---

## 🤝 Contributing

Orix is an open-source project and we welcome all contributors. Whether you want to fix a bug, improve documentation, or suggest new components, your help is appreciated.

**See our [Full Contributing Guide](CONTRIBUTING.md) for more details.**

### Quick Steps to contribute:
1.  **Develop**: Build your component in the `components/` directory.
2.  **Register**: Copy the source to `registry/orix-default/` and add the metadata to `registry.json`.
3.  **Build**: Run `pnpm registry:build` to generate the registry files.
4.  **Submit**: Open a Pull Request with your changes.

### 🗺️ Future Roadmap
As we evolve, we plan to introduce a professional marketplace layer that will allow high-quality contributors to offer **Paid Components** alongside our free open-source collection.

---

## 🛠️ Local Development

If you'd like to explore the registry locally or test new components:

```bash
# Clone the repository
git clone https://github.com/rbzdev/orix.git

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to see the live documentation.

---

License: [MIT](LICENSE)
