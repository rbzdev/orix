"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export function SpotlightCard({
    children,
    className = "",
    spotlightColor,
}: {
    children: React.ReactNode
    className?: string
    spotlightColor?: string
}) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className={cn(
                "group relative rounded-3xl border bg-card p-8 shadow-2xl transition-all hover:shadow-primary/5",
                className
            )}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor || "rgba(var(--primary-rgb, 120, 120, 120), 0.5)"},
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    )
}
