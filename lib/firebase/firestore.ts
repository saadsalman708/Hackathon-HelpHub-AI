import { db } from "./config"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, orderBy, limit } from "firebase/firestore"
import type { User, Request, Notification, Message } from "@/lib/types"

export async function getUser(userId: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", userId))
  return snap.exists() ? (snap.data() as User) : null
}

export async function updateUser(userId: string, data: Partial<User>): Promise<void> {
  await updateDoc(doc(db, "users", userId), data)
}

export async function getRequests(): Promise<Request[]> {
  const q = query(collection(db, "requests"), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Request)
}

export async function createRequest(request: Request): Promise<void> {
  await setDoc(doc(db, "requests", request.id), request)
}

export async function updateRequest(requestId: string, data: Partial<Request>): Promise<void> {
  await updateDoc(doc(db, "requests", requestId), data)
}

export async function addHelper(requestId: string, helperIds: string[]): Promise<void> {
  await updateDoc(doc(db, "requests", requestId), { helperIds })
}

export async function markSolved(requestId: string): Promise<void> {
  await updateDoc(doc(db, "requests", requestId), { status: "Solved" })
}

export async function getNotifications(): Promise<Notification[]> {
  const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Notification)
}

export async function createNotification(notification: Notification): Promise<void> {
  await setDoc(doc(db, "notifications", notification.id), notification)
}

export async function markNotifRead(notifId: string): Promise<void> {
  await updateDoc(doc(db, "notifications", notifId), { status: "Read" })
}

export async function getMessages(): Promise<Message[]> {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as Message)
}

export async function sendMessage(message: Message): Promise<void> {
  await setDoc(doc(db, "messages", message.id), message)
}

export async function getLeaderboard(): Promise<User[]> {
  const q = query(collection(db, "users"), orderBy("trustScore", "desc"), limit(10))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as User)
}