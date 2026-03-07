"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { cn } from "@/lib/utils"

type LinesVariant = "grid" | "beams" | "dots"

interface InteractiveLinesProps {
    className?: string
    variant?: LinesVariant
    color?: string
}

export function InteractiveLines({
    className,
    variant = "grid",
    color = "rgb(59, 130, 246)" // Blue-500
}: InteractiveLinesProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 })
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 })

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const mouseMask = useMotionTemplate`radial-gradient(250px circle at ${smoothX}px ${smoothY}px, black, transparent 80%)`

    return (
        <div
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full h-fit p-2 overflow-hidden bg-white dark:bg-zinc-950 flex items-center justify-center border rounded-xl group transition-colors duration-500",
                className
            )}
        >
            {/* Base Pattern (Static) */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]">
                <LinesPattern variant={variant} color="currentColor" />
            </div>

            {/* Glowing Interactive Layer */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{
                    maskImage: mouseMask,
                    WebkitMaskImage: mouseMask,
                }}
            >
                <LinesPattern variant={variant} color={color} isGlow />
            </motion.div>

            {/* Ambient Highlight */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, ${color.replace('rgb', 'rgba').replace(')', ', 0.08)')}, transparent 80%)`
                }}
            />

            <div className="relative z-20 text-center space-y-4">
                <h2 className="text-2xl lg:text-5xl ">
                    {variant}<span className="text-primary">.</span>CORE
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">System responsive interface initialized.</p>
                <div className="flex justify-center gap-2">
                    <div className="h-1 w-12 bg-primary rounded-full animate-pulse" />
                    <div className="h-1 w-4 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                </div>
            </div>
        </div>
    )
}

function LinesPattern({ variant, color, isGlow }: { variant: LinesVariant; color: string; isGlow?: boolean }) {
    if (variant === "dots") {
        return (
            <div className="h-full w-full" style={{
                backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                filter: isGlow ? 'blur(1px)' : 'none'
            }} />
        )
    }

    if (variant === "beams") {
        return (
            <div className="h-full w-full" style={{
                backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px)`,
                backgroundSize: '60px 100%',
                filter: isGlow ? 'blur(2px)' : 'none'
            }} />
        )
    }

    return (
        <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            filter: isGlow ? 'blur(1px)' : 'none'
        }} />
    )
}
