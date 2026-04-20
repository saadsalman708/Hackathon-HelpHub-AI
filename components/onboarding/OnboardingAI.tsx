import Card from "@/components/ui/Card"
import Metric from "@/components/ui/Metric"
import type { SkillSuggestions } from "@/lib/types"

interface OnboardingAIProps {
  suggestions: SkillSuggestions
}

export default function OnboardingAI({ suggestions }: OnboardingAIProps) {
  return (
    <Card className="stack">
      <div>
        <p className="section-kicker">AI suggestions</p>
        <h2>Your likely contribution map</h2>
      </div>
      
      <div>
        <Metric
          label="You can likely help with"
          value={suggestions.canHelpWith.join(", ") || "None detected"}
        />
        <Metric
          label="You may want support in"
          value={suggestions.needsHelpIn.join(", ") || "None detected"}
        />
        <Metric
          label="Suggested role fit"
          value={suggestions.roleFit || "Need Help"}
        />
      </div>
    </Card>
  )
}