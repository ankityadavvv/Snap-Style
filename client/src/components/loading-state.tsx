import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

const loadingMessages = [
  "Analyzing your style...",
  "Detecting colors and patterns...",
  "Finding the perfect match...",
  "Curating eco-friendly options...",
  "Almost there...",
];

export function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <Card className="overflow-hidden" data-testid="card-loading">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          </div>

          <div className="space-y-2 w-full max-w-xs">
            <p className="font-medium text-lg" data-testid="text-loading-message">
              {loadingMessages[messageIndex]}
            </p>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              This usually takes 5-10 seconds
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
