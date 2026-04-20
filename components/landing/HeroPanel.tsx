import Orb from "@/components/ui/Orb"
import Eyebrow from "@/components/ui/Eyebrow"

interface HeroPanelProps {
  topScore: number
}

export default function HeroPanel({ topScore }: HeroPanelProps) {
  return (
    <div className="hero-panel fade-in">
      <Orb />
      <Eyebrow>Live product feel</Eyebrow>
      <h2>More than a form. More like an ecosystem.</h2>
      <p>
        A polished multi-page experience inspired by product platforms, with AI
        summaries, trust scores, contribution signals, notifications, and
        leaderboard momentum built directly in Next.js, Firebase, and Gemini AI.
      </p>
      <div className="stack">
        <div className="feature-card" style={{ color: "black" }}>
          <h3>AI request intelligence</h3>
          <p style={{ color: "black" }}>
            Auto-categorization, urgency detection, tags, rewrite suggestions,
            and trend snapshots.
          </p>
        </div>
        <div className="feature-card" style={{ color: "black" }}>
          <h3>Community trust graph</h3>
          <p style={{ color: "black" }}>
            Badges, helper rankings, trust score boosts, and visible
            contribution history.
          </p>
        </div>
        <div className="feature-card" style={{ color: "black" }}>
          <h3>{topScore}%</h3>
          <p style={{ color: "black" }}>
            Top trust score currently active across the sample mentor network.
          </p>
        </div>
      </div>
    </div>
  )
}