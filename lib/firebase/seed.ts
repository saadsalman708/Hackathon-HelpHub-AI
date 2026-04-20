import { db } from "./config"
import { doc, setDoc, getDoc } from "firebase/firestore"
import type { User, Request, Notification, Message } from "@/lib/types"

const USERS: User[] = [
  { id: "user-1", name: "Ayesha Khan", role: "Both", location: "Karachi", interests: ["Hackathons", "UI/UX", "Community Building"], skills: ["Figma", "UI/UX", "HTML/CSS", "Career Guidance"], trustScore: 92, badges: ["Design Ally", "Fast Responder", "Top Mentor"], contributions: 31 },
  { id: "user-2", name: "Hassan Ali", role: "Can Help", location: "Lahore", interests: ["Web Apps", "Teaching", "Open Source"], skills: ["JavaScript", "React", "Git/GitHub", "Node.js"], trustScore: 88, badges: ["Code Rescuer", "Bug Hunter"], contributions: 24 },
  { id: "user-3", name: "Sara Noor", role: "Need Help", location: "Islamabad", interests: ["Learning", "Data", "Public Speaking"], skills: ["Python", "Data Analysis"], trustScore: 74, badges: ["Community Voice"], contributions: 11 }
]

const REQUESTS: Request[] = [
  { id: "req-1", title: "Need help making my portfolio responsive before demo day", description: "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.", tags: ["HTML/CSS", "Responsive", "Portfolio"], category: "Web Development", urgency: "High", location: "Karachi", requesterId: "user-3", helperIds: ["user-1"], status: "Open", createdAt: "2026-04-17T10:00:00", aiSummary: "Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries." },
  { id: "req-2", title: "Looking for Figma feedback on a volunteer event poster", description: "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.", tags: ["Figma", "Poster", "Design Review"], category: "Design", urgency: "Medium", location: "Lahore", requesterId: "user-1", helperIds: ["user-2"], status: "Open", createdAt: "2026-04-16T15:30:00", aiSummary: "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value." },
  { id: "req-3", title: "Need mock interview support for internship applications", description: "Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.", tags: ["Interview Prep", "Career", "Frontend"], category: "Career", urgency: "Low", location: "Remote", requesterId: "user-3", helperIds: ["user-1", "user-2"], status: "Solved", createdAt: "2026-04-14T09:15:00", aiSummary: "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews." }
]

const NOTIFICATIONS: Notification[] = [
  { id: "note-1", userId: "user-1", title: "New helper matched to your responsive portfolio request", type: "Match", status: "Unread", createdAt: new Date(Date.now() - 12 * 60000).toISOString() },
  { id: "note-2", userId: "user-1", title: "Your trust score increased after a solved request", type: "Reputation", status: "Unread", createdAt: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: "note-3", userId: "user-1", title: "AI Center detected rising demand for interview prep", type: "Insight", status: "Read", createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString() }
]

const MESSAGES: Message[] = [
  { id: "msg-1", fromId: "user-1", toId: "user-3", fromName: "Ayesha Khan", toName: "Sara Noor", text: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.", createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString() },
  { id: "msg-2", fromId: "user-2", toId: "user-1", fromName: "Hassan Ali", toName: "Ayesha Khan", text: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.", createdAt: new Date(Date.now() - 60 * 60000).toISOString() }
]

export async function seedDatabase() {
  try {
    const checkSnap = await getDoc(doc(db, "users", "user-1"))
    if (checkSnap.exists()) return

    for (const user of USERS) await setDoc(doc(db, "users", user.id), user)
    for (const req of REQUESTS) await setDoc(doc(db, "requests", req.id), req)
    for (const notif of NOTIFICATIONS) await setDoc(doc(db, "notifications", notif.id), notif)
    for (const msg of MESSAGES) await setDoc(doc(db, "messages", msg.id), msg)
    
    console.log("Database seeded successfully.")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}