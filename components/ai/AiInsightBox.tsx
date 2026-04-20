import Metric from "@/components/ui/Metric"

interface AiInsightBoxProps {
  category: string
  urgency: string
  tags: string[]
  summary: string
}

export default function AiInsightBox({
  category,
  urgency,
  tags,
  summary,
}: AiInsightBoxProps) {
  return (
    <div data-ai-request-insights>
      <Metric 
        label="Suggested category" 
        value={category || "Type to generate"} 
      />
      <Metric 
        label="Detected urgency" 
        value={urgency || "Type to generate"} 
      />
      <Metric
        label="Suggested tags"
        value={tags.length > 0 ? tags.join(", ") : "Add more detail for smarter tags"}
      />
      <Metric
        label="Rewrite suggestion"
        value={summary || "Start describing the challenge to generate a stronger version."}
      />
    </div>
  )
}