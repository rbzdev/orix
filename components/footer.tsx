import Link from "next/link"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface FooterProps {
    className?: string
}

export function Footer({ className }: FooterProps) {
    return (
        <footer className={cn("border-t bg-background px-6 py-12 md:py-20", className)}>
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                                <span className="text-lg font-black text-primary-foreground tracking-tighter">OR</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">ORIX UI</span>
                        </Link>
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                            Elevating the standard of open-source UI. Premium components and blocks designed for developers who care about the details.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="https://x.com/rubuz_" className="text-muted-foreground transition-colors hover:text-foreground">
                                <Icon icon="line-md:twitter" className="text-xl" />
                            </Link>
                            <Link href="https://linkedin.com/in/rubuz/" className="text-muted-foreground transition-colors hover:text-foreground">
                                <Icon icon="uit:linkedin-alt" className="text-xl" />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div className="grid grid-cols-2 gap-8 md:col-span-2">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">Registry</h4>
                            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <Link href="/docs" className="transition-colors hover:text-primary">Components</Link>
                                <Link href="/docs" className="transition-colors hover:text-primary">Blocks</Link>
                                <Link href="/docs" className="transition-colors hover:text-primary">Templates</Link>
                                <Link href="/docs" className="transition-colors hover:text-primary">Installation</Link>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">Project</h4>
                            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <Link href="https://github.com/rbzdev/orix" target="_blank" className="transition-colors hover:text-primary">GitHub</Link>
                                <Link href="#" className="transition-colors hover:text-primary">Contributing</Link>
                                <Link href="#" className="transition-colors hover:text-primary">License</Link>
                                <Link href="#" className="transition-colors hover:text-primary">Changelog</Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t pt-8 md:mt-20 md:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Orix UI. Built by developers, for developers.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
