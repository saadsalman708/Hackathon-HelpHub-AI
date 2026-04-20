"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import PageHero from "@/components/layout/PageHero"
import Card from "@/components/ui/Card"
import MessageList from "@/components/messages/MessageList"
import MessageForm from "@/components/messages/MessageForm"
import { useMessages } from "@/lib/hooks/useMessages"
import { useAuth } from "@/lib/hooks/useAuth"

export default function MessagesPage() {
  const router = useRouter()
  const { currentUser, users, loading: authLoading } = useAuth()
  const { messages, sendMessage } = useMessages()

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push("/auth")
    }
  }, [currentUser, authLoading, router])

  if (!currentUser) return null

  // Filter messages where current user is sender or recipient
  const userMessages = messages.filter(
    (m) => m.fromId === currentUser.id || m.toId === currentUser.id
  )

  return (
    <main className="container">
      <PageHero
        eyebrow="Interaction / Messaging"
        title="Keep support moving through direct communication."
        subtitle="Basic messaging gives helpers and requesters a clear follow-up path once a match happens."
      />

      <section className="detail-grid section">
        <Card>
          <p className="section-kicker">Conversation stream</p>
          <h2>Recent messages</h2>
          <MessageList messages={userMessages} />
        </Card>

        <MessageForm 
          currentUser={currentUser} 
          users={users} 
          onSendMessage={sendMessage} 
        />
      </section>
    </main>
  )
}