import Link from "next/link"
import { getRegistryByType } from "@/lib/registry"
import { Icon } from "@iconify/react"
import { Navbar } from "@/components/block/navbar"
import { Footer } from "@/components/footer"

export default async function ComponentsPage() {
    const components = await getRegistryByType("registry:ui")

    return (
        <div className="relative min-h-screen bg-background font-sans antialiased">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col gap-4 mb-16">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                            <Icon icon="basil:box-outline" className="text-xl" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font- tracking-tighter text-zinc-900 dark:text-white">
                            Atomic <span className="text-primary">Components</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                            Essential UI building blocks engineered for high performance and maximum customizability.
                            Just copy, paste, and make it yours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {components.map((component) => (
                            <Link
                                key={component.name}
                                href={`/docs/${component.name}`}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
                            >
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <Icon icon="solar:widget-2-bold-duotone" className="text-xl" />
                                        </div>
                                        <div className="h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Icon icon="guidance:left-arrow" className="text-primary" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
                                            {component.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                            {component.description}
                                        </p>
                                    </div>

                                    {component.dependencies && component.dependencies.length > 0 && (
                                        <div className="pt-2 flex flex-wrap gap-1.5">
                                            {component.dependencies.slice(0, 2).map(dep => (
                                                <span key={dep} className="px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-900 border text-[9px] font-mono text-zinc-400 uppercase">
                                                    {dep.split('/').pop()}
                                                </span>
                                            ))}
                                            {component.dependencies.length > 2 && (
                                                <span className="text-[9px] font-mono text-zinc-400 self-center">
                                                    +{component.dependencies.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    )}
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
