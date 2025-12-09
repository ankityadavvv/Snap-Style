import type { OutfitAnalysis } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, Palette, Sparkles } from "lucide-react";

interface OutfitAnalysisCardProps {
  analysis: OutfitAnalysis;
}

export function OutfitAnalysisCard({ analysis }: OutfitAnalysisCardProps) {
  return (
    <Card data-testid="card-outfit-analysis">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Outfit Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shirt className="w-4 h-4" />
            <span>Detected Items</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.detectedItems.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="rounded-full"
                data-testid={`badge-item-${index}`}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Palette className="w-4 h-4" />
            <span>Color Palette</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {analysis.colorPalette.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1.5"
                data-testid={`color-swatch-${index}`}
              >
                <div
                  className="w-5 h-5 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm">{color.color}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <div className="flex-1 bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Style</p>
            <p className="font-medium capitalize" data-testid="text-style">
              {analysis.style}
            </p>
          </div>
          <div className="flex-1 bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Occasion</p>
            <p className="font-medium capitalize" data-testid="text-occasion">
              {analysis.occasion}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
