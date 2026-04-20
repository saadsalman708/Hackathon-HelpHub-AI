"use client"
import { useParams } from "next/navigation"
import PageHero from "@/components/layout/PageHero"
import RequestMeta from "@/components/request/RequestMeta"
import RequestSummary from "@/components/request/RequestSummary"
import RequestActions from "@/components/request/RequestActions"
import RequesterInfo from "@/components/request/RequesterInfo"
import HelperList from "@/components/request/HelperList"
import { useRequests } from "@/lib/hooks/useRequests"
import { useAuth } from "@/lib/hooks/useAuth"

export default function RequestDetailPage() {
  const params = useParams()
  const { requests, loading: reqLoading } = useRequests()
  const { users, currentUser, loading: authLoading } = useAuth()

  if (reqLoading || authLoading) return null

  const requestId = params.id as string
  const request = requests.find((r) => r.id === requestId)

  if (!request) {
    return (
      <main className="container">
        <PageHero
          eyebrow="Error"
          title="Request not found"
          subtitle="This request may have been deleted or doesn't exist."
        />
      </main>
    )
  }

  const requester = users.find((u) => u.id === request.requesterId)
  const helpers = users.filter((u) => request.helperIds.includes(u.id))

  return (
    <main className="container">
      <PageHero
        eyebrow="Request detail"
        meta={<RequestMeta request={request} />}
        title={request.title}
        subtitle={request.description}
      />

      <section className="detail-grid section">
        <div className="stack">
          <RequestSummary request={request} />
          <RequestActions request={request} currentUser={currentUser} />
        </div>

        <aside className="stack">
          <RequesterInfo requester={requester} />
          <HelperList helpers={helpers} />
        </aside>
      </section>
    </main>
  )
}