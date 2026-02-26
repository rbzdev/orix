"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RadialGaugeProps {
    value: number
    max?: number
    size?: number
    strokeWidth?: number
    label?: string
    color?: string
    className?: string
}

export function RadialGauge({
    value,
    max = 100,
    size = 200,
    strokeWidth = 12,
    label,
    color = "hsl(var(--primary))",
    className
}: RadialGaugeProps) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const percentage = Math.min(Math.max(value / max, 0), 1)
    const offset = circumference - percentage * circumference

    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-muted/20"
                />

                {/* Glow Track */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    strokeLinecap="round"
                    className="opacity-20 blur-xs"
                />

                {/* Main Progress Track */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    strokeLinecap="round"
                />
            </svg>

            {/* Content Overflow */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-black tracking-tighter"
                >
                    {Math.round(percentage * 100)}%
                </motion.span>
                {label && (
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground opacity-60">
                        {label}
                    </span>
                )}
            </div>

            {/* Decorative Dots */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary/40" />
            </div>
        </div>
    )
}
