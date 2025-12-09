import { GoogleGenerativeAI } from "@google/generative-ai";
import { neemansShoes } from "../../shared/data";

interface OutfitAnalysis {
    detectedItems: string[];
    dominantColors: string[];
    style: "casual" | "formal" | "ethnic" | "athleisure" | "office";
    occasion: "everyday" | "work" | "party" | "traditional" | "sports";
    colorPalette: { color: string; hex: string }[];
}

interface ShoeRecommendation {
    shoe: typeof neemansShoes[0];
    matchScore: number;
    matchReason: string;
}

export async function onRequestPost(context: any) {
    try {
        const { request, env } = context;
        const input = await request.json() as { image?: string; colors?: string[] };

        if (!input.image && (!input.colors || input.colors.length === 0)) {
            return new Response(JSON.stringify({ error: "Image data or colors required" }), { status: 400 });
        }

        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: "Server misconfiguration: GEMINI_API_KEY missing" }), { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
        let analysis: OutfitAnalysis;

        if (input.image) {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            // 1. Analyze Outfit
            const result = await model.generateContent([
                {
                    text: `You are a fashion style analyst. Analyze the outfit in the image and provide a structured JSON response. Identify clothing items, colors, style category, and occasion. Be specific about colors and items visible.

Respond with ONLY valid JSON in this exact format:
{
  "detectedItems": ["item1", "item2", ...],
  "dominantColors": ["color1", "color2", ...],
  "style": "casual|formal|ethnic|athleisure|office",
  "occasion": "everyday|work|party|traditional|sports",
  "colorPalette": [
    {"color": "Color Name", "hex": "#HEXCODE"},
    ...
  ]
}

Keep detectedItems to 3-5 items max. Keep colorPalette to 3-4 colors max.
Analyze this outfit image and identify the clothing items, colors, style, and occasion.`,
                },
                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: input.image,
                    },
                },
            ]);

            const text = result.response.text();
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error("Failed to parse AI response");
            }
            analysis = JSON.parse(jsonMatch[0]) as OutfitAnalysis;
        } else {
            // Manual color selection fallback
            analysis = {
                detectedItems: ["User Color Selection"],
                dominantColors: input.colors!,
                style: "casual",
                occasion: "everyday",
                colorPalette: input.colors!.map(c => ({ color: c, hex: "#000000" }))
            };
        }

        // 2. Calculate Recommendation
        const scoredShoes = neemansShoes.map(shoe => ({
            shoe,
            matchScore: calculateMatchScore(shoe, analysis),
        }));

        scoredShoes.sort((a, b) => b.matchScore - a.matchScore);

        // Get diverse recommendations
        const topShoes: { shoe: any; matchScore: number }[] = [];
        const shuffle = <T>(array: T[]) => array.sort(() => Math.random() - 0.5);

        const highMatch = scoredShoes.filter(s => s.matchScore >= 90);
        const midMatch = scoredShoes.filter(s => s.matchScore >= 70 && s.matchScore < 90);
        const lowMatch = scoredShoes.filter(s => s.matchScore < 70);

        if (highMatch.length > 0) topShoes.push(...shuffle(highMatch).slice(0, 2));

        if (midMatch.length > 0) {
            topShoes.push(...shuffle(midMatch).slice(0, 1));
        } else if (highMatch.length > 2) {
            topShoes.push(highMatch[2]);
        }

        if (lowMatch.length > 0) {
            topShoes.push(...shuffle(lowMatch).slice(0, 1));
        } else {
            const remaining = scoredShoes.filter(s => !topShoes.includes(s));
            topShoes.push(...remaining.slice(0, 4 - topShoes.length));
        }

        const uniqueRecommendations = Array.from(new Set(topShoes.map(s => s.shoe.id)))
            .map(id => topShoes.find(s => s.shoe.id === id)!)
            .slice(0, 4);

        const recommendations: ShoeRecommendation[] = await Promise.all(
            uniqueRecommendations.map(async ({ shoe, matchScore }) => {
                const matchReason = await generateRecommendationReason(genAI, shoe, analysis);
                return { shoe, matchScore, matchReason };
            })
        );

        return new Response(JSON.stringify({ analysis, recommendations }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

function calculateMatchScore(shoe: any, analysis: OutfitAnalysis): number {
    let score = 60;
    const shoeCategories = shoe.categories.map((c: string) => c.toLowerCase());
    const outfitStyle = analysis.style.toLowerCase();

    if (shoeCategories.includes(outfitStyle)) score += 20;

    const neutralColors = ["black", "white", "grey", "gray", "navy", "brown", "beige", "tan", "charcoal"];
    const outfitColors = analysis.dominantColors.map(c => c.toLowerCase());
    const shoeColors = shoe.colors.map((c: string) => c.toLowerCase());

    for (const shoeColor of shoeColors) {
        if (neutralColors.includes(shoeColor)) score += 5;
        for (const outfitColor of outfitColors) {
            if (shoeColor.includes(outfitColor) || outfitColor.includes(shoeColor)) score += 10;
        }
    }

    return Math.min(98, Math.max(65, score + Math.floor(Math.random() * 5)));
}

async function generateRecommendationReason(genAI: GoogleGenerativeAI, shoe: any, analysis: OutfitAnalysis): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const response = await model.generateContent(
            `You are a fashion stylist. Write a brief, friendly 1-2 sentence explanation of why this shoe pairs well with the outfit. Focus on color harmony, style compatibility, and material benefits. Keep it concise and actionable.

Outfit style: ${analysis.style}
Outfit colors: ${analysis.dominantColors.join(", ")}
Outfit items: ${analysis.detectedItems.join(", ")}
Occasion: ${analysis.occasion}

Shoe: ${shoe.name}
Shoe colors: ${shoe.colors.join(", ")}
Shoe materials: ${shoe.materials.join(", ")}

Why does this shoe work with this outfit? (Keep answer to 1-2 sentences.)`
        );
        return response.response.text();
    } catch {
        return `A perfect sustainable choice that complements your ${analysis.style} look with eco-friendly ${shoe.materials[0]}.`;
    }
}
