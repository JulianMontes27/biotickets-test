"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ExpandableVenueMapProps {
  imageUrl: string;
  venue: string;
}

export default function ExpandableVenueMap({ imageUrl, venue }: ExpandableVenueMapProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-6 text-white">Mapa de Localidades</h3>
        <div className="w-full bg-zinc-800 rounded-xl overflow-hidden cursor-pointer group relative" onClick={openModal}>
          <Image
            src={imageUrl}
            alt={`Mapa de localidades - ${venue}`}
            width={820}
            height={1024}
            className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              Click para expandir
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 pt-20" onClick={closeModal}>
          <div className="relative max-w-7xl max-h-[80vh] w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
            
            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Image
                src={imageUrl}
                alt={`Mapa de localidades - ${venue}`}
                width={820}
                height={1024}
                className="max-w-full max-h-full object-contain"
                quality={90}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}