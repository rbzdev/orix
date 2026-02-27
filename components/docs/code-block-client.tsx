"use client"

import React, { useEffect, useState } from "react"
import { createHighlighter } from "shiki"
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers"
import { cn } from "@/lib/utils"

interface CodeBlockClientProps {
    code: string
    lang?: string
    className?: string
    withTopBar?: boolean
}

export function CodeBlockClient({ code, lang = "bash", className, withTopBar = true }: CodeBlockClientProps) {
    const [html, setHtml] = useState<string>("")
    const [highlighter, setHighlighter] = useState<any>(null)

    useEffect(() => {
        async function highlight() {
            if (!highlighter) {
                const hl = await createHighlighter({
                    themes: ["dark-plus", "light-plus"],
                    langs: ["tsx", "bash", "json", "css"],
                })
                setHighlighter(hl)
                const result = hl.codeToHtml(code, {
                    lang,
                    themes: { light: "light-plus", dark: "dark-plus" },
                    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
                })
                setHtml(result)
            } else {
                const result = highlighter.codeToHtml(code, {
                    lang,
                    themes: { light: "light-plus", dark: "dark-plus" },
                    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
                })
                setHtml(result)
            }
        }
        highlight()
    }, [code, lang, highlighter])

    return (
        <div className={cn("group relative rounded-xl border bg-zinc-50 dark:bg-zinc-950 overflow-hidden shadow-sm transition-all hover:shadow-md", className)}>
            {/* Header */}
            {withTopBar && (
                <div className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 border" />
                            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 border" />
                            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 border" />
                        </div>
                        <span className=" text-muted-foreground/50">{lang}</span>
                    </div>
                </div>
            )}
            {/* Content */}
            <div className="relative p-4 bg-white dark:bg-primary/10 overflow-x-auto text-[13px] font-mono leading-relaxed text-zinc-800 dark:text-zinc-200">
                <div className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    )
}
