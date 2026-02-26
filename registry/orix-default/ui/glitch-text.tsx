"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
    return (
        <div className={`relative inline-block font-black ${className}`}>
            <span className="relative z-10">{text}</span>

            {/* Glitch layers */}
            <motion.span
                animate={{
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="absolute inset-0 z-0 text-red-500 opacity-70 mix-blend-screen select-none translate-x-[2px]"
            >
                {text}
            </motion.span>

            <motion.span
                animate={{
                    x: [0, 2, -2, 1, -1, 0],
                    y: [0, -1, 1, -2, 2, 0],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 0.1
                }}
                className="absolute inset-0 z-0 text-cyan-400 opacity-70 mix-blend-screen select-none translate-x-[-2px]"
            >
                {text}
            </motion.span>
        </div>
    )
}
