"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800/50 animate-pulse transition-colors",
                // Premium Shimmer Overlay
                "after:absolute after:inset-0 after:animate-[shimmer_2s_infinite_linear]",
                "after:bg-linear-to-r after:from-transparent after:via-black/10 dark:after:via-white/5 after:to-transparent",
                "after:content-['']",
                className
            )}
            {...props}
        />
    )
}

export { Skeleton }
