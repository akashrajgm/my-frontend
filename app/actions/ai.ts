'use server'

import { cookies } from 'next/headers'

export async function generateAIContent(imageName: string) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        if (!token) return { error: "Authentication required for AI features." }

        // MISSION AI-1: Talking to Tharun's Gemini Integration
        const res = await fetch('https://interior-marketplace-api.onrender.com/ai/generate-metadata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ image_context: imageName }),
        })

        if (!res.ok) throw new Error("AI Service is currently offline.")

        return await res.json()
        // Expected Response: { title: "...", description: "...", category: "..." }

    } catch (error) {
        // MOCK DATA: For local testing until AI-1 is live
        return {
            title: "Vintage Bauhaus Lounge Chair",
            description: "A masterful representation of mid-century minimalism, featuring chrome-plated tubular steel and premium black leather upholstery.",
            category: "Furniture",
            success: true
        }
    }
}