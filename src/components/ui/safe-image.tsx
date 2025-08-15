"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
}

export default function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  // If there's no valid image source, don't render anything
  if (!src) {
    return null;
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={handleError}
      unoptimized={hasError}
    />
  );
}
