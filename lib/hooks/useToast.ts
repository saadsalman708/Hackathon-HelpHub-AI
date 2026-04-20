"use client"
import { useAppStore } from "@/lib/store/useAppStore"

export function useToast() {
  const { addToast, removeToast } = useAppStore()

  return {
    showToast: addToast,
    removeToast,
  }
}