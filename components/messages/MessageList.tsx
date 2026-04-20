import MessageItem from "./MessageItem"
import type { Message } from "@/lib/types"

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return <p className="muted">No messages yet.</p>
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}