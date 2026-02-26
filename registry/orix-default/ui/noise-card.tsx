"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function NoiseCard({
    children,
    className = "",
    noiseOpacity = 0.09,
}: {
    children: React.ReactNode
    className?: string
    noiseOpacity?: number
}) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-3xl border bg-card p-6 shadow-xl",
                className
            )}
        >
            {/* Noise Overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-(--noise-opacity) dark:opacity-[calc(var(--noise-opacity)*1.5)]"
                style={{
                    "--noise-opacity": noiseOpacity,
                    backgroundSize: "200px 200px",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                } as React.CSSProperties}
            />

            <div className="relative z-10">{children}</div>
        </div>
    )
}
