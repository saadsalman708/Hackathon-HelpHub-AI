import Tag from "@/components/ui/Tag"
import type { Request } from "@/lib/types"

interface AiRecommendationsProps {
  requests: Request[]
}

export default function AiRecommendations({ requests }: AiRecommendationsProps) {
  // Show top 4 requests as recommendations
  const recommended = requests.slice(0, 4)

  return (
    <div className="stack">
      {recommended.map((request) => (
        <div key={request.id} className="timeline-item">
          <strong>{request.title}</strong>
          <p>{request.aiSummary}</p>
          <div className="tag-row">
            <Tag>{request.category}</Tag>
            <Tag variant={["Critical", "High"].includes(request.urgency) ? "urgent" : "default"}>
              {request.urgency}
            </Tag>
          </div>
        </div>
      ))}
    </div>
  )
}