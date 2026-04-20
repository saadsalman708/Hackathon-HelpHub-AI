import type { ReactNode } from "react"
import Eyebrow from "@/components/ui/Eyebrow"

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  subtitle: string
  meta?: ReactNode
}

export default function PageHero({ eyebrow, title, subtitle, meta }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="panel">
        <Eyebrow>{eyebrow}</Eyebrow>
        {meta && <div className="tag-row">{meta}</div>}
        <h1 style={{ fontSize: "clamp(2.1rem, 4vw, 4.2rem)" }}>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  )
}