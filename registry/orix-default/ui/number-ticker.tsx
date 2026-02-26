"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

export function NumberTicker({
    value,
    direction = "up",
    delay = 0,
    className,
}: {
    value: number
    direction?: "up" | "down"
    delay?: number
    className?: string
}) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "0px" })
    const motionValue = useMotionValue(direction === "down" ? value : 0)
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    })

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(direction === "down" ? 0 : value)
            }, delay * 1000)
        }
    }, [motionValue, isInView, delay, value, direction])

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    Number(latest.toFixed(0))
                )
            }
        })
    }, [springValue])

    return (
        <span
            ref={ref}
            className={cn(
                "inline-block tabular-nums text-foreground tracking-tighter",
                className
            )}
        />
    )
}
