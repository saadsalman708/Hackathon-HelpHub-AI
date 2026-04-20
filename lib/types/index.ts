export interface User {
  id: string
  name: string
  role: "Need Help" | "Can Help" | "Both"
  location: string
  interests: string[]
  skills: string[]
  trustScore: number
  badges: string[]
  contributions: number
  createdAt?: string
}

export interface Request {
  id: string
  title: string
  description: string
  tags: string[]
  category: string
  urgency: "Critical" | "High" | "Medium" | "Low"
  location: string
  requesterId: string
  helperIds: string[]
  status: "Open" | "Solved"
  aiSummary: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  type: "Match" | "Reputation" | "Insight" | "Request" | "Status"
  status: "Unread" | "Read"
  createdAt: string
}

export interface Message {
  id: string
  fromId: string
  toId: string
  fromName: string
  toName: string
  text: string
  createdAt: string
}

export interface FilterState {
  category: string
  urgency: string
  skill: string
  location: string
}

export interface AiAnalysis {
  category: string
  urgency: string
  tags: string[]
  summary: string
}

export interface SkillSuggestions {
  canHelpWith: string[]
  needsHelpIn: string[]
  roleFit: string
}

export type ToastMessage = {
  id: string
  text: string
}