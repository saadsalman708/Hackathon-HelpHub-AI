import { URGENCY } from "@/lib/constants/urgency"

export function detectUrgency(text: string): "Critical" | "High" | "Medium" | "Low" {
  const normalized = text.toLowerCase()
  
  for (const rule of URGENCY) {
    if (rule.words.some((word) => normalized.includes(word))) {
      return rule.level as "Critical" | "High" | "Medium" | "Low"
    }
  }
  
  return "Low"
}