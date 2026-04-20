"use client"
import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { sendMessage as firestoreSendMessage } from "@/lib/firebase/firestore"
import type { Message } from "@/lib/types"

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    )
    
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => d.data() as Message)
        setMessages(data)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    
    return () => unsub()
  }, [])

  const sendMessage = async (message: Message) => {
    await firestoreSendMessage(message)
  }

  return { messages, loading, error, sendMessage }
}