"use client"

import * as React from "react"
import { CodeBlockClient } from "./code-block-client"
import { CopyButton } from "./copy-button"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface InstallTabsProps {
    slug?: string
    command?: string
    code?: string
    dependencies?: string[]
    targetPath?: string
}

const pms = [
    { id: "pnpm", label: "pnpm", icon: "logos:pnpm" },
    { id: "npx", label: "npx", icon: "logos:npm-icon" },
    { id: "npm", label: "npm", icon: "logos:npm-icon" },
    { id: "yarn", label: "yarn", icon: "logos:yarn" },
    { id: "bun", label: "bun", icon: "logos:bun" },
]

export function InstallTabs({ slug, command, code, dependencies = [], targetPath }: InstallTabsProps) {
    const [mode, setMode] = React.useState<"cli" | "manual">("cli")
    const [expanded, setExpanded] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState("pnpm")

    const getCommand = (pm: string) => {
        const baseUrl = "https://orix-three.vercel.app"

        if (slug) {
            switch (pm) {
                case "pnpm": return `pnpm dlx shadcn@latest add ${baseUrl}/r/${slug}.json`
                case "npx": return `npx shadcn@latest add ${baseUrl}/r/${slug}.json`
                case "npm": return `npm exec shadcn@latest add ${baseUrl}/r/${slug}.json`
                case "yarn": return `yarn dlx shadcn@latest add ${baseUrl}/r/${slug}.json`
                case "bun": return `bun x shadcn@latest add ${baseUrl}/r/${slug}.json`
                default: return `npx shadcn@latest add ${baseUrl}/r/${slug}.json`
            }
        }

        if (command) {
            if (command.includes("shadcn@latest init")) {
                switch (pm) {
                    case "pnpm": return `pnpm dlx shadcn@latest init`
                    case "npx": return `npx shadcn@latest init`
                    case "npm": return `npm exec shadcn@latest init`
                    case "yarn": return `yarn dlx shadcn@latest init`
                    case "bun": return `bun x shadcn@latest init`
                    default: return `npx shadcn@latest init`
                }
            }
            return command
        }

        return ""
    }

    const getDepInstallCommand = (pm: string) => {
        if (!dependencies.length) return ""
        const deps = dependencies.join(" ")
        switch (pm) {
            case "pnpm": return `pnpm add ${deps}`
            case "npm": return `npm install ${deps}`
            case "yarn": return `yarn add ${deps}`
            case "bun": return `bun add ${deps}`
            case "npx": return `npm install ${deps}`
            default: return `npm install ${deps}`
        }
    }

    return (
        <div className="group relative my-6 overflow-hidden ">
            {/* Main Tabs (CLI / Manual) */}
            <div className="flex items-center justify-between mb-4 ">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setMode("cli")}
                        className={cn(
                            "px-4 py-3 tracking-wider transition-all border-b-2",
                            mode === "cli"
                                ? "border-primary text-zinc-900 dark:text-zinc-100"
                                : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                        )}
                    >
                        CLI
                    </button>
                    {code && (
                        <button
                            onClick={() => setMode("manual")}
                            className={cn(
                                "px-4 py-3 tracking-wider transition-all border-b-2",
                                mode === "manual"
                                    ? "border-primary text-zinc-900 dark:text-zinc-100"
                                    : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                            )}
                        >
                            MANUAL
                        </button>
                    )}
                </div>
            </div>

            {mode === "cli" ? (
                <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
                    <div className="flex items-center justify-between gap-3 p-3 bg-zinc-50/30 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            {pms.map((pm) => (
                                <button
                                    key={pm.id}
                                    onClick={() => setActiveTab(pm.id)}
                                    className={cn(
                                        "relative flex items-center gap-2 px-2.5 py-0.5  tracking-wider transition-all border rounded-md shadow-sm",
                                        activeTab === pm.id
                                            ? "text-zinc-100 bg-zinc-900 border-zinc-900 dark:text-zinc-950 dark:bg-zinc-50 dark:border-zinc-50"
                                            : "bg-white text-zinc-500 border-zinc-200 hover:text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:text-zinc-200"
                                    )}
                                >
                                    <Icon icon={pm.icon} className={cn("size-3.5", (pm.id === "npx" || pm.id === "npm") ? "" : "grayscale", activeTab === pm.id && "grayscale-0")} />
                                    {pm.label}
                                </button>
                            ))}
                        </div>
                        <CopyButton
                            content={getCommand(activeTab)}
                            className="h-8 w-8 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                            componentName={slug}
                            method="cli"
                        />
                    </div>
                    <div className="p-0">
                        <CodeBlockClient
                            code={getCommand(activeTab)}
                            lang="bash"
                            withTopBar={false}
                            className="border-none rounded-none shadow-none"
                        />
                    </div>
                </div>
            ) : (
                <div className="p-4 lg:p-6 space-y-8 bg-zinc-200/30 dark:bg-zinc-900/50 rounded-xl border">
                    {/* Step 1: Dependencies */}
                    {dependencies.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-[14px] text-white dark:bg-white dark:text-zinc-900">1</span>

                                Install Dependencies
                            </h4>
                            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
                                <div className="flex items-center justify-between p-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <div className="flex items-center gap-1">
                                        {pms.filter(pm => pm.id !== "npx").map((pm) => (
                                            <button
                                                key={pm.id}
                                                onClick={() => setActiveTab(pm.id)}
                                                className={cn(
                                                    "px-3 py-1.5 text-sm tracking-widest transition-all rounded-md flex items-center gap-1",
                                                    activeTab === pm.id
                                                        ? "bg-primary/20 border border-primary/20 text-primary"
                                                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 grayscale hover:grayscale-0"
                                                )}
                                            >
                                                <Icon icon={pm.icon} className={cn("size-3.5")} />
                                                {pm.label}
                                            </button>
                                        ))}
                                    </div>
                                    <CopyButton
                                        content={getDepInstallCommand(activeTab)}
                                        className="h-7 w-7"
                                        componentName={slug}
                                        method="manual"
                                    />
                                </div>
                                <div className="p-4 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                                    $ {getDepInstallCommand(activeTab)}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Source Code */}
                    <div className="space-y-4">
                        <h4 className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-[14px] text-white dark:bg-white dark:text-zinc-900">{dependencies.length > 0 ? "2" : "1"}</span>
                            Copy Component Code
                        </h4>

                        {/* <p className="text-xs text-muted-foreground ml-9">
                            Create the file at <code className="text-indigo-500 font-bold">{targetPath || `components/ui/${slug}.tsx`}</code> and paste the following code:
                        </p> */}

                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                <span className="text-[10px] font-mono text-zinc-400">{`components/ui/${slug}.tsx`}</span>
                                <CopyButton
                                    content={code || ""}
                                    className="h-7 w-7"
                                    componentName={slug}
                                    method="manual"
                                />
                            </div>

                            <div className="relative">
                                {/* Code Block */}
                                <div className={cn("relative overflow-y-auto group/code", expanded ? "max-h-[800px]" : "max-h-[400px]")}>
                                    <CodeBlockClient
                                        code={code || ""}
                                        lang="tsx"
                                        withTopBar={false}
                                        className="border-none rounded-none shadow-none"
                                    />

                                </div>


                                <div className={`absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-zinc-50 dark:from-zinc-950 to-transparent pointer-events-none transition-opacity ${expanded ? "opacity-0" : "opacity-100"}`} />


                                {/* Expand Button */}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20"
                                    onClick={() => setExpanded(prev => !prev)}
                                >
                                    <Icon icon={expanded ? "material-symbols-light:collapse-content-rounded" : "material-symbols-light:expand-content-rounded"} className="size-5" />
                                    <span>{expanded ? "Collapse" : "Expand"}</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Done */}
                    <div className="space-y-4 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                        <p className="text-xs text-zinc-500 italic ml-9">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100"> NOTE :</span> Update the import paths to match your project setup if necessary.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

