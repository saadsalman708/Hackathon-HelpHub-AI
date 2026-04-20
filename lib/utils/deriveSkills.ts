import { SKILLS } from "@/lib/constants/skills"
import type { SkillSuggestions } from "@/lib/types"

export function deriveSkills(interests: string[] = [], skills: string[] = []): SkillSuggestions {
  const joined = [...interests, ...skills].join(" ").toLowerCase()
  
  const helpWith = SKILLS.filter(
    (item) =>
      joined.includes(item.toLowerCase()) ||
      item.split(" ").some((part) => joined.includes(part.toLowerCase()))
  ).slice(0, 4)

  const needHelp = SKILLS.filter(
    (item) => !skills.includes(item) && !helpWith.includes(item)
  ).slice(0, 4)

  const canHelpWith = helpWith.length ? helpWith : ["UI/UX", "Career Guidance", "Public Speaking"]
  const needsHelpIn = needHelp.length ? needHelp : ["Git/GitHub", "Interview Prep", "React"]
  const roleFit = skills.length > 2 ? "Both" : "Need Help"

  return {
    canHelpWith,
    needsHelpIn,
    roleFit
  }
}