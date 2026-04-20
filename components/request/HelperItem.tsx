import Avatar from "@/components/ui/Avatar"
import Tag from "@/components/ui/Tag"
import { initials } from "@/lib/utils/initials"
import type { User } from "@/lib/types"

interface HelperItemProps {
  helper: User
}

export default function HelperItem({ helper }: HelperItemProps) {
  return (
    <div className="helper-item">
      <div className="user-line">
        <Avatar>{initials(helper.name)}</Avatar>
        <div>
          <strong>{helper.name}</strong>
          <p>{helper.skills.slice(0, 3).join(", ")}</p>
        </div>
      </div>
      <Tag>Trust {helper.trustScore}%</Tag>
    </div>
  )
}