"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function GlassCard({
    children,
    className = "",
    intensity = "medium",
}: {
    children: React.ReactNode
    className?: string
    intensity?: "low" | "medium" | "high"
}) {
    const backdropBlurMap = {
        low: "backdrop-blur-sm",
        medium: "backdrop-blur-md",
        high: "backdrop-blur-xl",
    }

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-3xl border border-white/40 dark:border-white/10 p-8 shadow-2xl",
                "bg-white/20 dark:bg-zinc-950/20",
                backdropBlurMap[intensity],
                className
            )}
        >
            {/* Glossy Reflection Highlight */}
            <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent pointer-events-none opacity-50 dark:opacity-20" />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10">{children}</div>
        </div>
    )
}
