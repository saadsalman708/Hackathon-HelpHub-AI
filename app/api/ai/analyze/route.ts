import { NextResponse } from "next/server"
import { generateJSON } from "@/lib/ai/gemini"
import { suggestCategory } from "@/lib/ai/categorize"
import { detectUrgency } from "@/lib/ai/urgency"
import { suggestTags } from "@/lib/ai/tags"
import type { AiAnalysis } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json()
    const combinedText = `${title} ${description}`

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing API Key")
    }

    const prompt = `
      Analyze this help request:
      Title: ${title}
      Description: ${description}
      
      Return ONLY a valid JSON object with these exact keys:
      - "category": Must be exactly one of: "Web Development", "Design", "Career", "Academics", "Content", "Community"
      - "urgency": Must be exactly one of: "Critical", "High", "Medium", "Low"
      - "tags": Array of up to 5 relevant skill tags (e.g. ["React", "Figma"])
      - "summary": A 2-sentence summary explaining what kind of helper is needed.
    `

    const aiResult = await generateJSON(prompt) as AiAnalysis
    return NextResponse.json(aiResult)

  } catch (error) {
    console.error("AI Analysis failed, using local fallback", error)
    
    // Fallback to local logic if Gemini fails
    const req = await request.clone().json()
    const combinedText = `${req.title} ${req.description}`
    
    const fallback: AiAnalysis = {
      category: suggestCategory(combinedText),
      urgency: detectUrgency(combinedText),
      tags: suggestTags(combinedText),
      summary: `AI summary: ${suggestCategory(combinedText)} request with ${detectUrgency(combinedText).toLowerCase()} urgency. Best suited for members with relevant expertise.`
    }
    
    return NextResponse.json(fallback)
  }
}