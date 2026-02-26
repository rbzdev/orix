import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { getRegistryByType } from "@/lib/registry"
import { Icon } from "@iconify/react"

export default async function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const components = await getRegistryByType("registry:ui")
    const blocks = await getRegistryByType("registry:block")

    const sidebarNav = [
        {
            title: "Getting Started",
            icon: "fluent:code-block-20-regular",
            items: [
                { title: "Introduction", href: "/docs" },
                { title: "Installation", href: "/docs/installation" },
            ],
        },
        {
            title: "Components",
            icon: "solar:archive-minimalistic-line-duotone",
            items: components.map(c => ({
                title: c.title,
                href: `/docs/${c.name}`
            })),
        },
        {
            title: "Blocks",
            icon: "solar:card-linear",
            items: blocks.map(b => ({
                title: b.title,
                href: `/docs/${b.name}`
            })),
        },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="font-bold text-xl tracking-tight">
                            Orix<span className="text-primary text-2xl">.</span>
                        </Link>
                        <nav className="flex items-center space-x-6 text-sm font-medium ml-4">
                            <Link href="/docs" className="transition-colors hover:text-primary text-foreground/60">Docs</Link>
                            <Link href="https://github.com/your-username/orix" className="transition-colors hover:text-primary text-foreground/60">GitHub</Link>
                        </nav>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 max-w-screen-2xl px-8">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto py-6 pr-4 border-r border-border/40">
                    <div className="space-y-6">
                        {sidebarNav.map((section) => (
                            <div key={section.title} className="space-y-3">

                                <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground ml-2 flex items-center gap-1">
                                    <Icon icon={section.icon} className="text-lg" />
                                    {section.title}
                                </h4>

                                <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
                                    {section.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:bg-muted font-medium transition-colors hover:text-foreground text-sm"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
                <main className="relative py-6  ">
                    <div className="mx-auto w-full min-w-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}