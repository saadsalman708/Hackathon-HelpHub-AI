import SectionHead from "@/components/layout/SectionHead"
import Button from "@/components/ui/Button"

export default function FeatureSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          kicker="Core flow"
          title="From struggling alone to solving together"
          action={
            <Button variant="secondary" href="/onboarding">
              Try onboarding AI
            </Button>
          }
        />
        <div className="card-grid">
          <article className="feature-card fade-in">
            <h3>Ask for help clearly</h3>
            <p>
              Create structured requests with category, urgency, AI suggestions,
              and tags that attract the right people.
            </p>
          </article>
          <article className="feature-card fade-in">
            <h3>Discover the right people</h3>
            <p>
              Use the explore feed, helper lists, notifications, and messaging
              to move quickly once a match happens.
            </p>
          </article>
          <article className="feature-card fade-in">
            <h3>Track real contribution</h3>
            <p>
              Trust scores, badges, solved requests, and rankings help the
              community recognize meaningful support.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}