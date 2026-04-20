import Button from "@/components/ui/Button"
import Eyebrow from "@/components/ui/Eyebrow"
import HeroStats from "./HeroStats"

interface HeroCopyProps {
  memberCount: number
  requestCount: number
  solvedCount: number
}

export default function HeroCopy({ memberCount, requestCount, solvedCount }: HeroCopyProps) {
  return (
    <div className="hero-copy fade-in">
      <Eyebrow>SMIT Grand Coding Night 2026</Eyebrow>
      <h1>Find help faster. Become help that matters.</h1>
      <p>
        HelpHub AI is a community-powered support network for students, mentors,
        creators, and builders. Ask for help, offer help, track impact, and let
        AI surface smarter matches across the platform.
      </p>
      <div className="hero-actions">
        <Button variant="primary" href="/dashboard">
          Open product demo
        </Button>
        <Button variant="secondary" href="/create-request">
          Post a request
        </Button>
      </div>
      <HeroStats
        memberCount={memberCount}
        requestCount={requestCount}
        solvedCount={solvedCount}
      />
    </div>
  )
}