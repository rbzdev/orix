"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type CheckboxVariant = "bounce" | "scale" | "reveal"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string
    size?: "sm" | "md" | "lg"
    variant?: CheckboxVariant
}

export function Checkbox({
    label,
    size = "md",
    variant = "bounce",
    className,
    checked: controlledChecked,
    onChange,
    disabled,
    ...props
}: CheckboxProps) {
    const [internalChecked, setInternalChecked] = React.useState(false)
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked

    const sizes = {
        sm: "h-4 w-4 rounded",
        md: "h-5 w-5 rounded-md",
        lg: "h-6 w-6 rounded-lg",
    }

    const labelSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    }

    const checkIconSizes = {
        sm: 10,
        md: 12,
        lg: 14,
    }

    const variants = {
        bounce: {
            checked: { scale: [1, 1.2, 1], rotate: [0, 5, 0] },
            unchecked: { scale: 1, rotate: 0 }
        },
        scale: {
            checked: { scale: 1 },
            unchecked: { scale: 0 }
        },
        reveal: {
            checked: { pathLength: 1, opacity: 1 },
            unchecked: { pathLength: 0, opacity: 0 }
        }
    }

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (controlledChecked === undefined) {
            setInternalChecked(e.target.checked)
        }
        onChange?.(e)
    }

    return (
        <label className={cn(
            "group inline-flex items-center gap-2 cursor-pointer select-none transition-opacity",
            disabled && "opacity-50 cursor-not-allowed",
            className
        )}>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleToggle}
                    disabled={disabled}
                    {...props}
                />

                {/* Checkbox Box */}
                <motion.div
                    animate={isChecked ? "checked" : "unchecked"}
                    variants={variant === "bounce" ? variants.bounce : undefined}
                    className={cn(
                        "flex items-center justify-center border-2 transition-colors duration-200",
                        sizes[size],
                        isChecked
                            ? "bg-primary border-primary shadow-lg shadow-primary/20"
                            : "bg-background border-border group-hover:border-primary/50"
                    )}
                >
                    <AnimatePresence initial={false}>
                        {isChecked && (
                            <motion.svg
                                width={checkIconSizes[size]}
                                height={checkIconSizes[size]}
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary-foreground"
                            >
                                <motion.path
                                    d="M3 7l3 3l5-5"
                                    initial={variant === "reveal" ? "unchecked" : "checked"}
                                    animate="checked"
                                    exit="unchecked"
                                    variants={variant === "reveal" ? variants.reveal : variants.scale}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                />
                            </motion.svg>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Focus Ring / Active Effect */}
                <div className={cn(
                    "absolute -inset-1 rounded-[inherit] border-2 border-primary/20 opacity-0 scale-75 transition-all group-active:opacity-100 group-active:scale-100",
                    isChecked ? "block" : "hidden"
                )} />
            </div>

            {label && (
                <span className={cn(
                    "font-medium text-foreground/80 group-hover:text-foreground transition-colors",
                    labelSizes[size]
                )}>
                    {label}
                </span>
            )}
        </label>
    )
}
