import { colorPalettes } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ColorPaletteProps {
  selectedColors: string[];
  onColorToggle: (color: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function ColorPalette({ selectedColors, onColorToggle, onSubmit, isLoading }: ColorPaletteProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Choose Your Colors</h3>
        <p className="text-sm text-muted-foreground">
          Select the colors in your outfit and we'll recommend matching shoes
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {colorPalettes.map((palette) => (
          <button
            key={palette.color}
            onClick={() => onColorToggle(palette.color)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedColors.includes(palette.color)
                ? "border-primary bg-primary/10"
                : "border-border bg-background hover:border-primary/50"
            }`}
            data-testid={`button-color-${palette.color.toLowerCase()}`}
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full border border-border"
                style={{ backgroundColor: palette.hex }}
              />
              <span className="text-xs font-medium">{palette.color}</span>
            </div>
          </button>
        ))}
      </div>

      <Button
        onClick={onSubmit}
        disabled={selectedColors.length === 0 || isLoading}
        className="w-full"
        data-testid="button-get-recommendations"
      >
        {isLoading ? "Finding Shoes..." : "Get Shoe Recommendations"}
      </Button>
    </div>
  );
}
