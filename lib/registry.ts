import { promises as fs } from "fs"
import path from "path"

export interface RegistryItem {
    name: string
    type: "registry:ui" | "registry:block"
    title: string
    description?: string
    dependencies?: string[]
}

export async function getRegistry() {
    const registryPath = path.join(process.cwd(), "registry.json")
    const file = await fs.readFile(registryPath, "utf8")
    const data = JSON.parse(file)
    return data.items as RegistryItem[]
}

/**
 * Automagically discover items from the registry folders
 */
export async function getAutoRegistry() {
    const baseDir = path.join(process.cwd(), "registry/orix-default")
    const manifest = await getRegistry()

    const scanSubdir = async (subdir: string, type: "registry:ui" | "registry:block") => {
        try {
            const dirPath = path.join(baseDir, subdir)
            const files = await fs.readdir(dirPath)

            return files
                .filter(f => f.endsWith(".tsx") || f.endsWith(".ts"))
                .map(f => {
                    const name = f.replace(/\.(tsx|ts)$/, "")
                    const existing = manifest.find(m => m.name === name)

                    return {
                        name,
                        type,
                        title: existing?.title || name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
                        description: existing?.description || `Description for ${name}`,
                        dependencies: existing?.dependencies || []
                    }
                })
        } catch (e) {
            return []
        }
    }

    const uiItems = await scanSubdir("ui", "registry:ui")
    const blockItems = await scanSubdir("block", "registry:block")

    return [...uiItems, ...blockItems]
}

export async function getRegistryByType(type: "registry:ui" | "registry:block") {
    const items = await getAutoRegistry()
    return items.filter((item) => item.type === type)
}
