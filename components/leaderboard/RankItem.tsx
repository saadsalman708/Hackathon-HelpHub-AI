import Avatar from "@/components/ui/Avatar"
import { initials } from "@/lib/utils/initials"
import type { User } from "@/lib/types"

interface RankItemProps {
  user: User
  rank: number
}

export default function RankItem({ user, rank }: RankItemProps) {
  const avatarVariant = rank === 1 ? "teal" : rank === 2 ? "dark" : "default"

  return (
    <div className="rank-item">
      <div className="user-line">
        <Avatar variant={avatarVariant}>{initials(user.name)}</Avatar>
        <div>
          <strong>
            #{rank} {user.name}
          </strong>
          <p>{user.skills.slice(0, 3).join(", ")}</p>
        </div>
      </div>
      <div className="center">
        <strong>{user.trustScore}%</strong>
        <p>{user.contributions} contributions</p>
      </div>
    </div>
  )
}