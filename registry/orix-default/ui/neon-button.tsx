"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    neonColor?: string
    glowOpacity?: number
}

export function NeonButton({
    children,
    className = "",
    neonColor = "#3b82f6", // Default blue neon
    glowOpacity = 0.5,
    ...props
}: NeonButtonProps) {
    return (
        <button
            className={cn(
                "group relative px-8 py-3 rounded-full tracking-widest transition-all duration-300 isolate",
                "bg-zinc-950 text-white border-2 border-transparent",
                className
            )}
            style={{
                borderColor: `${neonColor}33`, // Subtle border when not active
            } as React.CSSProperties}
            {...props}
        >
            {/* Main Neon Tube (Border) */}
            <div
                className="absolute inset-0 rounded-full border-2 transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                    borderColor: neonColor,
                    boxShadow: `0 0 10px ${neonColor}, inset 0 0 5px ${neonColor}`,
                }}
            />

            {/* Bloom Effect (Outer Glow) */}
            <div
                className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-20 group-hover:opacity-100 blur-md pointer-events-none"
                style={{
                    boxShadow: `0 0 20px ${neonColor}, 0 0 40px ${neonColor}`,
                }}
            />

            {/* Subtle Flicker Overlay */}
            <motion.div
                animate={{
                    opacity: [0.8, 1, 0.9, 1, 0.8, 1],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    boxShadow: `0 0 15px ${neonColor} inset`,
                }}
            />

            {/* Text Glow */}
            <span
                className="relative z-10 transition-all duration-300"
                style={{
                    textShadow: `0 0 8px ${neonColor}`,
                }}
            >
                {children}
            </span>

            {/* Extra Sparkle / Reflection */}
            <div className="absolute top-1 left-4 right-4 h-px bg-linear-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
    )
}
