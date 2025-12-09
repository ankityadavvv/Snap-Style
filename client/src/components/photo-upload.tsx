import { useState, useRef, useCallback } from "react";
import { Camera, Image as ImageIcon, Upload, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PhotoUploadProps {
  onImageSelected: (base64Image: string) => void;
  isAnalyzing: boolean;
}

export function PhotoUpload({ onImageSelected, isAnalyzing }: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Compress image by resizing if too large
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        
        // Resize if larger than 1200px on longest side
        if (width > 1200 || height > 1200) {
          const ratio = width > height ? 1200 / width : 1200 / height;
          width = width * ratio;
          height = height * ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedData = canvas.toDataURL("image/jpeg", 0.8);
          setPreviewUrl(compressedData);
        } else {
          setPreviewUrl(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAnalyze = () => {
    if (previewUrl) {
      const base64 = previewUrl.split(",")[1];
      onImageSelected(base64);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  if (previewUrl) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={previewUrl}
              alt="Your outfit"
              className="w-full object-cover max-h-[400px]"
              data-testid="img-preview"
            />
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
            onClick={handleClear}
            disabled={isAnalyzing}
            data-testid="button-clear-image"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="default"
          className="w-full"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          data-testid="button-analyze"
        >
          {isAnalyzing ? "Finding Shoes..." : "Find My Shoes"}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClear}
          disabled={isAnalyzing}
          data-testid="button-change-photo"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Change Photo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card
        className={`relative min-h-[280px] flex flex-col items-center justify-center p-6 border-2 border-dashed transition-colors cursor-pointer ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        data-testid="card-upload-area"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Upload Your Outfit</h3>
            <p className="text-sm text-muted-foreground max-w-[240px]">
              Snap a photo wearing your outfit, or upload a picture of your clothes laid out
            </p>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => cameraInputRef.current?.click()}
          data-testid="button-take-photo"
        >
          <Camera className="h-4 w-4 mr-2" />
          Take Photo
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => fileInputRef.current?.click()}
          data-testid="button-choose-gallery"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Gallery
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        data-testid="input-file"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
        data-testid="input-camera"
      />
    </div>
  );
}
