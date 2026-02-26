"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ShimmerButton({
    children,
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                "relative group overflow-hidden rounded-lg px-10 py-2 transition-all",
                "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-xl active:scale-95",
                " border border-zinc-400 dark:border-zinc-600 shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.4)]",
                className
            )}
            {...props}
        >
            <span className="relative z-10 ">{children}</span>

            {/* Shimmer Light */}
            <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1,
                }}
                className="absolute top-0 h-full w-24 bg-linear-to-r from-transparent via-white/30 dark:via-black/20 to-transparent skew-x-[-20deg] z-0"
            />

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>
    )
}
