"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { cn } from "@/lib/utils"

type MeshVariant = "fluid" | "topography" | "glitch"

interface NoiseMeshProps {
    className?: string
    variant?: MeshVariant
}

export function NoiseMesh({ className, variant = "fluid" }: NoiseMeshProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { damping: 100, stiffness: 200 })
    const smoothY = useSpring(mouseY, { damping: 100, stiffness: 200 })

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const mouseMask = useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, black, transparent 100%)`

    return (
        <div
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full h-fit px-2 py-12 overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border rounded-3xl group transition-colors duration-500",
                className
            )}
        >
            {/* Base Pattern */}
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1]">
                <MeshPattern variant={variant} />
            </div>

            {/* Interactive Warping Layer */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{
                    maskImage: mouseMask,
                    WebkitMaskImage: mouseMask,
                }}
            >
                <div className="absolute inset-0 bg-primary/20 blur-[100px]" />
                <MeshPattern variant={variant} isInteractive />
            </motion.div>

            {/* Scanning Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 opacity-20"
                style={{
                    background: useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, var(--primary), transparent 80%)`
                }}
            />

            <div className="relative z-20 text-center space-y-4">

                <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black tracking-widest uppercase text-primary mb-2">
                    Synthetic Perception
                </div>

                <h2 className="text-xl lg:text-6xl font-bold tracking-tighter italic">
                    {variant.toUpperCase()}.CORE
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-sm mx-auto">
                    A generative mesh system reacting to gravitational mouse distortion.
                </p>
                <div className="flex justify-center gap-1 pt-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-1 w-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function MeshPattern({ variant, isInteractive }: { variant: MeshVariant; isInteractive?: boolean }) {
    if (variant === "topography") {
        return (
            <div className="h-full w-full opacity-30 dark:opacity-40" style={{
                backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, currentColor 41px, transparent 42px)`,
                backgroundSize: '100px 100px',
                color: isInteractive ? 'var(--primary)' : 'inherit',
                transform: isInteractive ? 'scale(1.05)' : 'none',
                transition: 'transform 0.5s ease-out'
            }} />
        )
    }

    if (variant === "glitch") {
        return (
            <div className="h-full w-full grid grid-cols-12 gap-1 opacity-20 p-4">
                {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className={cn(
                        "h-8 rounded-[2px] bg-current",
                        i % 7 === 0 ? "opacity-100" : "opacity-20",
                        isInteractive && i % 3 === 0 && "animate-pulse"
                    )} />
                ))}
            </div>
        )
    }

    return (
        <div className="h-full w-full opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.62 10l.38-.38V5.42l-.38-.38h-4.24l-.38.38v4.2l.38.38h4.24zM48.62 15h4.25l.38-.38v-4.25l-.38-.38h-4.25l-.38.38v4.25l.38.38zM15.38 48.62h4.25l.38-.38v-4.25l-.38-.38h-4.25l-.38.38v4.25l.38.38zM10.38 54.62h4.25l.38-.38v-4.25l-.38-.38h-4.25l-.38.38v4.25l.38.38z' fill='currentColor' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: isInteractive ? '80px 80px' : '60px 60px',
            color: isInteractive ? 'var(--primary)' : 'inherit',
            transition: 'background-size 0.5s ease-out'
        }} />
    )
}
