"use client"
import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { markNotifRead } from "@/lib/firebase/firestore"
import type { Notification } from "@/lib/types"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc")
    )
    
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => d.data() as Notification)
        setNotifications(data)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    
    return () => unsub()
  }, [])

  const markRead = async (id: string) => {
    try {
      await markNotifRead(id)
    } catch (err) {
      console.error("Failed to mark notification as read", err)
    }
  }

  return { notifications, loading, error, markRead }
}