"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressRingProps {
    value: number
    max?: number
    size?: number
    strokeWidth?: number
    color?: string
    trackColor?: string
    label?: string
    showValue?: boolean
    variant?: "default" | "gradient" | "glow"
    className?: string
}

export function ProgressRing({
    value,
    max = 100,
    size = 120,
    strokeWidth = 10,
    color = "hsl(var(--primary))",
    trackColor,
    label,
    showValue = true,
    variant = "default",
    className,
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const percentage = Math.min(Math.max(value / max, 0), 1)
    const offset = circumference * (1 - percentage)

    const [animated, setAnimated] = React.useState(false)
    React.useEffect(() => {
        const t = setTimeout(() => setAnimated(true), 100)
        return () => clearTimeout(t)
    }, [])

    const id = React.useId()

    return (
        <div className={cn("inline-flex flex-col items-center gap-2", className)}>
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    {variant === "gradient" && (
                        <defs>
                            <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={color} stopOpacity="1" />
                                <stop offset="100%" stopColor={color} stopOpacity="0.4" />
                            </linearGradient>
                        </defs>
                    )}
                    {variant === "glow" && (
                        <defs>
                            <filter id={`glow-${id}`}>
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                    )}

                    {/* Track */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={trackColor || "currentColor"}
                        strokeWidth={strokeWidth}
                        className="text-zinc-200 dark:text-zinc-800 opacity-30"
                    />

                    {/* Progress */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={variant === "gradient" ? `url(#grad-${id})` : color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={animated ? offset : circumference}
                        filter={variant === "glow" ? `url(#glow-${id})` : undefined}
                        style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                    />
                </svg>

                {/* Center content */}
                {showValue && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-black tabular-nums" style={{ color }}>
                            {Math.round(percentage * max)}
                            <span className="text-xs font-normal opacity-60">%</span>
                        </span>
                    </div>
                )}
            </div>

            {label && (
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {label}
                </span>
            )}
        </div>
    )
}
