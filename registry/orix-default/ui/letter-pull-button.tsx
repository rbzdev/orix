"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

interface LetterPullButtonProps extends Omit<HTMLMotionProps<"button">, "style"> {
    text: string
    pullDistance?: number
}

export function LetterPullButton({
    text,
    className = "",
    pullDistance = 10,
    ...props
}: LetterPullButtonProps) {
    const letters = text.split("")

    return (
        <motion.button
            whileHover="hover"
            className={`relative px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl overflow-hidden shadow-lg ${className}`}
            {...props}
        >
            <div className="flex justify-center">
                {letters.map((letter, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            hover: {
                                x: (i - letters.length / 2) * pullDistance,
                                transition: { type: "spring", stiffness: 300, damping: 15 }
                            }
                        }}
                        className="inline-block"
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </div>

            <motion.div
                variants={{
                    hover: { scaleX: 1, opacity: 1 }
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary-foreground/40 origin-center"
            />
        </motion.button>
    )
}
