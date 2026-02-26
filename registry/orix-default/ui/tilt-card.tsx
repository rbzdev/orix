"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export function TiltCard({
    children,
    className = "",
    rotateXMax = 15,
    rotateYMax = 15,
}: {
    children: React.ReactNode
    className?: string
    rotateXMax?: number
    rotateYMax?: number
}) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateXMax, -rotateXMax])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateYMax, rotateYMax])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "relative rounded-3xl border bg-card p-1 shadow-xl transition-all",
                className
            )}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="relative rounded-[22px] bg-background/50 p-6 backdrop-blur-sm"
            >
                {children}
            </div>
        </motion.div>
    )
}
