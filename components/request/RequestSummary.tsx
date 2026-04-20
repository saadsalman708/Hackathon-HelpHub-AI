import Card from "@/components/ui/Card"
import Tag from "@/components/ui/Tag"
import type { Request } from "@/lib/types"

interface RequestSummaryProps {
  request: Request
}

export default function RequestSummary({ request }: RequestSummaryProps) {
  return (
    <Card>
      <p className="section-kicker">AI summary</p>
      <h3>What this request needs</h3>
      <p>{request.aiSummary}</p>
      <div className="tag-row">
        {request.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Card>
  )
}