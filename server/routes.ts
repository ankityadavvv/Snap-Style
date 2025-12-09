import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { neemansShoes, exampleScenarios } from "@shared/data";
import type { AnalysisResult, OutfitAnalysis, ShoeRecommendation, NeemanShoe } from "@shared/schema";
import { uploadImageSchema, colorPalettes } from "@shared/schema";

let gemini: GoogleGenerativeAI | null = null;

function getGeminiClient(): GoogleGenerativeAI {
  if (!gemini) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Environment variables:", Object.keys(process.env).filter(k => k.includes('GEMINI') || k.includes('API')));
      throw new Error("Gemini API key not configured. Please add GEMINI_API_KEY to your secrets.");
    }
    gemini = new GoogleGenerativeAI(apiKey);
  }
  return gemini;
}

async function analyzeOutfitWithVision(base64Image: string): Promise<OutfitAnalysis> {
  try {
    const client = getGeminiClient();
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

    if (!model) {
      throw new Error("Failed to initialize Gemini model");
    }

    const response = await model.generateContent([
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
          data: base64Image,
        },
      },
    ]);

    const text = response.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    return JSON.parse(jsonMatch[0]) as OutfitAnalysis;
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}

async function generateRecommendationReason(shoe: NeemanShoe, analysis: OutfitAnalysis): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    return getDefaultRecommendationReason(shoe, analysis);
  }

  try {
    const client = getGeminiClient();
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

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

    return response.response.text() || getDefaultRecommendationReason(shoe, analysis);
  } catch {
    return getDefaultRecommendationReason(shoe, analysis);
  }
}

function getDefaultRecommendationReason(shoe: NeemanShoe, analysis: OutfitAnalysis): string {
  const reasons: Record<string, string> = {
    casual: `These ${shoe.materials[0]} shoes bring effortless style to your casual look, offering all-day comfort with sustainable materials.`,
    formal: `The refined design of these ${shoe.materials[0]} shoes elevates your formal attire while keeping you comfortable throughout the day.`,
    ethnic: `Perfect for ethnic wear, these ${shoe.colors[0].toLowerCase()} shoes complement traditional outfits with a modern, sustainable twist.`,
    athleisure: `Lightweight and breathable, these ${shoe.materials[0]} shoes are ideal for your active lifestyle without compromising on style.`,
    office: `A smart choice for work - these versatile ${shoe.colors[0].toLowerCase()} shoes pair seamlessly with professional attire.`,
  };

  return reasons[analysis.style] || `A perfect sustainable choice that complements your ${analysis.style} look with eco-friendly ${shoe.materials[0]}.`;
}

function calculateMatchScore(shoe: NeemanShoe, analysis: OutfitAnalysis): number {
  let score = 60;

  const shoeCategories = shoe.categories.map(c => c.toLowerCase());
  const outfitStyle = analysis.style.toLowerCase();

  if (shoeCategories.includes(outfitStyle)) {
    score += 20;
  }

  const neutralColors = ["black", "white", "grey", "gray", "navy", "brown", "beige", "tan", "charcoal"];
  const outfitColors = analysis.dominantColors.map(c => c.toLowerCase());
  const shoeColors = shoe.colors.map(c => c.toLowerCase());

  for (const shoeColor of shoeColors) {
    if (neutralColors.includes(shoeColor)) {
      score += 5;
    }
    for (const outfitColor of outfitColors) {
      if (shoeColor.includes(outfitColor) || outfitColor.includes(shoeColor)) {
        score += 10;
      }
    }
  }

  score = Math.min(98, Math.max(65, score + Math.floor(Math.random() * 5)));

  return score;
}

async function getRecommendations(analysis: OutfitAnalysis): Promise<ShoeRecommendation[]> {
  const scoredShoes = neemansShoes.map(shoe => ({
    shoe,
    matchScore: calculateMatchScore(shoe, analysis),
  }));

  scoredShoes.sort((a, b) => b.matchScore - a.matchScore);

  // Get diverse recommendations
  const topShoes: { shoe: NeemanShoe; matchScore: number }[] = [];

  // Helper to shuffle array
  const shuffle = <T>(array: T[]) => array.sort(() => Math.random() - 0.5);

  const highMatch = scoredShoes.filter(s => s.matchScore >= 90);
  const midMatch = scoredShoes.filter(s => s.matchScore >= 70 && s.matchScore < 90);
  const lowMatch = scoredShoes.filter(s => s.matchScore < 70);

  // Take 1-2 from high match (shuffled)
  if (highMatch.length > 0) {
    topShoes.push(...shuffle(highMatch).slice(0, 2));
  }

  // Take 1 from mid match if available, else more from high
  if (midMatch.length > 0) {
    topShoes.push(...shuffle(midMatch).slice(0, 1));
  } else if (highMatch.length > 2) {
    topShoes.push(highMatch[2]);
  }

  // Take 1 from low match for variety/contrast, or fill from others
  if (lowMatch.length > 0) {
    topShoes.push(...shuffle(lowMatch).slice(0, 1));
  } else {
    // Fill remaining spots from whatever is left, prioritising high scores
    const remaining = scoredShoes.filter(s => !topShoes.includes(s));
    topShoes.push(...remaining.slice(0, 4 - topShoes.length));
  }

  // Ensure we have unique items and max 4
  const uniqueRecommendations = Array.from(new Set(topShoes.map(s => s.shoe.id)))
    .map(id => topShoes.find(s => s.shoe.id === id)!)
    .slice(0, 4);

  const recommendations: ShoeRecommendation[] = await Promise.all(
    uniqueRecommendations.map(async ({ shoe, matchScore }) => {
      const matchReason = await generateRecommendationReason(shoe, analysis);
      return {
        shoe,
        matchScore,
        matchReason,
      };
    })
  );

  return recommendations;
}

