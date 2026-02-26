"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "../ui/status-badge"

interface BentoCardProps {
    title: string
    description: string
    className?: string
    icon: string
    interaction: React.ReactNode
    gradientColor?: string
}

function BentoCard({ title, description, className, icon, interaction, gradientColor = "bg-primary" }: BentoCardProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            className={cn(
                "relative flex flex-col overflow-hidden rounded-3xl border bg-card p-0 transition-all shadow-sm",
                isHovered ? "shadow-xl border-primary/20" : "border-border/50",
                className
            )}
        >
            {/* Header */}
            <div className="p-8">
                <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                    isHovered ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110" : "bg-muted text-muted-foreground"
                )}>
                    <Icon icon={icon} className="text-xl" />
                </div>
                <div className="mt-4">
                    <h3 className="font-bold text-xl tracking-tight">{title}</h3>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>

            {/* Interaction Area */}
            <div className="relative mt-auto h-48 w-full border-t border-border/50 bg-muted/20">
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isHovered ? 0.2 : 0,
                        scale: isHovered ? 1 : 0.8
                    }}
                    className={cn(
                        "absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl pointer-events-none",
                        gradientColor
                    )}
                />
                <div className="h-full w-full flex items-center justify-center overflow-hidden">
                    {interaction}
                </div>
            </div>
        </motion.div>
    )
}

export function HeroBento() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto p-4">
            {/* 1. Feature Card */}
            <BentoCard
                title="Visual Fidelity"
                description="Pixel-perfect components designed for high-end digital experiences."
                gradientColor="bg-amber-500"
                className="md:col-span-2"
                icon="solar:star-bold-duotone"
                interaction={
                    <div className="relative flex items-center justify-center w-full h-full">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="text-amber-500/10"
                        >
                            <Icon icon="solar:star-bold" width={240} height={240} />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="absolute bg-background border border-border/60 rounded-2xl p-4 shadow-2xl backdrop-blur-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Icon icon="solar:shield-check-bold-duotone" className="text-2xl" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">Quality Gate</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Passed</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                }
            />

            {/* 2. Status Card */}
            <BentoCard
                title="System Status"
                description="Live heartbeat of your entire infrastructure at a glance."
                gradientColor="bg-blue-500"
                className="md:col-span-1"
                icon="solar:pulse-bold-duotone"
                interaction={
                    <div className="flex flex-col gap-3 scale-95">
                        <StatusBadge variant="success">Engine OK</StatusBadge>
                        <StatusBadge variant="warning">Syncing...</StatusBadge>
                        <StatusBadge variant="error">DB Timeout</StatusBadge>
                    </div>
                }
            />

            {/* 3. Terminal Card */}
            <BentoCard
                title="Cli Optimized"
                description="Seamless integration with your terminal-heavy workflow."
                gradientColor="bg-purple-500"
                className="md:col-span-1"
                icon="solar:code-circle-bold-duotone"
                interaction={
                    <div className="w-[85%] bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-[10px] shadow-2xl">
                        <div className="flex gap-1.5 mb-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                        </div>
                        <div className="space-y-1.5">
                            <div className="text-zinc-500">$ npx shadcn add orix-ui</div>
                            <div className="text-emerald-500">✔ Done!</div>
                            <div className="text-zinc-400">Loading registry...</div>
                        </div>
                    </div>
                }
            />

            {/* 4. Drag Section */}
            <BentoCard
                title="Tactile Interaction"
                description="Interfaces that respond to human touch and physics."
                gradientColor="bg-rose-500"
                className="md:col-span-2"
                icon="solar:hand-shake-bold-duotone"
                interaction={
                    <div className="relative w-full h-full flex items-center justify-around px-8">
                        <motion.div
                            drag
                            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                            className="h-20 w-20 rounded-3xl bg-linear-to-br from-rose-400 to-rose-600 shadow-2xl shadow-rose-500/40 flex items-center justify-center cursor-grab active:cursor-grabbing"
                        >
                            <Icon icon="solar:magic-stick-3-bold" className="text-white text-3xl" />
                        </motion.div>
                        <div className="flex flex-col gap-2.5">
                            <span> Drag me </span>
                            <div className="h-2 w-32 bg-muted rounded-full" />
                            <div className="h-2 w-24 bg-muted rounded-full" />
                            <div className="h-2 w-40 bg-muted/40 rounded-full" />
                        </div>
                    </div>
                }
            />

            {/* 5. Components Grid */}
            <BentoCard
                title="Vast Library"
                description="Hundreds of pre-built fragments to speed up your build."
                gradientColor="bg-emerald-500"
                className="md:col-span-2"
                icon="solar:widget-add-bold-duotone"
                interaction={
                    <div className="grid grid-cols-6 gap-2 rotate-6 scale-110 opacity-40">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary))", opacity: 1 }}
                                className="h-10 w-10 rounded-xl bg-muted border border-border/50 transition-all cursor-pointer"
                            />
                        ))}
                    </div>
                }
            />
        </div>
    )
}
