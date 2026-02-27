"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type TooltipSide = "top" | "bottom" | "left" | "right"

interface TooltipProps {
    content: React.ReactNode
    children: React.ReactNode
    side?: TooltipSide
    variant?: "dark" | "light" | "glass" | "primary"
    className?: string
    delay?: number
}

const sideStyles: Record<TooltipSide, { tooltip: string; arrow: string }> = {
    top: {
        tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        arrow: "top-full left-1/2 -translate-x-1/2 border-t-8 border-l-4 border-r-4 border-l-transparent border-r-transparent",
    },
    bottom: {
        tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",
        arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-8 border-l-4 border-r-4 border-l-transparent border-r-transparent",
    },
    left: {
        tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",
        arrow: "left-full top-1/2 -translate-y-1/2 border-l-8 border-t-4 border-b-4 border-t-transparent border-b-transparent",
    },
    right: {
        tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",
        arrow: "right-full top-1/2 -translate-y-1/2 border-r-8 border-t-4 border-b-4 border-t-transparent border-b-transparent",
    },
}

const variantStyles: Record<string, { tooltip: string; arrow: string }> = {
    dark: { tooltip: "bg-zinc-900 text-white border border-zinc-800", arrow: "border-t-zinc-900" },
    light: { tooltip: "bg-white text-zinc-900 border border-zinc-200 shadow-lg", arrow: "border-t-white" },
    glass: { tooltip: "bg-white/10 backdrop-blur-md text-white border border-white/20", arrow: "border-t-white/10" },
    primary: { tooltip: "bg-primary text-primary-foreground border border-primary/80", arrow: "border-t-primary" },
}

export function Tooltip({
    children,
    content,
    side = "top",
    variant = "dark",
    className,
    delay = 100,
}: TooltipProps) {
    const [visible, setVisible] = React.useState(false)
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(null)

    const show = () => {
        timeoutRef.current = setTimeout(() => setVisible(true), delay)
    }
    const hide = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setVisible(false)
    }

    return (
        <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
            {children}
            <span
                className={cn(
                    "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                    (sideStyles[side] || sideStyles.top).tooltip,
                    (variantStyles[variant] || variantStyles.dark).tooltip,
                    visible
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-0.5",
                    className
                )}
            >
                {content}
                {/* Arrow */}
                <span
                    className={cn(
                        "absolute h-0 w-0 border-solid",
                        (sideStyles[side] || sideStyles.top).arrow,
                        (variantStyles[variant] || variantStyles.dark).arrow
                    )}
                />
            </span>
        </span>
    )
}
