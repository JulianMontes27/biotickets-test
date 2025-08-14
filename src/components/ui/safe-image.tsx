"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = null;

export default function SafeImage({ src, alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  // If there's no valid image source, don't render anything
  if (!imgSrc) {
    return null;
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      unoptimized={hasError}
    />
  );
}
