"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search as SearchIcon, Command, X, Component as ComponentIcon, Box, FileText, ArrowRight } from "lucide-react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import registry from "@/registry.json"

interface SearchResult {
    id: string
    title: string
    description: string
    type: "component" | "block" | "doc"
    href: string
    icon?: string
}

interface GlobalSearchProps {
    isScrolled?: boolean
}

export function GlobalSearch({ isScrolled }: GlobalSearchProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<SearchResult[]>([])
    const [activeIndex, setActiveIndex] = React.useState(0)
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Close on escape, toggle on Cmd+K
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Focus input and prevent scroll
    React.useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
            setQuery("")
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    // Search logic
    React.useEffect(() => {
        if (!query.trim()) {
            setResults([])
            return
        }

        const searchTerm = query.toLowerCase()

        // Search in registry
        const registryResults: SearchResult[] = registry.items
            .filter(item =>
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            )
            .map(item => ({
                id: item.name,
                title: item.title,
                description: item.description,
                type: item.type.includes("block") ? "block" : "component",
                href: `/docs/${item.name}` // Consistency with user's previous preference
            }))

        // Hardcoded Docs (Simplified)
        const docResults: SearchResult[] = ([
            { id: "intro", title: "Introduction", description: "Getting started with Orix-UI", type: "doc", href: "/docs" },
            { id: "install", title: "Installation", description: "How to install dependencies", type: "doc", href: "/docs/installation" },
            { id: "theming", title: "Theming", description: "Customize colors and styles", type: "doc", href: "/docs/theming" }
        ] as const).filter(doc =>
            doc.title.toLowerCase().includes(searchTerm) ||
            doc.description.toLowerCase().includes(searchTerm)
        ) as SearchResult[]

        const allResults = [...docResults, ...registryResults].slice(0, 8)
        setResults(allResults)
        setActiveIndex(0)
    }, [query])

    const handleSelect = (result: SearchResult) => {
        router.push(result.href)
        setIsOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setActiveIndex(prev => (prev + 1) % results.length)
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setActiveIndex(prev => (prev - 1 + results.length) % results.length)
        } else if (e.key === "Enter" && results[activeIndex]) {
            handleSelect(results[activeIndex])
        }
    }

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "group relative flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/50 text-sm text-zinc-500 transition-all hover:bg-white hover:ring-2 hover:ring-primary/20 dark:border-zinc-800 dark:bg-black/50 dark:text-zinc-400 dark:hover:bg-zinc-900 overflow-hidden",
                    isScrolled ? "h-9 w-9 p-0" : "h-9 w-full max-w-[240px] px-3"
                )}
                title="Search Orix (Cmd+K)"
            >
                <SearchIcon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isScrolled ? "mx-auto" : "")} />

                <AnimatePresence mode="wait">
                    {!isScrolled && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-1 items-center gap-2 overflow-hidden"
                        >
                            <span className="flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">Search Orix...</span>
                            <kbd className="hidden items-center gap-1 rounded bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 dark:bg-zinc-800 dark:text-zinc-400 sm:flex">
                                <Command className="h-2.5 w-2.5" />K
                            </kbd>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <div className="fixed inset-0 z-100 flex items-start justify-center pt-24 sm:pt-40 px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:bg-zinc-950"
                        >
                            {/* Input Field */}
                            <div className="relative flex items-center border-b border-zinc-100 p-4 dark:border-zinc-800">
                                <SearchIcon className="mr-3 h-5 w-5 text-zinc-400" />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search components, blocks, docs..."
                                    className="flex-1 bg-transparent text-lg outline-none placeholder:text-zinc-500 dark:text-white"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                >
                                    <X className="h-4 w-4 text-zinc-400" />
                                </button>
                            </div>

                            {/* Results Area */}
                            <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-none">
                                {!query && (
                                    <div className="p-8 text-center">
                                        <div className="mb-4 flex justify-center">
                                            <div className="rounded-full bg-primary/10 p-4">
                                                <Command className="h-8 w-8 text-primary" />
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-bold dark:text-white">Quick Search</h3>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            Type to find anything in the Orix ecosystem.
                                        </p>
                                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                                            {["Button", "Carousel", "Hero", "Sidebar"].map((tag) => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setQuery(tag)}
                                                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {query && results.length === 0 && (
                                    <div className="p-8 text-center">
                                        <p className="text-sm text-zinc-500">No results found for "{query}"</p>
                                    </div>
                                )}

                                {results.length > 0 && (
                                    <div className="grid gap-1">
                                        {results.map((result, index) => (
                                            <button
                                                key={result.id}
                                                onClick={() => handleSelect(result)}
                                                onMouseEnter={() => setActiveIndex(index)}
                                                className={cn(
                                                    "group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all",
                                                    activeIndex === index
                                                        ? "bg-zinc-100 dark:bg-white/5"
                                                        : "hover:bg-zinc-50 dark:hover:bg-white/5"
                                                )}
                                            >
                                                <div className={cn(
                                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                                                    result.type === "component" && "bg-blue-500/10 text-blue-500",
                                                    result.type === "block" && "bg-purple-500/10 text-purple-500",
                                                    result.type === "doc" && "bg-amber-500/10 text-amber-500",
                                                    activeIndex === index && "scale-110"
                                                )}>
                                                    {result.type === "component" && <ComponentIcon className="h-5 w-5" />}
                                                    {result.type === "block" && <Box className="h-5 w-5" />}
                                                    {result.type === "doc" && <FileText className="h-5 w-5" />}
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold dark:text-white truncate">{result.title}</span>
                                                        <span className="rounded-full border border-zinc-200 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:border-zinc-800">
                                                            {result.type}
                                                        </span>
                                                    </div>
                                                    <p className="mt-0.5 truncate text-xs text-zinc-500">{result.description}</p>
                                                </div>
                                                <ArrowRight className={cn(
                                                    "h-4 w-4 text-zinc-400 transition-all",
                                                    activeIndex === index ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                                                )} />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                                        <kbd className="rounded bg-zinc-200 px-1.5 py-0.5 dark:bg-zinc-800">↑↓</kbd>
                                        <span>Navigate</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                                        <kbd className="rounded bg-zinc-200 px-1.5 py-0.5 dark:bg-zinc-800">Enter</kbd>
                                        <span>Select</span>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                    Orix Search
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
