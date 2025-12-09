import neemanLogo from "@assets/d8e5ac22-9e60-4358-871a-f9d1061ab96d._CR0_1180_4167_1250_PT0_SX600__-removebg-preview_1764502823493.png";

interface HeaderProps {
  onReset?: () => void;
  showBackButton?: boolean;
}

export function Header({ onReset, showBackButton }: HeaderProps) {
  return (
    <header 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b"
      data-testid="header"
    >
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-center relative">
        {/* Left: Logo or Back Button */}
        <div className="absolute left-4">
          {showBackButton && onReset ? (
            <button
              onClick={onReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-back"
            >
              Start Over
            </button>
          ) : (
            <img 
              src={neemanLogo} 
              alt="Neeman's Logo" 
              className="h-6 w-auto"
              style={{
                filter: "brightness(0) saturate(100%) invert(32%) sepia(74%) saturate(1200%) hue-rotate(110deg) brightness(100%) contrast(105%)",
              }}
            />
          )}
        </div>

        {/* Center: Snap & Style */}
        <h1 className="font-semibold text-lg">Snap & Style</h1>

        {/* Right: neemans.com */}
        <div className="absolute right-4">
          <a
            href="https://neemans.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            data-testid="link-neemans"
          >
            neemans.com
          </a>
        </div>
      </div>
    </header>
  );
}
