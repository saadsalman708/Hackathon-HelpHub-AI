import { NextResponse } from "next/server"
import { generateJSON } from "@/lib/ai/gemini"
import { deriveSkills } from "@/lib/utils/deriveSkills"
import type { SkillSuggestions } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const { skills, interests } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing API Key")
    }

    const prompt = `
      Analyze this user profile:
      Skills: ${skills.join(", ")}
      Interests: ${interests.join(", ")}
      
      Return ONLY a valid JSON object with these exact keys:
      - "canHelpWith": Array of 3-4 skills they are qualified to mentor/help others with.
      - "needsHelpIn": Array of 3-4 skills they might want to learn based on their interests but lack of skills.
      - "roleFit": Must be exactly one of: "Need Help", "Can Help", "Both"
    `

    const result = await generateJSON(prompt) as SkillSuggestions
    return NextResponse.json(result)

  } catch (error) {
    console.error("AI Onboard failed, using local fallback", error)
    
    const req = await request.clone().json()
    return NextResponse.json(deriveSkills(req.interests, req.skills))
  }
}