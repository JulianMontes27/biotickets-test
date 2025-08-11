"use client";

import { useState } from "react";
import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
}

export default function HeroImage({ src, alt }: HeroImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        priority
      />
    </>
  );
}