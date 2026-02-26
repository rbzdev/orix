"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface MarqueeItem {
    name: string
    icon: string
}

interface InfiniteMarqueeProps {
    items: MarqueeItem[]
    direction?: "left" | "right"
    speed?: number
    className?: string
}

export function InfiniteMarquee({
    items,
    direction = "left",
    speed = 40,
    className
}: InfiniteMarqueeProps) {
    // Duplicate items to ensure smooth infinite loop
    const doubledItems = [...items, ...items, ...items, ...items]

    return (
        <div className={cn("relative flex overflow-hidden py-12 bg-muted/5", className)}>
            {/* Blurry Edges for Depth */}
            <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />

            <motion.div
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex w-max shrink-0 gap-16 px-8"
            >
                {doubledItems.map((item, i) => (
                    <div
                        key={`${item.name}-${i}`}
                        className="group relative flex items-center gap-3 transition-all  opacity-70 hover:opacity-100"
                    >
                        <div className="h-12 w-12 rounded-2xl bg-muted/50 p-2.5 transition-transform group-hover:scale-110 shadow-sm border border-border/50">
                            <Icon icon={item.icon} className="h-full w-full" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground/70">
                            {item.name}
                        </span>

                        {/* Hover Effect Dot */}
                        <div className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
