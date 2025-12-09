import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AnalysisResult } from "@shared/schema";
import { Header } from "@/components/header";
import { PhotoUpload } from "@/components/photo-upload";
import { OutfitAnalysisCard } from "@/components/outfit-analysis";
import { RecommendationsList } from "@/components/shoe-recommendation";
import { ColorPalette } from "@/components/color-palette";
import { LoadingState } from "@/components/loading-state";
import { BottomActions } from "@/components/bottom-actions";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Sparkles, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ViewState = "upload" | "analyzing" | "results" | "color-picker";

export default function Home() {
  const [viewState, setViewState] = useState<ViewState>("upload");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (request: { image?: string; colors?: string[] }) => {
      const response = await apiRequest("POST", "/api/analyze", request);
      return await response.json() as AnalysisResult;
    },
    onMutate: () => {
      setViewState("analyzing");
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      setViewState("results");
    },
    onError: (error) => {
      setViewState(selectedColors.length > 0 ? "color-picker" : "upload");
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unable to process your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleImageSelected = (base64Image: string) => {
    analyzeMutation.mutate({ image: base64Image });
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleColorSubmit = () => {
    analyzeMutation.mutate({ colors: selectedColors });
  };

  const handleReset = () => {
    setViewState("upload");
    setAnalysisResult(null);
    setSelectedColors([]);
    analyzeMutation.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onReset={handleReset} 
        showBackButton={viewState === "results" || viewState === "color-picker"} 
      />

      <main className="max-w-md mx-auto px-4 py-6 pb-28">
        {viewState === "upload" && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-primary mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">AI-Powered Styling</span>
              </div>
              <h2 className="text-2xl font-bold" data-testid="text-headline">
                Find Your Perfect
                <br />
                Neeman's Shoes
              </h2>
              <p className="text-muted-foreground text-sm">
                Upload your outfit and let our AI recommend
                <br />
                the best sustainable shoes for your look
              </p>
            </div>

            <PhotoUpload
              onImageSelected={handleImageSelected}
              isAnalyzing={analyzeMutation.isPending}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              onClick={() => {
                setViewState("color-picker");
                setSelectedColors([]);
              }}
              variant="outline"
              className="w-full"
              data-testid="button-choose-colors"
            >
              <Palette className="w-4 h-4 mr-2" />
              Pick Colors Instead
            </Button>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Sustainable Fashion</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Every Neeman's shoe is made from eco-friendly materials like Merino wool and recycled plastic bottles.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {viewState === "color-picker" && (
          <div className="space-y-6">
            <ColorPalette
              selectedColors={selectedColors}
              onColorToggle={handleColorToggle}
              onSubmit={handleColorSubmit}
              isLoading={analyzeMutation.isPending}
            />
          </div>
        )}

        {viewState === "analyzing" && (
          <LoadingState />
        )}

        {viewState === "results" && analysisResult && (
          <div className="space-y-6">
            <OutfitAnalysisCard analysis={analysisResult.analysis} />
            <RecommendationsList recommendations={analysisResult.recommendations} />
            <BottomActions onReset={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
}
