"use client"
import React from "react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
    className?: string
    size?: number
    duration?: number
    delay?: number
    borderWidth?: number
    colorFrom?: string
    colorTo?: string
    variant?: "default" | "reverse" | "flash"
}

export function BorderBeam({
    className,
    size = 200, // Size of the gradient spread in degrees
    duration = 8,
    delay = 0,
    borderWidth = 2,
    colorFrom = "#10b981",
    colorTo = "#3b82f6",
    variant = "default",
}: BorderBeamProps) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 z-10 rounded-[inherit] overflow-hidden",
                className
            )}
        >
            {/* The mask layer */}
            <div
                className="absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]"
                style={{
                    "--border-width": borderWidth,
                    WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                } as React.CSSProperties}
            >
                {/* The rotating gradient */}
                <div
                    className="absolute aspect-square w-[200%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
                    style={{
                        background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent calc(360deg - ${size}deg), ${colorFrom} calc(360deg - ${size / 2}deg), ${colorTo} 360deg)`,
                        animationName: variant === "flash" ? "border-beam-flash" : "border-beam-spin",
                        animationDuration: `${duration}s`,
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                        animationDirection: variant === "reverse" ? "reverse" : "normal",
                        animationDelay: `-${delay}s`,
                    } as React.CSSProperties}
                />
            </div>

            <style>{`
                @keyframes border-beam-spin {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes border-beam-flash {
                    0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1; }
                    25% { transform: translate(-50%, -50%) rotate(90deg); opacity: 0.1; }
                    50% { transform: translate(-50%, -50%) rotate(180deg); opacity: 1; }
                    75% { transform: translate(-50%, -50%) rotate(270deg); opacity: 0.1; }
                    100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 1; }
                }
            `}</style>
        </div>
    )
}
