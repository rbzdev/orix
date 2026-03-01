"use client"
import React from "react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
    className?: string
    duration?: number
    delay?: number
    borderWidth?: number
    colorFrom?: string
    colorTo?: string
    borderRadius?: number
    /** Fraction of perimeter covered by the beam: 0–1. Default 0.2 (20%). */
    size?: number
    variant?: "default" | "reverse" | "flash"
}

export function BorderBeam({
    className,
    duration = 8,
    delay = 0,
    borderWidth = 2,
    colorFrom = "#10b981",
    colorTo = "#3b82f6",
    borderRadius = 12,
    size = 0.2,
    variant = "default",
}: BorderBeamProps) {
    const id = React.useId().replace(/:/g, "")

    // We use a fixed viewBox so all SVG geometry is in a stable coordinate space.
    // The element is then stretched to cover the container via w-full h-full.
    const W = 200
    const H = 200
    const r = borderRadius
    const bw = borderWidth
    const half = bw / 2

    // Perimeter of the rounded rect (approx):
    // 4 straight segments + 4 quarter-circles
    const straight = 2 * (W - 2 * r) + 2 * (H - 2 * r)
    const arc = 2 * Math.PI * r
    const perimeter = straight + arc

    // Beam length = size fraction of perimeter (clamped 0–1)
    const beamLen = perimeter * Math.min(Math.max(size, 0.05), 1)

    return (
        <svg
            className={cn(
                "pointer-events-none absolute inset-0 w-full h-full z-10",
                className
            )}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
        >
            <defs>
                {/* Gradient along the stroke – diagonal so visible on all sides */}
                <linearGradient id={`g-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2={H}>
                    <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
                    <stop offset="30%" stopColor={colorFrom} />
                    <stop offset="70%" stopColor={colorTo} />
                    <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
                </linearGradient>

                {/* Reusable rounded-rect path */}
                <path
                    id={`p-${id}`}
                    d={`
                        M ${half + r},${half}
                        L ${W - half - r},${half}
                        Q ${W - half},${half} ${W - half},${half + r}
                        L ${W - half},${H - half - r}
                        Q ${W - half},${H - half} ${W - half - r},${H - half}
                        L ${half + r},${H - half}
                        Q ${half},${H - half} ${half},${H - half - r}
                        L ${half},${half + r}
                        Q ${half},${half} ${half + r},${half}
                        Z
                    `}
                />
            </defs>

            {/* Dim track border */}
            <use
                href={`#p-${id}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={bw}
                strokeOpacity={0.12}
                vectorEffect="non-scaling-stroke"
            />

            {/* Animated beam */}
            <use
                href={`#p-${id}`}
                fill="none"
                stroke={`url(#g-${id})`}
                strokeWidth={bw}
                strokeLinecap="round"
                strokeDasharray={`${beamLen} ${perimeter}`}
                strokeDashoffset={0}
                vectorEffect="non-scaling-stroke"
                style={{
                    animationName: variant === "flash" ? `beam-flash-${id}` : `beam-run-${id}`,
                    animationDuration: `${duration}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationDirection: variant === "reverse" ? "reverse" : "normal",
                    animationDelay: `${delay}s`,
                } as React.CSSProperties}
            />

            <style>{`
                @keyframes beam-run-${id} {
                    0%   { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -${(perimeter + beamLen).toFixed(2)}; }
                }
                @keyframes beam-flash-${id} {
                    0%   { stroke-dashoffset: 0;                              opacity: 1; }
                    25%  { opacity: 0.1; }
                    50%  { stroke-dashoffset: -${(perimeter / 2).toFixed(2)}; opacity: 1; }
                    75%  { opacity: 0.1; }
                    100% { stroke-dashoffset: -${(perimeter + beamLen).toFixed(2)}; opacity: 1; }
                }
            `}</style>
        </svg>
    )
}
