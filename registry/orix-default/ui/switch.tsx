"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SwitchProps {
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
    disabled?: boolean
    label?: string
    size?: "sm" | "md" | "lg"
    className?: string
}

export function Switch({
    checked: controlledChecked,
    defaultChecked,
    onChange,
    disabled = false,
    label,
    size = "md",
    className,
}: SwitchProps) {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false)
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked
    const [isPressed, setIsPressed] = React.useState(false)

    const handleToggle = () => {
        if (disabled) return
        if (controlledChecked === undefined) {
            setInternalChecked(!internalChecked)
        }
        onChange?.(!isChecked)
    }

    const sizes = {
        sm: { track: "w-8 h-4.5 p-0.5", thumb: 14, x: 14, label: "text-xs" },
        md: { track: "w-11 h-6 p-1", thumb: 16, x: 20, label: "text-sm" },
        lg: { track: "w-15 h-9 p-1.5", thumb: 24, x: 24, label: "text-base" },
    }

    const currentSize = sizes[size]

    return (
        <label
            className={cn(
                "group inline-flex items-center gap-3 cursor-pointer select-none",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
            onMouseDown={() => !disabled && setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
        >
            <div
                className="relative"
                onClick={handleToggle}
            >
                {/* Track */}
                <motion.div
                    animate={{
                        scale: isPressed ? 0.95 : 1
                    }}
                    className={cn(
                        "rounded-full border transition-all duration-300",
                        currentSize.track,
                        "border-neutral-300 dark:border-neutral-700",
                        isChecked
                            ? "bg-primary/20 border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                            : "bg-muted shadow-inner"
                    )}
                />

                {/* Thumb Container (Translation) */}
                <motion.div
                    animate={{
                        x: isChecked ? currentSize.x : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 30,
                        mass: 0.6
                    }}
                    className="absolute top-1/2 -translate-y-1/2 left-1 z-10 pointer-events-none flex items-center "
                    style={{ height: currentSize.thumb }}
                >
                    {/* The Elastic Thumb */}
                    <motion.div
                        animate={{
                            width: isPressed ? currentSize.thumb * 1.4 : currentSize.thumb,
                            x: isPressed ? (isChecked ? -(currentSize.thumb * 0.2) : 0) : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                        }}
                        className={cn(
                            "h-full rounded-full shadow-lg flex items-center justify-center transition-colors duration-200",
                            isChecked
                                ? "bg-primary!"
                                : "bg-zinc-400 dark:bg-zinc-500"
                        )}
                    >
                        {/* Inner Status Icon */}
                        <AnimatePresence mode="wait">
                            {isChecked ? (
                                <motion.div
                                    key="on"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="h-1.5 w-1.5 rounded-full bg-white/30 dark:bg-black/30"
                                />
                            ) : (
                                <motion.div
                                    key="off"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.4 }}
                                    className="h-2 w-px bg-white  rounded-full rotate-12"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Ripple Effect Background */}
                <AnimatePresence>
                    {isChecked && !isPressed && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.2 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-primary/20 blur-md -z-10 rounded-full"
                        />
                    )}
                </AnimatePresence>
            </div>

            {label && (
                <span className={cn(
                    "font-bold tracking-tight transition-colors duration-200",
                    isChecked ? "text-foreground" : "text-muted-foreground",
                    currentSize.label
                )}>
                    {label}
                </span>
            )}
        </label>
    )
}
