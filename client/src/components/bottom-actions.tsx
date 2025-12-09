import { Button } from "@/components/ui/button";
import { ExternalLink, RotateCcw } from "lucide-react";

interface BottomActionsProps {
  onReset: () => void;
}

export function BottomActions({ onReset }: BottomActionsProps) {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4 z-50"
      data-testid="section-bottom-actions"
    >
      <div className="max-w-md mx-auto flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onReset}
          data-testid="button-try-another"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Another
        </Button>
        <Button className="flex-1" asChild data-testid="button-view-collection">
          <a href="https://neemans.com/collections/all" target="_blank" rel="noopener noreferrer">
            View Collection
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  );
}
