export default function DocsPage() {
    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Introduction
                </h1>
                <p className="text-xl text-muted-foreground">
                    Welcome to the Orix documentation. Orix is a premium component registry built on top of shadcn/ui.
                </p>
            </div>
            <div className="space-y-6">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    What is Orix?
                </h2>
                <p className="leading-7">
                    Orix is not just another component library. It's a <strong>code distribution platform</strong>.
                    We provide high-quality, pre-styled components and blocks that you can "add" to your project using the shadcn CLI.
                </p>
                <p className="leading-7">
                    This means you don't install an npm package. You <strong>copy the source code</strong> into your project, giving you 100% ownership and flexibility to modify every single detail.
                </p>
            </div>
            <div className="space-y-6 pt-6">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                    Evolution
                </h2>
                <p className="leading-7 underline decoration-primary/20 underline-offset-4 font-medium">
                    Note: We are constantly updating our registry. Soon, we will allow selected contributors to offer paid components in addition to our open-source collection.
                </p>
            </div>
            <div className="flex gap-4 pt-4">
                <div className="flex-1 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                    <h3 className="font-semibold text-lg mb-2">Beautiful Components</h3>
                    <p className="text-sm text-muted-foreground">Handcrafted components with focus on aesthetics and micro-interactions.</p>
                </div>
                <div className="flex-1 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                    <h3 className="font-semibold text-lg mb-2">Copy & Paste</h3>
                    <p className="text-sm text-muted-foreground">Use the shadcn CLI to instantly add components to your existing codebase.</p>
                </div>
            </div>
        </div>
    )
}