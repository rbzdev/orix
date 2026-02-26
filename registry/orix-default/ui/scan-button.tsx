"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ScanButton({
    children,
    className = "",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={cn(
                "relative group px-8 py-3 bg-zinc-950 text-emerald-500 font-mono font-bold uppercase tracking-widest border border-emerald-500/30 overflow-hidden transition-all hover:bg-emerald-500/10 hover:border-emerald-500/60 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
                className
            )}
        >
            <span className="relative z-10">{children}</span>

            {/* Scanning Line */}
            <motion.div
                animate={{
                    top: ["-20%", "120%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_15px_#10b981,0_0_5px_#10b981] z-0 opacity-20 group-hover:opacity-100"
            />

            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-500 opacity-40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-500 opacity-40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-500 opacity-40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-500 opacity-40" />

            {/* Background Matrix-like Pulse */}
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    )
}
