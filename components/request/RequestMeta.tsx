import Tag from "@/components/ui/Tag"
import type { Request } from "@/lib/types"

interface RequestMetaProps {
  request: Request
}

export default function RequestMeta({ request }: RequestMetaProps) {
  const urgencyVariant =
    request.urgency === "Critical" || request.urgency === "High"
      ? "urgent"
      : "default"
      
  const statusVariant = request.status === "Solved" ? "success" : "default"

  return (
    <div className="card-meta">
      <Tag>{request.category}</Tag>
      <Tag variant={urgencyVariant}>{request.urgency}</Tag>
      <Tag variant={statusVariant}>{request.status}</Tag>
    </div>
  )
}