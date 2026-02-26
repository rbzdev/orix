import { CodeBlock } from "@/components/docs/code-block"

export default function InstallationPage() {
    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Installation
                </h1>
                <p className="text-xl text-muted-foreground">
                    How to install and use Orix components in your project.
                </p>
            </div>

            <div className="space-y-6">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                    Prerequisites
                </h2>
                <p className="leading-7">
                    Orix is designed to work with <span className="font-semibold">Next.js,React 19, and Tailwind CSS 4. </span> You should also have `shadcn` initialized in your project.
                </p>
                <CodeBlock
                    code="npx shadcn@latest init"
                    lang="bash"
                />
            </div>

            <div className="space-y-6">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                    Adding Components
                </h2>
                <p className="leading-7">
                    Unlike traditional libraries, you don't install an npm package. You use the CLI to download the source code of the component directly into your project.
                </p>
                <p className="leading-7">
                    This allows you to customize the component as if you wrote it yourself.
                </p>
                <div className="relative rounded-lg bg-zinc-100 dark:bg-zinc-900 border p-6 space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</span>
                        Choose a component
                    </h4>
                    <p className="text-sm text-muted-foreground pl-8">Browse the components in the sidebar and copy the installation command.</p>

                    <h4 className="font-bold flex items-center gap-2 pt-4">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</span>
                        Run the command
                    </h4>
                    <p className="text-sm text-muted-foreground pl-8 italic">Example for the Button component:</p>
                    <CodeBlock
                        code="npx shadcn@latest add https://orix-ui.vercel.app/r/button.json"
                        lang="bash"
                    />
                </div>
            </div>
        </div>
    )
}
