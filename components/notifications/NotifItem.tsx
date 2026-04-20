import Button from "@/components/ui/Button"
import type { Notification } from "@/lib/types"

interface NotifItemProps {
  notification: Notification
  onMarkRead: (id: string) => void
}

export default function NotifItem({ notification, onMarkRead }: NotifItemProps) {
  const time = new Date(notification.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="notif-item">
      <div>
        <strong>{notification.title}</strong>
        <p>
          {notification.type} • {time}
        </p>
      </div>
      <Button 
        variant="secondary" 
        onClick={() => onMarkRead(notification.id)}
        disabled={notification.status === "Read"}
      >
        {notification.status}
      </Button>
    </div>
  )
}