function getScenarioAnalysis(scenarioId: string): OutfitAnalysis {
  const scenarioMap: Record<string, OutfitAnalysis> = {
    "casual-weekend": {
      detectedItems: ["Denim jeans", "Cotton t-shirt", "Casual jacket"],
      dominantColors: ["Blue", "White", "Grey"],
      style: "casual",
      occasion: "everyday",
      colorPalette: [
        { color: "Denim Blue", hex: "#4A6FA5" },
        { color: "White", hex: "#FFFFFF" },
        { color: "Light Grey", hex: "#D3D3D3" },
      ],
    },
    "casual-street": {
      detectedItems: ["Casual shirt", "Chino pants", "Canvas jacket"],
      dominantColors: ["Tan", "Grey", "Navy"],
      style: "casual",
      occasion: "everyday",
      colorPalette: [
        { color: "Khaki", hex: "#C3B091" },
        { color: "Grey", hex: "#808080" },
        { color: "Navy", hex: "#000080" },
      ],
    },
    "casual-dinner": {
      detectedItems: ["Light shirt", "Khaki pants", "Loafers"],
      dominantColors: ["Cream", "Beige", "Brown"],
      style: "casual",
      occasion: "everyday",
      colorPalette: [
        { color: "Cream", hex: "#FFFDD0" },
        { color: "Beige", hex: "#F5F5DC" },
        { color: "Brown", hex: "#8B4513" },
      ],
    },
    "office-wear": {
      detectedItems: ["Formal shirt", "Dress pants", "Belt"],
      dominantColors: ["Navy", "White", "Black"],
      style: "office",
      occasion: "work",
      colorPalette: [
        { color: "Navy Blue", hex: "#1F3A5F" },
        { color: "Crisp White", hex: "#FAFAFA" },
        { color: "Black", hex: "#1A1A1A" },
      ],
    },
    "office-formal": {
      detectedItems: ["Business suit", "Dress shirt", "Tie"],
      dominantColors: ["Black", "White", "Navy"],
      style: "office",
      occasion: "work",
      colorPalette: [
        { color: "Black", hex: "#000000" },
        { color: "White", hex: "#FFFFFF" },
        { color: "Dark Navy", hex: "#001F3F" },
      ],
    },
    "business-casual": {
      detectedItems: ["Blazer", "Trousers", "Dress shirt"],
      dominantColors: ["Grey", "White", "Navy"],
      style: "office",
      occasion: "work",
      colorPalette: [
        { color: "Medium Grey", hex: "#A9A9A9" },
        { color: "White", hex: "#FFFFFF" },
        { color: "Navy", hex: "#000080" },
      ],
    },
    "walking-casual": {
      detectedItems: ["Shorts", "Light top", "Canvas shoes"],
      dominantColors: ["White", "Blue", "Beige"],
      style: "casual",
      occasion: "everyday",
      colorPalette: [
        { color: "White", hex: "#FFFFFF" },
        { color: "Light Blue", hex: "#ADD8E6" },
        { color: "Beige", hex: "#F5F5DC" },
      ],
    },
    "ethnic-fusion": {
      detectedItems: ["Kurta", "Palazzo pants", "Dupatta"],
      dominantColors: ["Maroon", "Gold", "Beige"],
      style: "ethnic",
      occasion: "traditional",
      colorPalette: [
        { color: "Maroon", hex: "#800020" },
        { color: "Gold", hex: "#D4AF37" },
        { color: "Beige", hex: "#F5F5DC" },
      ],
    },
    "ethnic-formal": {
      detectedItems: ["Sherwani", "Traditional pants", "Turban"],
      dominantColors: ["Maroon", "Gold", "Cream"],
      style: "ethnic",
      occasion: "traditional",
      colorPalette: [
        { color: "Deep Maroon", hex: "#800020" },
        { color: "Gold", hex: "#FFD700" },
        { color: "Cream", hex: "#FFFDD0" },
      ],
    },
    "traditional": {
      detectedItems: ["Saree", "Blouse", "Traditional jewelry"],
      dominantColors: ["Purple", "Gold", "Red"],
      style: "ethnic",
      occasion: "traditional",
      colorPalette: [
        { color: "Purple", hex: "#800080" },
        { color: "Gold", hex: "#D4AF37" },
        { color: "Red", hex: "#FF0000" },
      ],
    },
    "athleisure": {
      detectedItems: ["Track pants", "Sports top", "Running jacket"],
      dominantColors: ["Black", "Grey", "Neon Green"],
      style: "athleisure",
      occasion: "sports",
      colorPalette: [
        { color: "Black", hex: "#0D0D0D" },
        { color: "Charcoal Grey", hex: "#36454F" },
        { color: "Neon Green", hex: "#39FF14" },
      ],
    },
    "gym-casual": {
      detectedItems: ["Leggings", "Sports top", "Sneakers"],
      dominantColors: ["Black", "Pink", "White"],
      style: "athleisure",
      occasion: "sports",
      colorPalette: [
        { color: "Black", hex: "#0D0D0D" },
        { color: "Hot Pink", hex: "#FF69B4" },
        { color: "White", hex: "#FFFFFF" },
      ],
    },
    "joggers-style": {
      detectedItems: ["Joggers", "Hoodie", "Casual sneakers"],
      dominantColors: ["Grey", "Black", "White"],
      style: "athleisure",
      occasion: "everyday",
      colorPalette: [
        { color: "Dark Grey", hex: "#505050" },
        { color: "Black", hex: "#1A1A1A" },
        { color: "White", hex: "#FFFFFF" },
      ],
    },
    "formal-event": {
      detectedItems: ["Formal dress", "Evening heels", "Jewelry"],
      dominantColors: ["Black", "White", "Gold"],
      style: "formal",
      occasion: "party",
      colorPalette: [
        { color: "Black", hex: "#000000" },
        { color: "White", hex: "#FFFFFF" },
        { color: "Gold", hex: "#D4AF37" },
      ],
    },
  };

  return scenarioMap[scenarioId] || scenarioMap["casual-weekend"];
}

