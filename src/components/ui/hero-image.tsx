"use client";

import { useState } from "react";
import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3';

export default function HeroImage({ src, alt }: HeroImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageSrc(FALLBACK_IMAGE)}
        priority
      />
    </>
  );
}