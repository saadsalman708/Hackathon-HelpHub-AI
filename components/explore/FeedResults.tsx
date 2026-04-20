import RequestCard from "@/components/request/RequestCard"
import Card from "@/components/ui/Card"
import type { Request, User } from "@/lib/types"

interface FeedResultsProps {
  requests: Request[]
  users: User[]
}

export default function FeedResults({ requests, users }: FeedResultsProps) {
  if (requests.length === 0) {
    return (
      <Card>
        <h3>No requests found</h3>
        <p>Try broadening the filters to surface more matches.</p>
      </Card>
    )
  }

  return (
    <div className="stack">
      {requests.map((request) => {
        const requester = users.find((u) => u.id === request.requesterId)
        return (
          <RequestCard
            key={request.id}
            request={request}
            requester={requester}
          />
        )
      })}
    </div>
  )
}