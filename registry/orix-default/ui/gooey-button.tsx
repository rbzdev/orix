"use client"

import * as React from "react"
import { useId } from "react"
import { cn } from "@/lib/utils"

type GooeyVariant = "default" | "secondary" | "destructive" | "amber" | "emerald"

interface GooeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    gooeyColor?: string
    variant?: GooeyVariant
}

export function GooeyButton({
    children,
    className = "",
    gooeyColor,
    variant = "default",
    ...props
}: GooeyButtonProps) {
    const filterId = useId().replace(/:/g, "")

    const variantStyles: Record<GooeyVariant, string> = {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-muted text-muted-foreground",
        destructive: "bg-red-500 text-white",
        amber: "bg-amber-500 text-white",
        emerald: "bg-emerald-500 text-white",
    }

    return (
        <div className="relative inline-block">
            <svg className="absolute hidden" width="0" height="0">
                <defs>
                    <filter id={filterId}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="gooey"
                        />
                        <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <button
                className={cn(
                    "relative group px-8 py-3 font-bold rounded-full transition-all duration-300 isolate",
                    className
                )}
                {...props}
            >
                {/* Sharp Text */}
                <span className={cn(
                    "relative z-20 transition-colors",
                    variant === "secondary" ? "text-foreground" : "text-primary-foreground"
                )}>
                    {children}
                </span>

                {/* Gooey Background Container */}
                <div
                    className="absolute inset-0 z-10"
                    style={{ filter: `url(#${filterId})` }}
                >
                    {/* Main Button Body (Gooey) */}
                    <div
                        className={cn("absolute inset-0 rounded-full", variantStyles[variant])}
                        style={{ backgroundColor: gooeyColor }}
                    />

                    {/* Gooey Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        <div
                            className={cn("absolute top-0 left-0 w-8 h-8 rounded-full group-hover:-translate-y-12 transition-transform duration-500", variantStyles[variant])}
                            style={{ backgroundColor: gooeyColor }}
                        />
                        <div
                            className={cn("absolute bottom-0 right-0 w-8 h-8 rounded-full group-hover:translate-y-12 transition-transform duration-500", variantStyles[variant])}
                            style={{ backgroundColor: gooeyColor }}
                        />
                        <div
                            className={cn("absolute top-0 right-0 w-6 h-6 rounded-full group-hover:-translate-x-16 transition-transform duration-500", variantStyles[variant])}
                            style={{ backgroundColor: gooeyColor }}
                        />
                        <div
                            className={cn("absolute bottom-0 left-0 w-6 h-6 rounded-full group-hover:translate-x-16 transition-transform duration-500", variantStyles[variant])}
                            style={{ backgroundColor: gooeyColor }}
                        />
                    </div>
                </div>
            </button>
        </div>
    )
}
