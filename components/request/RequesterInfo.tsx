import Card from "@/components/ui/Card"
import Avatar from "@/components/ui/Avatar"
import { initials } from "@/lib/utils/initials"
import type { User } from "@/lib/types"

interface RequesterInfoProps {
  requester: User | undefined
}

export default function RequesterInfo({ requester }: RequesterInfoProps) {
  return (
    <Card>
      <p className="section-kicker">Requester</p>
      <div className="user-line">
        <Avatar variant="teal">{initials(requester?.name)}</Avatar>
        <div>
          <strong>{requester?.name || "Unknown user"}</strong>
          <p>
            {requester?.location || "Unknown location"} • Trust{" "}
            {requester?.trustScore || 0}%
          </p>
        </div>
      </div>
    </Card>
  )
}