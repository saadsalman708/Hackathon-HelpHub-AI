export function rewriteDescription(text: string): string {
  const trimmed = text.trim()
  if (!trimmed) return ""
  
  const firstChar = trimmed.charAt(0).toLowerCase()
  const rest = trimmed.slice(1)
  
  return `I need focused support with ${firstChar}${rest}. A helper who can provide practical next steps, examples, and a quick review would be ideal.`
}