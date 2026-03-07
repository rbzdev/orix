"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

type AuraVariant = "aurora" | "nebula" | "magma" | "ocean"

interface LiquidAuraProps {
    className?: string
    variant?: AuraVariant
}

const variantConfig: Record<AuraVariant, { colors: string[]; label: string }> = {
    aurora: { colors: ["bg-emerald-400", "bg-cyan-400", "bg-blue-400"], label: "Northern Spirit" },
    nebula: { colors: ["bg-purple-500", "bg-pink-500", "bg-indigo-500"], label: "Deep Space" },
    magma: { colors: ["bg-orange-500", "bg-red-500", "bg-yellow-500"], label: "Core Heat" },
    ocean: { colors: ["bg-blue-600", "bg-teal-400", "bg-indigo-400"], label: "Abyss Flow" }
}

export function LiquidAura({ className, variant = "aurora" }: LiquidAuraProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springs = [
        { x: useSpring(mouseX, { damping: 50, stiffness: 100 }), y: useSpring(mouseY, { damping: 50, stiffness: 100 }), tx: '-50%', ty: '-50%' },
        { x: useSpring(mouseX, { damping: 30, stiffness: 80 }), y: useSpring(mouseY, { damping: 30, stiffness: 80 }), tx: '-30%', ty: '-70%' },
        { x: useSpring(mouseX, { damping: 40, stiffness: 120 }), y: useSpring(mouseY, { damping: 40, stiffness: 120 }), tx: '-70%', ty: '-30%' }
    ]

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const { colors, label } = variantConfig[variant]

    return (
        <div
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full h-fit px-2 py-32 overflow-hidden bg-white dark:bg-zinc-950 flex items-center justify-center border rounded-3xl transition-colors duration-500",
                className
            )}
        >
            {/* Ambient Base Layer */}
            <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent dark:from-primary/10" />

            {/* Aura Orbs */}
            {springs.map((s, i) => (
                <motion.div
                    key={i}
                    className={cn(
                        "absolute rounded-full pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen",
                        colors[i % colors.length],
                        i === 0 ? "w-[450px] h-[450px] blur-[120px]" :
                            i === 1 ? "w-[350px] h-[350px] blur-[100px]" :
                                "w-[250px] h-[250px] blur-[80px]"
                    )}
                    style={{ x: s.x, y: s.y, translateX: s.tx, translateY: s.ty }}
                />
            ))}

            {/* Content Glass Card */}
            <div className="relative z-10 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden group">
                <div className="bg-white/90 dark:bg-zinc-900/90 p-4 lg:p-10 rounded-[2.25rem] text-center border border-black/5 dark:border-white/5 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">{label}</span>

                    <h3 className="text-2xl md:text-5xl font-black tracking-tighter leading-none italic text-zinc-900 dark:text-white">
                        {variant.toUpperCase()}.MODE
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-[280px] mx-auto leading-relaxed">
                        A dynamic interface that breathes and reacts to your every movement.
                    </p>
                    <Button className="mt-6 ">
                        Initialize Sync
                    </Button>
                </div>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] select-none scale-[2]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        </div>
    )
}
