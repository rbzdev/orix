"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

type ConstellationVariant = "connected" | "orbit" | "dust"

interface FloatingConstellationProps {
    className?: string
    variant?: ConstellationVariant
    count?: number
}

export function FloatingConstellation({
    className,
    variant = "connected",
    count = 40
}: FloatingConstellationProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 })
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 })

    const points = React.useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            speed: Math.random() * 0.5 + 0.1,
            offset: Math.random() * 1000
        }))
    }, [count])

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full h-fit overflow-hidden bg-white dark:bg-zinc-950 flex items-center justify-center border rounded-3xl group transition-colors duration-500",
                className
            )}
        >
            {/* SVG Layer for lines and particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {variant === "connected" && points.map((p, i) => (
                    <ConnectionLine
                        key={`line-${i}`}
                        p={p}
                        mouseX={smoothX}
                        mouseY={smoothY}
                    />
                ))}
                {points.map((p) => (
                    <ConstellationPoint
                        key={p.id}
                        p={p}
                        mouseX={smoothX}
                        mouseY={smoothY}
                        variant={variant}
                    />
                ))}
            </svg>

            {/* Central Glow */}
            <motion.div
                className="absolute w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full point-events-none"
                style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
            />

            <div className="relative z-10 text-center">
                <div className="p-6 space-y-4">
                    <h2 className="text-xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">
                        {variant}<span className="text-primary">.</span>node
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 font-mono text-xs tracking-[0.2em] uppercase">
                        Neural data synchronization: active
                    </p>
                    <div className="h-0.5 w-24 bg-primary/20 dark:bg-primary/10 mx-auto rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ConstellationPoint({ p, mouseX, mouseY, variant }: { p: any; mouseX: any; mouseY: any; variant: ConstellationVariant }) {
    const rx = useTransform(mouseX, [0, 1000], [-(p.x - 50) * 0.5, (p.x - 50) * 0.5])
    const ry = useTransform(mouseY, [0, 800], [-(p.y - 50) * 0.5, (p.y - 50) * 0.5])

    const scale = useTransform([mouseX, mouseY], ([latestX, latestY]: any) => {
        const d = Math.sqrt(Math.pow(latestX - (p.x * 10), 2) + Math.pow(latestY - (p.y * 8), 2))
        return d < 200 ? 1.5 : 1
    })

    return (
        <motion.circle
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            className="fill-zinc-300 dark:fill-zinc-700 group-hover:fill-primary/40 transition-colors"
            style={{ x: rx, y: ry, scale }}
            animate={variant === "orbit" ? {
                x: [0, Math.cos(p.offset) * 20, 0],
                y: [0, Math.sin(p.offset) * 20, 0]
            } : {}}
            transition={{ duration: 10 + p.speed * 20, repeat: Infinity, ease: "linear" }}
        />
    )
}

function ConnectionLine({ p, mouseX, mouseY }: { p: any; mouseX: any; mouseY: any }) {
    const rx = useTransform(mouseX, [0, 1000], [-(p.x - 50) * 0.5, (p.x - 50) * 0.5])
    const ry = useTransform(mouseY, [0, 800], [-(p.y - 50) * 0.5, (p.y - 50) * 0.5])

    const opacity = useTransform([mouseX, mouseY], ([latestX, latestY]: any) => {
        // Simple heuristic: lines are visible closer to mouse
        return 0.1
    })

    return (
        <motion.line
            x1={`${p.x}%`}
            y1={`${p.y}%`}
            x2="50%"
            y2="50%"
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="1"
            style={{ x: rx, y: ry, opacity }}
        />
    )
}
