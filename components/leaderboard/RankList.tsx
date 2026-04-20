import RankItem from "./RankItem"
import type { User } from "@/lib/types"

interface RankListProps {
  users: User[]
}

export default function RankList({ users }: RankListProps) {
  return (
    <div className="rank-list">
      {users.map((user, index) => (
        <RankItem key={user.id} user={user} rank={index + 1} />
      ))}
    </div>
  )
}