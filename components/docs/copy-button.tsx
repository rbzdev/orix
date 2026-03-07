"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { trackComponentCopy } from "@/lib/analytics";

export function CopyButton({
    content,
    className,
    componentName,
    method = "manual"
}: {
    content: string;
    className?: string;
    componentName?: string;
    method?: "cli" | "manual";
}) {
    const [copied, setCopied] = React.useState(false)

    const copy = () => {
        navigator.clipboard.writeText(content)

        // Track the copy event with Google Analytics
        if (componentName) {
            trackComponentCopy(componentName, method)
        }

        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={copy}
            className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md border bg-background transition-all hover:bg-muted active:scale-95",
                className
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
                    className="text-emerald-500 animate-in zoom-in"
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
                    className="text-muted-foreground"
                >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
            )}
        </button>
    )
}
