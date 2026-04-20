"use client"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { useToast } from "@/lib/hooks/useToast"
import { addHelper, markSolved, createNotification, updateUser } from "@/lib/firebase/firestore"
import { makeId } from "@/lib/utils/makeId"
import type { Request, User } from "@/lib/types"

interface RequestActionsProps {
  request: Request
  currentUser: User | null
}

export default function RequestActions({ request, currentUser }: RequestActionsProps) {
  const { showToast } = useToast()

  const handleHelp = async () => {
    if (!currentUser) return
    if (request.helperIds.includes(currentUser.id)) {
      return showToast("You're already listed as a helper.")
    }

    try {
      const newHelperIds = [...request.helperIds, currentUser.id]
      await addHelper(request.id, newHelperIds)
      
      await createNotification({
        id: makeId("note"),
        userId: request.requesterId,
        title: `${currentUser.name} offered help on "${request.title}"`,
        type: "Match",
        status: "Unread",
        createdAt: new Date().toISOString()
      })
      
      showToast("You've been added to the helper list.")
    } catch (error) {
      showToast("Failed to join helper list.")
    }
  }

  const handleSolve = async () => {
    if (!currentUser) return
    
    try {
      await markSolved(request.id)
      
      // Boost trust score of current user (simulating original logic)
      const newScore = Math.min(100, currentUser.trustScore + 3)
      await updateUser(currentUser.id, {
        trustScore: newScore,
        contributions: currentUser.contributions + 1
      })
      
      await createNotification({
        id: makeId("note"),
        userId: request.requesterId,
        title: `"${request.title}" was marked as solved`,
        type: "Status",
        status: "Unread",
        createdAt: new Date().toISOString()
      })
      
      showToast("Request marked as solved and trust score updated.")
    } catch (error) {
      showToast("Failed to mark as solved.")
    }
  }

  return (
    <Card>
      <p className="section-kicker">Actions</p>
      <div className="row">
        <Button variant="primary" onClick={handleHelp}>
          I can help
        </Button>
        <Button variant="secondary" onClick={handleSolve}>
          Mark as solved
        </Button>
      </div>
    </Card>
  )
}