"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function CopyInput({
    value,
    className = "",
    label = "Copy API Key",
}: {
    value: string
    className?: string
    label?: string
}) {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy!", err)
        }
    }

    return (
        <div className={cn("relative group w-full max-w-sm", className)}>
            <div className="flex h-11 w-full items-center gap-2 rounded-xl border bg-muted/30 px-1.5 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20">
                <input
                    readOnly
                    value={value}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground font-mono"
                />

                <button
                    onClick={handleCopy}
                    className={cn(
                        "flex h-8 items-center gap-2 rounded-lg px-2 text-xs transition-all active:scale-90",
                        copied
                            ? "bg-emerald-500 text-white"
                            : "bg-background border hover:bg-accent text-foreground"
                    )}
                >
                    {copied ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="animate-in zoom-in"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    )}
                    <span>{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>
            <p className="mt-1.5 px-1 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest">
                {label}
            </p>
        </div>
    )
}
