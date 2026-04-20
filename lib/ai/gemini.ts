import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY || ""
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function generateJSON(prompt: string): Promise<unknown> {
  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/)
    const jsonString = jsonMatch ? jsonMatch[1] : text
    
    return JSON.parse(jsonString.trim())
  } catch (error) {
    console.error("Gemini API Error:", error)
    throw error
  }
}

export { genAI, model }