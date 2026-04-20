import NotifItem from "./NotifItem"
import type { Notification } from "@/lib/types"

interface NotifListProps {
  notifications: Notification[]
  onMarkRead: (id: string) => void
}

export default function NotifList({ notifications, onMarkRead }: NotifListProps) {
  if (notifications.length === 0) {
    return <p className="muted">No notifications yet.</p>
  }

  return (
    <div className="notif-list">
      {notifications.map((note) => (
        <NotifItem 
          key={note.id} 
          notification={note} 
          onMarkRead={onMarkRead} 
        />
      ))}
    </div>
  )
}