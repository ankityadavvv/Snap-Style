import type { ExampleScenario } from "@shared/schema";
import { exampleScenarios } from "@/lib/neemans-catalog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ExampleScenariosProps {
  onSelectScenario: (scenario: ExampleScenario) => void;
}

export function ExampleScenarios({ onSelectScenario }: ExampleScenariosProps) {
  return (
    <div className="space-y-3" data-testid="section-examples">
      <div className="space-y-1">
        <h3 className="font-semibold text-base">Try an Example</h3>
        <p className="text-sm text-muted-foreground">
          See how it works with these outfit styles
        </p>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {exampleScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className="relative flex-shrink-0 w-[160px] rounded-xl overflow-hidden group hover-elevate active-elevate-2"
              data-testid={`button-scenario-${scenario.id}`}
            >
              <div className="aspect-[3/2] relative">
                <img
                  src={scenario.imageUrl}
                  alt={scenario.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left text-white">
                  <p className="font-semibold text-sm">{scenario.title}</p>
                  <p className="text-xs text-white/80 line-clamp-1">
                    {scenario.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
