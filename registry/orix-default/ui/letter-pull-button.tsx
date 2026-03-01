"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface LetterPullButtonProps extends Omit<HTMLMotionProps<"button">, "style"> {
    text: string
    variant?: "pull" | "wave" | "flip" | "jiggle"
    className?: string
}

export function LetterPullButton({
    text,
    variant = "pull",
    className,
    ...props
}: LetterPullButtonProps) {
    const letters = text.split("")

    return (
        <motion.button
            whileHover="hover"
            initial="initial"
            className={cn(
                "relative flex items-center justify-center px-8 py-2 bg-primary text-primary-foreground rounded-sm shadow-xs transition-all active:scale-95",
                className
            )}
            {...props}
        >
            <motion.span
                className="flex items-center justify-center"
                variants={
                    variant === "pull"
                        ? {
                            initial: { gap: "0px" },
                            hover: { gap: "4px", transition: { type: "spring", stiffness: 300, damping: 20 } },
                        }
                        : {}
                }
            >
                {letters.map((letter, i) => {
                    let childVariants = {}

                    if (variant === "wave") {
                        childVariants = {
                            initial: { y: 0 },
                            hover: {
                                y: -6,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                    delay: i * 0.03,
                                },
                            },
                        }
                    } else if (variant === "flip") {
                        childVariants = {
                            initial: { rotateY: 0 },
                            hover: {
                                rotateY: 360,
                                transition: {
                                    duration: 0.5,
                                    ease: "circOut",
                                    delay: i * 0.04,
                                },
                            },
                        }
                    } else if (variant === "jiggle") {
                        childVariants = {
                            initial: { rotate: 0 },
                            hover: {
                                rotate: [0, -10, 10, -10, 10, 0],
                                transition: {
                                    duration: 0.4,
                                    delay: i * 0.02,
                                },
                            },
                        }
                    }

                    return (
                        <motion.span
                            key={i}
                            variants={childVariants}
                            className={cn(
                                "inline-block whitespace-pre",
                                // Origin center is good for flip and jiggle
                                "origin-center"
                            )}
                        >
                            {letter}
                        </motion.span>
                    )
                })}
            </motion.span>

            {/* A subtle hover background effect to add more depth */}
            <motion.div
                variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 },
                }}
                className="absolute inset-x-4 -bottom-px h-px bg-linear-to-r from-transparent via-primary-foreground/40 to-transparent"
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    )
}
