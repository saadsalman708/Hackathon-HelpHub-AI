"use client"
import { useState } from "react"
import Card from "@/components/ui/Card"
import Field from "@/components/ui/Field"
import Button from "@/components/ui/Button"
import { useToast } from "@/lib/hooks/useToast"
import { makeId } from "@/lib/utils/makeId"
import type { User, Message } from "@/lib/types"

interface MessageFormProps {
  currentUser: User
  users: User[]
  onSendMessage: (message: Message) => Promise<void>
}

export default function MessageForm({ currentUser, users, onSendMessage }: MessageFormProps) {
  const { showToast } = useToast()
  
  // Filter out current user from recipients
  const recipients = users.filter((u) => u.id !== currentUser.id)
  
  const [toId, setToId] = useState(recipients[0]?.id || "")
  const [text, setText] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || !toId) return

    const recipient = users.find((u) => u.id === toId)
    if (!recipient) return

    const newMessage: Message = {
      id: makeId("msg"),
      fromId: currentUser.id,
      toId: recipient.id,
      fromName: currentUser.name,
      toName: recipient.name,
      text: text.trim(),
      createdAt: new Date().toISOString()
    }

    try {
      await onSendMessage(newMessage)
      setText("")
      showToast("Message sent.")
    } catch (error) {
      showToast("Failed to send message.")
    }
  }

  return (
    <Card className="form-card stack">
      <p className="section-kicker">Send message</p>
      <h2>Start a conversation</h2>
      
      <form onSubmit={handleSubmit} className="stack">
        <Field label="To" htmlFor="msg-to">
          <select 
            id="msg-to" 
            value={toId} 
            onChange={(e) => setToId(e.target.value)}
            required
          >
            {recipients.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </Field>
        
        <Field label="Message" htmlFor="msg-text">
          <textarea
            id="msg-text"
            placeholder="Share support details, ask for files, or suggest next steps."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </Field>
        
        <Button variant="primary" type="submit">
          Send
        </Button>
      </form>
    </Card>
  )
}