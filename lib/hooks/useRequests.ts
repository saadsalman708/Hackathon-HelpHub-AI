"use client"
import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import type { Request } from "@/lib/types"

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = query(
      collection(db, "requests"),
      orderBy("createdAt", "desc")
    )
    
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs.map((d) => d.data() as Request)
        setRequests(data)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    
    return () => unsub()
  }, [])

  return { requests, loading, error }
}