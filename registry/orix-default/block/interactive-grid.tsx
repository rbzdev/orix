"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"

interface InteractiveGridProps {
    className?: string
    gridSize?: number
    dotSize?: number
}

export function InteractiveGrid({
    className = "",
    gridSize = 40,
    dotSize = 2
}: InteractiveGridProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 })
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 })

    const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(var(--primary-rgb, 20, 20, 20), 0.1), transparent 80%)`

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className={`relative w-full h-[400px] overflow-hidden bg-background border rounded-2xl ${className}`}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background }}
            />

            <svg className="absolute inset-0 w-full h-full opacity-30">
                <defs>
                    <pattern
                        id="interactive-grid-pattern"
                        width={gridSize}
                        height={gridSize}
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx={gridSize / 2} cy={gridSize / 2} r={dotSize} fill="currentColor" className="text-primary/40" />
                        <path
                            d={`M ${gridSize / 2} 0 L ${gridSize / 2} ${gridSize} M 0 ${gridSize / 2} L ${gridSize} ${gridSize / 2}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-primary/10"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#interactive-grid-pattern)" />
            </svg>

            <motion.div
                className="absolute w-2 h-2 bg-primary rounded-full pointer-events-none z-20"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                <div className="text-center bg-background/60 backdrop-blur-xl p-8 rounded-3xl border shadow-2xl relative z-30">
                    <h3 className="text-3xl font-black tracking-tighter mb-2">Interactive Grid</h3>
                    <p className="text-muted-foreground">Move your mouse to interact with the background.</p>
                </div>
            </div>
        </div>
    )
}
