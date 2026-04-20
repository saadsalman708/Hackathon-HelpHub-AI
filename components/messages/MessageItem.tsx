import Tag from "@/components/ui/Tag"
import type { Message } from "@/lib/types"

interface MessageItemProps {
  message: Message
}

export default function MessageItem({ message }: MessageItemProps) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="message-item">
      <div>
        <strong>
          {message.fromName} → {message.toName}
        </strong>
        <p>{message.text}</p>
      </div>
      <Tag>{time}</Tag>
    </div>
  )
}