import { create } from "zustand"
import type { User, ToastMessage } from "@/lib/types"
import { makeId } from "@/lib/utils/makeId"

interface AppState {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  toasts: ToastMessage[]
  addToast: (text: string) => void
  removeToast: (id: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  toasts: [],
  addToast: (text) => {
    const id = makeId("toast")
    set((state) => ({ toasts: [...state.toasts, { id, text }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 2800)
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))