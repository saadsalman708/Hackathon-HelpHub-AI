import type { Request } from "@/lib/types"

export function getTopCategory(requests: Request[]): string {
  const counts = requests.reduce((acc, request) => {
    acc[request.category] = (acc[request.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0]?.[0] || "Community"
}