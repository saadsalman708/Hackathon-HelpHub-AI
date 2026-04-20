import Card from "@/components/ui/Card"
import Metric from "@/components/ui/Metric"
import Tag from "@/components/ui/Tag"
import type { User } from "@/lib/types"

interface ProfileCardProps {
  user: User
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="stack">
      <Card>
        <p className="section-kicker">Public profile</p>
        <h2>Skills and reputation</h2>
        
        <Metric label="Trust score" value={`${user.trustScore}%`} />
        <Metric label="Contributions" value={user.contributions} />
        
        <div className="stack">
          <div>
            <strong>Skills</strong>
            <div className="tag-row" style={{ marginTop: "10px" }}>
              {user.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </div>
          
          <div>
            <strong>Badges</strong>
            <div className="tag-row" style={{ marginTop: "10px" }}>
              {user.badges.map((badge) => (
                <Tag key={badge}>{badge}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}