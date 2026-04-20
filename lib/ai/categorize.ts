import { CATEGORIES } from "@/lib/constants/categories"

export function suggestCategory(text: string): string {
  const normalized = text.toLowerCase()
  let best = { category: "Community", score: 0 }

  Object.entries(CATEGORIES).forEach(([category, words]) => {
    const score = words.reduce(
      (sum, word) => sum + Number(normalized.includes(word)),
      0
    )
    if (score > best.score) {
      best = { category, score }
    }
  })

  return best.category
}