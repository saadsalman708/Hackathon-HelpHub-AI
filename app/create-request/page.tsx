"use client"
import { useMemo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PageHero from "@/components/layout/PageHero"
import Card from "@/components/ui/Card"
import Field from "@/components/ui/Field"
import Button from "@/components/ui/Button"
import AiInsightBox from "@/components/ai/AiInsightBox"
import { useAuth } from "@/lib/hooks/useAuth"
import { useToast } from "@/lib/hooks/useToast"
import { createRequest, createNotification } from "@/lib/firebase/firestore"
import { makeId } from "@/lib/utils/makeId"
import { suggestCategory } from "@/lib/ai/categorize"
import { detectUrgency } from "@/lib/ai/urgency"
import { suggestTags } from "@/lib/ai/tags"
import { rewriteDescription } from "@/lib/ai/rewrite"

export default function CreateRequestPage() {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { showToast } = useToast()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Web Development")
  const [urgency, setUrgency] = useState("High")
  const [tags, setTags] = useState("")

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth")
    }
  }, [currentUser, router])

  const { aiCategory, aiUrgency, aiTags, aiRewrite } = useMemo(() => {
    const combined = `${title} ${description}`
    if (combined.trim().length > 5) {
      return {
        aiCategory: suggestCategory(combined),
        aiUrgency: detectUrgency(combined),
        aiTags: suggestTags(combined),
        aiRewrite: rewriteDescription(description),
      }
    }

    return { aiCategory: "", aiUrgency: "", aiTags: [], aiRewrite: "" }
  }, [title, description])

  const handleApplyAi = () => {
    if (aiCategory) setCategory(aiCategory)
    if (aiUrgency) setUrgency(aiUrgency)
    if (aiTags.length > 0) setTags(aiTags.join(", "))
    if (aiRewrite) setDescription(aiRewrite)
    showToast("AI suggestions applied to the request form.")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return

    const requestId = makeId("req")
    const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean)

    const newRequest = {
      id: requestId,
      title: title.trim(),
      description: description.trim(),
      tags: tagArray,
      category,
      urgency: urgency as "Critical" | "High" | "Medium" | "Low",
      location: currentUser.location,
      requesterId: currentUser.id,
      helperIds: [],
      status: "Open" as const,
      createdAt: new Date().toISOString(),
      aiSummary: `AI summary: ${category} request with ${urgency.toLowerCase()} urgency. Best suited for members with ${tags || "relevant"} expertise.`
    }

    try {
      await createRequest(newRequest)
      
      await createNotification({
        id: makeId("note"),
        userId: currentUser.id,
        title: `Your request "${newRequest.title}" is now live in the community feed`,
        type: "Request",
        status: "Unread",
        createdAt: new Date().toISOString()
      })

      showToast("Request created successfully.")
      router.push(`/request/${requestId}`)
    } catch {
      showToast("Failed to create request.")
    }
  }

  if (!currentUser) return null

  return (
    <main className="container">
      <PageHero
        eyebrow="Create request"
        title="Turn a rough problem into a clear help request."
        subtitle="Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite."
      />

      <section className="detail-grid section">
        <Card className="form-card stack">
          <form onSubmit={handleSubmit} className="stack">
            <Field label="Title" htmlFor="request-title">
              <input
                id="request-title"
                type="text"
                placeholder="Need review on my JavaScript quiz app before submission"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>

            <Field label="Description" htmlFor="request-description">
              <textarea
                id="request-description"
                placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Field>

            <div className="form-grid">
              <Field label="Tags" htmlFor="request-tags">
                <input
                  id="request-tags"
                  type="text"
                  placeholder="JavaScript, Debugging, Review"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </Field>

              <Field label="Category" htmlFor="request-category">
                <select
                  id="request-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Design">Design</option>
                  <option value="Career">Career</option>
                  <option value="Academics">Academics</option>
                  <option value="Content">Content</option>
                  <option value="Community">Community</option>
                </select>
              </Field>

              <Field label="Urgency" htmlFor="request-urgency">
                <select
                  id="request-urgency"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  required
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </Field>
            </div>

            <div className="row">
              <Button variant="secondary" type="button" onClick={handleApplyAi}>
                Apply AI suggestions
              </Button>
              <Button variant="primary" type="submit">
                Publish request
              </Button>
            </div>
          </form>
        </Card>

        <aside className="panel">
          <p className="section-kicker">AI assistant</p>
          <h2>Smart request guidance</h2>
          <AiInsightBox
            category={aiCategory}
            urgency={aiUrgency}
            tags={aiTags}
            summary={aiRewrite}
          />
        </aside>
      </section>
    </main>
  )
}