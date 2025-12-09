import { z } from "zod";

export const shoeCategories = [
  "casual",
  "formal",
  "ethnic",
  "athleisure",
  "office",
] as const;

export const shoeMaterials = [
  "Merino Wool",
  "Recycled Plastic",
  "Cotton Knit",
  "Bamboo Fiber",
  "Cork",
] as const;

export const colorPalettes = [
  { color: "Red", hex: "#FF4444" },
  { color: "Blue", hex: "#4A6FA5" },
  { color: "Green", hex: "#2D5016" },
  { color: "Black", hex: "#1A1A1A" },
  { color: "White", hex: "#FFFFFF" },
  { color: "Grey", hex: "#808080" },
  { color: "Navy", hex: "#001F3F" },
  { color: "Beige", hex: "#F5F5DC" },
  { color: "Brown", hex: "#8B4513" },
  { color: "Gold", hex: "#D4AF37" },
  { color: "Purple", hex: "#800080" },
  { color: "Pink", hex: "#FF69B4" },
] as const;

export interface NeemanShoe {
  id: string;
  name: string;
  price: number;
  materials: string[];
  colors: string[];
  categories: string[];
  imageUrl: string;
  productUrl: string;
  description: string;
}

export interface OutfitAnalysis {
  detectedItems: string[];
  dominantColors: string[];
  style: string;
  occasion: string;
  colorPalette: { color: string; hex: string }[];
}

export interface ShoeRecommendation {
  shoe: NeemanShoe;
  matchScore: number;
  matchReason: string;
}

export interface AnalysisResult {
  analysis: OutfitAnalysis;
  recommendations: ShoeRecommendation[];
}

export const uploadImageSchema = z.object({
  image: z.string().min(1, "Image is required").optional(),
  colors: z.array(z.string()).optional(),
}).refine(data => data.image || data.colors, "Either image or colors must be provided");

export type UploadImageInput = z.infer<typeof uploadImageSchema>;

export interface ExampleScenario {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  style: string;
}

export const colorRecommendationSchema = z.object({
  colors: z.array(z.string()).min(1, "Select at least one color"),
});

export type ColorRecommendationInput = z.infer<typeof colorRecommendationSchema>;
