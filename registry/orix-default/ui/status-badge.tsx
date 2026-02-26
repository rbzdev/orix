"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
    children: React.ReactNode
    variant?: "success" | "warning" | "error" | "info" | "neutral"
    className?: string
    pulse?: boolean
}

export function StatusBadge({
    children,
    variant = "success",
    className = "",
    pulse = true,
}: StatusBadgeProps) {
    const variants = {
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        error: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        neutral: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
    }

    const dots = {
        success: "bg-emerald-500",
        warning: "bg-amber-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        neutral: "bg-zinc-500",
    }

    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs tracking-tight",
                variants[variant],
                className
            )}
        >
            <span className="relative flex h-2 w-2">
                {pulse && (
                    <span className={cn(
                        "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                        dots[variant]
                    )} />
                )}
                <span className={cn(
                    "relative inline-flex h-2 w-2 rounded-full",
                    dots[variant]
                )} />
            </span>
            {children}
        </span>
    )
}
