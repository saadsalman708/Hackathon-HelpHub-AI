import { NextResponse } from "next/server"
import { generateJSON } from "@/lib/ai/gemini"
import { rewriteDescription } from "@/lib/ai/rewrite"

export async function POST(request: Request) {
  try {
    const { description } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing API Key")
    }

    const prompt = `
      Rewrite this help request description to be more professional, clear, and actionable.
      Keep it concise. Focus on what the person needs and what a helper should provide.
      
      Original: "${description}"
      
      Return ONLY a valid JSON object with this exact key:
      - "rewritten": The rewritten string.
    `

    const result = await generateJSON(prompt) as { rewritten: string }
    return NextResponse.json(result)

  } catch (error) {
    console.error("AI Rewrite failed, using local fallback", error)
    
    const req = await request.clone().json()
    return NextResponse.json({
      rewritten: rewriteDescription(req.description)
    })
  }
}