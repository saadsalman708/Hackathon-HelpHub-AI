import SectionHead from "@/components/layout/SectionHead"
import Button from "@/components/ui/Button"
import RequestCard from "@/components/request/RequestCard"
import type { Request, User } from "@/lib/types"

interface FeaturedRequestsProps {
  requests: Request[]
  users: User[]
}

export default function FeaturedRequests({ requests, users }: FeaturedRequestsProps) {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          kicker="Featured requests"
          title="Community problems currently in motion"
          action={
            <Button variant="secondary" href="/explore">
              View full feed
            </Button>
          }
        />
        <div className="card-grid">
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
      </div>
    </section>
  )
}