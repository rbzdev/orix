import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function DevHuntBanner() {
    return (
        <div className="text-center bg-blue-950 text-white py-4 flex items-center justify-center gap-4 text-xs sm:text-sm">
            <h4> We are live on DevHunt: tool of the week contest </h4>

            <Link
                href={"https://devhunt.org/tool/orix-ui"}
                target="blank"
                className="flex items-center gap-1 group text-orange-400 font-bold"
            >
                <span className="group-hover:underline"> check it out</span>
                <ArrowRight height={15} width={15} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
        </div>
    )
}