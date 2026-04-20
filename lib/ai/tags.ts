import { SKILLS } from "@/lib/constants/skills"

export function suggestTags(text: string): string[] {
  const normalized = text.toLowerCase()
  
  const tags = SKILLS.filter(
    (skill) =>
      normalized.includes(skill.toLowerCase()) ||
      normalized.includes(skill.toLowerCase().replace("/", ""))
  ).slice(0, 4)

  if (normalized.includes("portfolio")) tags.push("Portfolio")
  if (normalized.includes("responsive")) tags.push("Responsive")
  if (normalized.includes("interview")) tags.push("Interview Prep")
  if (normalized.includes("design")) tags.push("Design Review")

  return [...new Set(tags)].slice(0, 5)
}