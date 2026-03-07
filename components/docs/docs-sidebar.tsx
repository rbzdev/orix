"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface SidebarItem {
    title: string
    href: string
}

interface SidebarSection {
    title: string
    icon: string
    items: SidebarItem[]
}

interface DocsSidebarProps {
    nav: SidebarSection[]
}

function SidebarContent({ nav, onLinkClick }: { nav: SidebarSection[], onLinkClick?: () => void }) {
    const pathname = usePathname()

    return (
        <div className="space-y-6">
            {nav.map((section) => (
                <div key={section.title} className="space-y-3">

                    <h4 className="font-semibold text-xs text-primary uppercase tracking-wider ml-2 flex items-center gap-1">
                        <Icon icon={section.icon} className="text-lg" />
                        {section.title}
                    </h4>

                    <div className="grid grid-flow-row auto-rows-max text-sm gap-0.5">
                        {section.items.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onLinkClick}
                                    className={cn(
                                        "group flex w-full items-center rounded-md rounded-l-xs px-2 py-1.5 font-medium transition-all text-sm",
                                        isActive
                                            ? "bg-primary/10 text-primary border-l-2 border-primary pl-[7px]"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export function DocsSidebar({ nav }: DocsSidebarProps) {
    const [mobileOpen, setMobileOpen] = useState(false)

    // Lock body scroll when sheet is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [mobileOpen])

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto py-6 pr-4 border-r border-border/40">
                <SidebarContent nav={nav} />
            </aside>

            {/* Mobile: hamburger button in header area */}
            <div className="md:hidden fixed bottom-6 left-0 z-50 flex items-center h-14 pl-4">
                <button
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open navigation"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-neutral-300 dark:bg-neutral-800 shadow-xsbackdrop-blur transition-colors hover:bg-muted"
                >
                    <Icon icon="duo-icons:menu" className="text-xl" />
                </button>
            </div>

            {/* Backdrop */}
            <div
                className={cn(
                    "md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileOpen(false)}
            />

            {/* Sheet – slides in from left */}
            <div
                className={cn(
                    "md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-background border-r border-border/60 shadow-xl transition-transform duration-300 ease-in-out flex flex-col",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Sheet header */}
                <div className="flex items-center justify-between px-4 h-14 border-b border-border/40 shrink-0">
                    <span className="font-bold tracking-tight text-base">Docs</span>
                    <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close navigation"
                        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
                    >
                        <Icon icon="mdi:close" className="text-lg" />
                    </button>
                </div>

                {/* Sheet content */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <SidebarContent nav={nav} onLinkClick={() => setMobileOpen(false)} />
                </div>
            </div>
        </>
    )
}
