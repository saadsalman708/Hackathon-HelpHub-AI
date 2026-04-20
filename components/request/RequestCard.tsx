import Tag from "@/components/ui/Tag"
import Button from "@/components/ui/Button"
import RequestMeta from "./RequestMeta"
import type { Request, User } from "@/lib/types"

interface RequestCardProps {
  request: Request
  requester: User | undefined
}

export default function RequestCard({ request, requester }: RequestCardProps) {
  const helperCount = request.helperIds.length

  return (
    <article className="request-card fade-in">
      <RequestMeta request={request} />
      <h3>{request.title}</h3>
      <p>{request.description}</p>
      <div className="tag-row">
        {request.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="list-item" style={{ paddingBottom: 0, borderBottom: 0 }}>
        <div>
          <strong>{requester?.name ?? "Unknown user"}</strong>
          <p>
            {request.location} • {helperCount} helper
            {helperCount === 1 ? "" : "s"} interested
          </p>
        </div>
        <Button variant="secondary" href={`/request/${request.id}`}>
          Open details
        </Button>
      </div>
    </article>
  )
}