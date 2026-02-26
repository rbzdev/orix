import { createHighlighter } from "shiki"
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers"
import { CopyButton } from "./copy-button"

let highlighter: any = null

export async function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
    if (!highlighter) {
        highlighter = await createHighlighter({
            themes: ["dark-plus", "light-plus"],
            langs: ["tsx", "bash", "json", "css"],
        })
    }

    const html = highlighter.codeToHtml(code, {
        lang,
        themes: {
            light: "light-plus",
            dark: "dark-plus",
        },
        transformers: [
            transformerNotationHighlight(),
            transformerNotationDiff(),
        ],
    })

    return (
        <div className="group relative rounded-xl border bg-zinc-500 dark:bg-zinc-950 overflow-hidden shadow-sm transition-all hover:shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400 dark:bg-red-500/30 border border-red-500/20" />
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-400 dark:bg-amber-500/30 border border-amber-500/20" />
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500/30 border border-emerald-500/20" />
                    </div>
                    <span className="  text-muted-foreground/50">{lang}</span>
                </div>
                <CopyButton
                    content={code}
                    className="text-xl transition-opacity border-none bg-transparent hover:bg-muted"
                />
            </div>

            {/* Content */}
            <div className="relative p-0 overflow-x-auto text-[13px] leading-relaxed [&_pre]:!bg-transparent! [&_code]:!bg-transparent! [&_pre]:p-4">
                <div
                    className="shiki-wrapper"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    )
}
