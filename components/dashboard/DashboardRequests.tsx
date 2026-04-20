import RequestCard from "@/components/request/RequestCard"
import { useAuth } from "@/lib/hooks/useAuth"
import type { Request } from "@/lib/types"

interface DashboardRequestsProps {
  requests: Request[]
}

export default function DashboardRequests({ requests }: DashboardRequestsProps) {
  const { users } = useAuth()

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