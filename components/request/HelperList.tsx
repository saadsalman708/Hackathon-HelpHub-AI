import Card from "@/components/ui/Card"
import HelperItem from "./HelperItem"
import type { User } from "@/lib/types"

interface HelperListProps {
  helpers: User[]
}

export default function HelperList({ helpers }: HelperListProps) {
  return (
    <Card>
      <p className="section-kicker">Helpers</p>
      <h3>People ready to support</h3>
      <div className="helper-list">
        {helpers.length > 0 ? (
          helpers.map((helper) => (
            <HelperItem key={helper.id} helper={helper} />
          ))
        ) : (
          <p className="muted">
            No helpers have joined yet. Be the first to support this request.
          </p>
        )}
      </div>
    </Card>
  )
}