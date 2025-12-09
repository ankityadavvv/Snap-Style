import type { ShoeRecommendation } from "@shared/schema";
import { formatPrice } from "@/lib/neemans-catalog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Leaf, Sparkles } from "lucide-react";

interface ShoeRecommendationCardProps {
  recommendation: ShoeRecommendation;
  index: number;
}

export function ShoeRecommendationCard({ recommendation, index }: ShoeRecommendationCardProps) {
  const { shoe, matchScore, matchReason } = recommendation;

  return (
    <Card 
      className="overflow-hidden hover-elevate"
      data-testid={`card-recommendation-${index}`}
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={shoe.imageUrl}
            alt={shoe.name}
            className="w-full h-full object-cover"
            data-testid={`img-shoe-${index}`}
          />
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-primary-foreground gap-1">
            <Sparkles className="w-3 h-3" />
            {matchScore}% Match
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg" data-testid={`text-shoe-name-${index}`}>
            {shoe.name}
          </h3>
          <p className="text-2xl font-bold text-primary" data-testid={`text-price-${index}`}>
            {formatPrice(shoe.price)}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {shoe.materials.map((material, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-xs gap-1 rounded-full"
              data-testid={`badge-material-${index}-${i}`}
            >
              <Leaf className="w-3 h-3 text-primary" />
              {material}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground" data-testid={`text-reason-${index}`}>
          {matchReason}
        </p>

        <Button 
          className="w-full" 
          asChild
          data-testid={`button-view-product-${index}`}
        >
          <a href={shoe.productUrl} target="_blank" rel="noopener noreferrer">
            View on Neeman's
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

interface RecommendationsListProps {
  recommendations: ShoeRecommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (recommendations.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No recommendations available</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4" data-testid="list-recommendations">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Perfect Matches for You
      </h2>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <ShoeRecommendationCard
            key={rec.shoe.id}
            recommendation={rec}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
