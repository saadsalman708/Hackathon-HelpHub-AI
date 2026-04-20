import Card from "@/components/ui/Card"
import Tag from "@/components/ui/Tag"
import type { Notification } from "@/lib/types"

interface DashboardNotesProps {
  notifications: Notification[]
}

export default function DashboardNotes({ notifications }: DashboardNotesProps) {
  return (
    <Card>
      <p className="section-kicker">Notifications</p>
      <h3>Latest updates</h3>
      <div className="notif-list">
        {notifications.map((note) => {
          const time = new Date(note.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
          
          return (
            <div key={note.id} className="notif-item">
              <div>
                <strong>{note.title}</strong>
                <p>
                  {note.type} • {time}
                </p>
              </div>
              <Tag variant={note.status === "Unread" ? "urgent" : "default"}>
                {note.status}
              </Tag>
            </div>
          )
        })}
      </div>
    </Card>
  )
}