function createAnalysisFromColors(colors: string[]): OutfitAnalysis {
  const selectedPalettes = colorPalettes.filter(p => colors.includes(p.color));
  const colorPalette = selectedPalettes.map(p => ({ color: p.color, hex: p.hex }));
  const dominantColors = selectedPalettes.map(p => p.color);

  // Determine style based on color selection
  let style = "casual";
  if (dominantColors.includes("Navy") || dominantColors.includes("Black")) {
    style = dominantColors.includes("Gold") || dominantColors.includes("Purple") ? "ethnic" : "office";
  } else if (dominantColors.includes("Gold") || dominantColors.includes("Beige") || dominantColors.includes("Purple")) {
    style = "ethnic";
  }

  return {
    detectedItems: ["Custom outfit", "Your color selection"],
    dominantColors,
    style,
    occasion: "everyday",
    colorPalette: colorPalette.length > 0 ? colorPalette : [{ color: "Custom", hex: "#808080" }],
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/analyze", async (req: Request, res: Response) => {
    try {
      const validation = uploadImageSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid request. Please provide an image or colors.",
          details: validation.error.issues.map(i => i.message)
        });
      }

      const { image, colors } = validation.data;

      let analysis: OutfitAnalysis;

      if (colors && colors.length > 0) {
        // Handle color-based recommendation
        analysis = createAnalysisFromColors(colors);
      } else if (image) {
        if (image.startsWith("scenario:")) {
          const scenarioId = image.replace("scenario:", "");
          analysis = getScenarioAnalysis(scenarioId);
        } else {
          if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "Gemini API key not configured. Please add your GEMINI_API_KEY to use image analysis." });
          }
          analysis = await analyzeOutfitWithVision(image);
        }
      } else {
        return res.status(400).json({ error: "Please provide either an image or select colors." });
      }

      const recommendations = await getRecommendations(analysis);

      const result: AnalysisResult = {
        analysis,
        recommendations,
      };

      res.json(result);
    } catch (error) {
      console.error("Analysis error:", error);
      const message = error instanceof Error ? error.message : "Failed to analyze outfit";
      res.status(500).json({ error: message });
    }
  });

  app.get("/api/shoes", (_req: Request, res: Response) => {
    res.json(neemansShoes);
  });

  app.get("/api/scenarios", (_req: Request, res: Response) => {
    res.json(exampleScenarios);
  });

  return httpServer;
}
