"use client"

import * as React from "react"

interface Tab {
    label: string
    value: string
    icon?: React.ReactNode
}

interface TabsProps {
    tabs: Tab[]
    defaultValue?: string
    variant?: "pills" | "underline" | "floating" | "kinetic"
    className?: string
    onValueChange?: (value: string) => void
}

export function Tabs({
    tabs,
    defaultValue,
    variant = "pills",
    className = "",
    onValueChange
}: TabsProps) {
    const [activeTab, setActiveTab] = React.useState(defaultValue || tabs[0]?.value)
    const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({})
    const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([])

    const updateIndicator = React.useCallback(() => {
        const activeIndex = tabs.findIndex((t) => t.value === activeTab)
        const activeElement = tabsRef.current[activeIndex]

        if (activeElement) {
            setIndicatorStyle({
                left: activeElement.offsetLeft,
                top: activeElement.offsetTop,
                width: activeElement.offsetWidth,
                height: activeElement.offsetHeight,
            })
        }
    }, [activeTab, tabs])

    React.useEffect(() => {
        updateIndicator()
        // Handle window resize
        window.addEventListener("resize", updateIndicator)
        return () => window.removeEventListener("resize", updateIndicator)
    }, [updateIndicator])

    const handleTabClick = (value: string) => {
        setActiveTab(value)
        onValueChange?.(value)
    }

    const containerClasses = {
        pills: "bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800",
        underline: "border-b border-zinc-200 dark:border-zinc-800 px-2",
        floating: "gap-2",
        kinetic: "bg-black p-2 rounded-xl shadow-2xl border border-white/10"
    }

    const itemClasses = (isActive: boolean) => {
        const base = "relative z-10 px-6 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap"

        if (variant === "pills") {
            return `${base} ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"}`
        }
        if (variant === "underline") {
            return `${base} ${isActive ? "text-primary" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"}`
        }
        if (variant === "floating") {
            return `${base} rounded-xl ${isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"}`
        }
        if (variant === "kinetic") {
            return `${base} uppercase tracking-widest text-[10px] ${isActive ? "text-white" : "text-zinc-600 hover:text-zinc-400"}`
        }
        return base
    }

    const indicatorClasses = {
        pills: "bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-white/5",
        underline: "border-b-2 border-primary",
        floating: "hidden", // Floating variant handles state on the item itself
        kinetic: "bg-linear-to-r from-primary to-purple-500 rounded-lg blur-[2px] opacity-20"
    }

    return (
        <div className={`relative flex items-center ${containerClasses[variant]} ${className}`}>
            {/* Active Indicator Backdrop */}
            {variant !== "floating" && (
                <div
                    className={`absolute transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${indicatorClasses[variant]}`}
                    style={indicatorStyle}
                />
            )}

            {/* Tabs List */}
            {tabs.map((tab, index) => (
                <button
                    key={tab.value}
                    ref={(el) => { tabsRef.current[index] = el }}
                    onClick={() => handleTabClick(tab.value)}
                    className={itemClasses(activeTab === tab.value)}
                >
                    {tab.icon && <span className="size-4">{tab.icon}</span>}
                    {tab.label}

                    {/* Kinetic Sparkle Effect */}
                    {variant === "kinetic" && activeTab === tab.value && (
                        <div className="absolute inset-x-0 -bottom-1 h-px bg-linear-to-r from-transparent via-primary to-transparent animate-pulse" />
                    )}
                </button>
            ))}
        </div>
    )
}
