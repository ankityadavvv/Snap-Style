// Simple dominant color extractor using HTML5 Canvas

export async function extractColors(imageSrc: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Could not get canvas context"));
                return;
            }

            // Resize for faster processing
            const maxDimension = 100;
            const scale = Math.min(maxDimension / img.width, maxDimension / img.height);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            const colorMap = new Map<string, number>();

            // Sample every 5th pixel
            for (let i = 0; i < data.length; i += 20) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const alpha = data[i + 3];

                if (alpha < 200) continue; // Skip transparent

                // Quantize colors (round to nearest 32) to group similar shades
                const qR = Math.round(r / 32) * 32;
                const qG = Math.round(g / 32) * 32;
                const qB = Math.round(b / 32) * 32;

                const key = `${qR},${qG},${qB}`;
                colorMap.set(key, (colorMap.get(key) || 0) + 1);
            }

            // Sort by frequency
            const sortedColors = Array.from(colorMap.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([key]) => {
                    const [r, g, b] = key.split(",");
                    return `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`;
                });

            // Map common colors to readable names for better matching if possible, 
            // but for now we'll just return hex codes. 
            // The backend 'calculateMatchScore' logic handles basic color matching.

            resolve(sortedColors.length > 0 ? sortedColors : ["#000000"]);
        };

        img.onerror = () => {
            reject(new Error("Failed to load image for color extraction"));
        };
    });
}

// Helper to get a human-readable name approximation (simple version)
export function getColorName(hex: string): string {
    // Basic mapping, can be expanded
    return "Custom Color";
}
