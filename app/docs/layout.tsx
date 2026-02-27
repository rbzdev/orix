import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { getRegistryByType } from "@/lib/registry"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { DocsSidebar } from "@/components/docs/docs-sidebar"

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

                    <div className="flex items-center justify-between w-full mr-2">
                        <Link href="/" className="flex items-center text-lg tracking-tight">
                            <Image src="/logo_min.png" alt="Logo" width={32} height={32} className="bg-primary dark:bg-primary/10 rounded-lg p-1" />
                            orix-UI
                        </Link>

                        <nav className="flex items-center space-x-2 text-sm font-medium ">
                            <Link href="/docs" className="transition-colors hover:text-primary text-foreground/60">
                                <Icon icon="simple-icons:buymeacoffee" className="text-4xl bg-yellow-400 dark:bg-yellow-400 text-black rounded-full p-1" />

                            </Link>

                            <Link href="https://github.com/rbzdev/orix" target="_blank" className="transition-colors hover:text-primary text-foreground/60 flex items-center lg:border rounded-sm p-1">
                                <Icon icon="line-md:github" className="text-xl hidden lg:block" />



                                <div className="border p-1 rounded-sm flex items-center lg:hidden">
                                    <Icon icon="line-md:github" className="text-xl" />
                                </div>

                                <span className="hidden lg:block"> GitHub </span>
                            </Link>
                        </nav>
                    </div>
                    <div className="border p-1 rounded-sm flex items-center">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 max-w-screen-2xl px-8">
                <DocsSidebar nav={sidebarNav} />
                <main className="relative py-6">
                    <div className="mx-auto w-full min-w-0">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}