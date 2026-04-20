"use client"
import { useAppStore } from "@/lib/store/useAppStore"

export default function Toast() {
  const { toasts } = useAppStore()

  if (toasts.length === 0) return null

  return (
    <div className="toast-wrap">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.text}
        </div>
      ))}
    </div>
  )
}