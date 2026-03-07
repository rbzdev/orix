import Link from "next/link"
import { getRegistryByType } from "@/lib/registry"
import { Icon } from "@iconify/react"
import { Navbar } from "@/components/block/navbar"
import { Footer } from "@/components/footer"

export default async function BlocksPage() {
    const blocks = await getRegistryByType("registry:block")

    return (
        <div className="relative min-h-screen bg-background font-sans antialiased">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col gap-4 mb-16">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
                            Premium <span className="text-primary">Blocks</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                            A curated selection of high-fidelity UI blocks ready to be dropped into your project.
                            Fully responsive, accessible, and beautifully animated.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blocks.map((block) => (
                            <Link
                                key={block.name}
                                href={`/docs/${block.name}`}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border bg-card transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
                            >
                                <div className="aspect-video w-full bg-muted/30 flex items-center justify-center border-b group-hover:bg-muted/50 transition-colors">
                                    <Icon icon="proicons:component" className="text-6xl text-muted-foreground/20 group-hover:text-primary/20 group-hover:scale-110 transition-all duration-500" />
                                </div>
                                <div className="p-8 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">{block.title}</h3>
                                        <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                                            <Icon icon="guidance:left-arrow" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                        {block.description}
                                    </p>
                                    <div className="pt-4 flex flex-wrap gap-2">
                                        {block.dependencies?.slice(0, 3).map(dep => (
                                            <span key={dep} className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
                                                {dep.split('/').pop()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
