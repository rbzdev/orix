import { notFound } from "next/navigation"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { getAutoRegistry } from "@/lib/registry"
import { componentsMetadata } from "@/registry/metadata"

export default async function ComponentPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const registryItems = await getAutoRegistry()
    const item = registryItems.find(i => i.name === slug)

    if (!item) {
        notFound()
    }

    const metadata = componentsMetadata[slug] || {
        usage: `import { ${item.title.replace(/\s+/g, '')} } from "@/components/..." \n\n // No usage example yet`,
        props: []
    }

    const installation = `npx shadcn@latest add https://orix-ui.vercel.app/r/${slug}.json`

    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {item.title}
                </h1>
                <p className="text-xl text-muted-foreground whitespace-pre-wrap">
                    {item.description}
                </p>
            </div>

            <div className="space-y-6">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                    Preview
                </h2>
                <ComponentPreview name={slug} />
            </div>

            <div className="space-y-6">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                    Installation
                </h2>
                <CodeBlock code={installation} lang="bash" />
            </div>

            <div className="space-y-6">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                    Usage
                </h2>
                <CodeBlock code={metadata.usage} lang="tsx" />
            </div>

            {item.dependencies && item.dependencies.length > 0 && (
                <div className="space-y-6">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Dependencies
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {item.dependencies.map((dep: string) => (
                            <span key={dep} className="px-3 py-1 bg-muted rounded-full text-sm font-medium border">
                                {dep}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {metadata.props && metadata.props.length > 0 && (
                <div className="space-y-6">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        Props
                    </h2>
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted text-muted-foreground font-medium border-b">
                                <tr>
                                    <th className="px-4 py-3">Prop</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Default</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {metadata.props.map((prop: any) => (
                                    <tr key={prop.name} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-primary">{prop.name}</td>
                                        <td className="px-4 py-3">
                                            {prop.type === "enum" && prop.values ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {prop.values.map((v: string) => (
                                                        <code key={v} className="bg-muted px-1 rounded text-xs">"{v}"</code>
                                                    ))}
                                                </div>
                                            ) : (
                                                <code className="text-xs">{prop.type}</code>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">{prop.default || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
