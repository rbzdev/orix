"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

type VortexVariant = "gravity" | "repel" | "drift"

interface ParticleVortexProps {
    className?: string
    count?: number
    variant?: VortexVariant
}

export function ParticleVortex({
    className,
    count = 100,
    variant = "gravity"
}: ParticleVortexProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothX = useSpring(mouseX, { damping: 100, stiffness: 400 })
    const smoothY = useSpring(mouseY, { damping: 100, stiffness: 400 })

    const particles = React.useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.1,
            delay: Math.random() * 2,
            color: Math.random() > 0.8 ? "primary" : "muted"
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
                "relative w-full h-[500px] overflow-hidden bg-white dark:bg-zinc-950 flex items-center justify-center border rounded-3xl group transition-colors duration-500",
                className
            )}
        >
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {particles.map((p) => (
                    <ParticleItem
                        key={p.id}
                        p={p}
                        mouseX={smoothX}
                        mouseY={smoothY}
                        variant={variant}
                    />
                ))}
            </svg>

            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="p-12 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-3xl border border-black/5 dark:border-white/5"
                >
                    <h2 className="text-6xl font-black text-zinc-900 dark:text-white leading-none tracking-tighter uppercase italic">
                        {variant}<span className="text-primary">.</span>OS
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-4 font-mono text-xs tracking-widest uppercase">
                        Quantum particle simulation v2.0
                    </p>
                </motion.div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-radial from-primary/10 dark:from-primary/5 to-transparent pointer-events-none" />
        </div>
    )
}

function ParticleItem({ p, mouseX, mouseY, variant }: { p: any; mouseX: any; mouseY: any; variant: VortexVariant }) {
    const range = variant === "repel" ? [400, -400] : [-(p.x - 50) * 0.3, (p.x - 50) * 0.3]

    const dx = useTransform(mouseX, [0, 1000], variant === "repel" ? [100, -100] : variant === "drift" ? [-50, 50] : [-(p.x - 50) * 0.4, (p.x - 50) * 0.4])
    const dy = useTransform(mouseY, [0, 800], variant === "repel" ? [100, -100] : variant === "drift" ? [-50, 50] : [-(p.y - 50) * 0.4, (p.y - 50) * 0.4])

    return (
        <motion.circle
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            className={p.color === "primary" ? "fill-primary" : "fill-zinc-400 dark:fill-zinc-600"}
            style={{
                x: dx,
                y: dy,
                opacity: p.color === "primary" ? 0.6 : 0.2
            }}
            animate={{
                opacity: p.color === "primary" ? [0.4, 0.8, 0.4] : [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay
            }}
        />
    )
}
