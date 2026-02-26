"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

type MagneticVariant = "arrows" | "lines" | "crosses"

interface MagneticSurfaceProps {
    className?: string
    variant?: MagneticVariant
    gridSize?: number
}

export function MagneticSurface({
    className,
    variant = "arrows",
    gridSize = 35
}: MagneticSurfaceProps) {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
        if (!containerRef.current) return
        const { left, top } = containerRef.current.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const cells = React.useMemo(() => {
        const rows = Math.ceil(500 / gridSize)
        const cols = Math.ceil(1000 / gridSize)
        return Array.from({ length: rows * cols }).map((_, i) => ({
            id: i,
            row: Math.floor(i / cols),
            col: i % cols,
        }))
    }, [gridSize])

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(-1000); mouseY.set(-1000) }}
            className={cn(
                "relative w-full h-[500px] overflow-hidden bg-white dark:bg-zinc-950 flex items-center justify-center border rounded-3xl group transition-colors duration-500",
                className
            )}
        >
            <div
                className="absolute inset-0 grid gap-0"
                style={{
                    gridTemplateColumns: `repeat(auto-fill, ${gridSize}px)`,
                    gridTemplateRows: `repeat(auto-fill, ${gridSize}px)`,
                }}
            >
                {cells.map((cell) => (
                    <MagneticCell
                        key={cell.id}
                        cell={cell}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        gridSize={gridSize}
                        variant={variant}
                    />
                ))}
            </div>

            <div className="relative z-10 pointer-events-none text-center">
                <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl">
                    <h3 className="text-4xl font-black tracking-tighter italic text-zinc-900 dark:text-white">Magnetic Field.</h3>
                    <p className="text-zinc-500 text-sm font-medium mt-2">Vector alignment simulation active.</p>
                </div>
            </div>

            {/* Ambient vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
        </div>
    )
}

function MagneticCell({ cell, mouseX, mouseY, gridSize, variant }: { cell: any; mouseX: any; mouseY: any; gridSize: number; variant: MagneticVariant }) {
    const x = cell.col * gridSize + gridSize / 2
    const y = cell.row * gridSize + gridSize / 2

    const rotate = useTransform([mouseX, mouseY], ([latestX, latestY]: any) => {
        const angle = Math.atan2(latestY - y, latestX - x)
        return angle * (180 / Math.PI)
    })

    const scale = useTransform([mouseX, mouseY], ([latestX, latestY]: any) => {
        const d = Math.sqrt(Math.pow(latestX - x, 2) + Math.pow(latestY - y, 2))
        return Math.max(0.6, 1.2 - d / 300)
    })

    const opacity = useTransform([mouseX, mouseY], ([latestX, latestY]: any) => {
        const d = Math.sqrt(Math.pow(latestX - x, 2) + Math.pow(latestY - y, 2))
        return Math.max(0.1, 0.4 - d / 500)
    })

    return (
        <div className="flex items-center justify-center pointer-events-none" style={{ width: gridSize, height: gridSize }}>
            <motion.div
                style={{ rotate, scale, opacity }}
                className="text-zinc-400 dark:text-zinc-600 flex items-center justify-center transition-colors duration-300"
            >
                {variant === "arrows" && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                )}
                {variant === "lines" && (
                    <div className="h-0.5 w-6 bg-current rounded-full" />
                )}
                {variant === "crosses" && (
                    <div className="relative h-4 w-4">
                        <div className="absolute top-1/2 left-0 h-0.5 w-full bg-current rounded-full" />
                        <div className="absolute top-0 left-1/2 h-full w-0.5 bg-current rounded-full" />
                    </div>
                )}
            </motion.div>
        </div>
    )
}
