"use client";

interface EventPurchaseButtonProps {
  eventLink?: string;
  ticketPrice: number;
  isUpcoming: boolean;
}

export default function EventPurchaseButton({ 
  eventLink, 
  isUpcoming 
}: EventPurchaseButtonProps) {
  const handlePurchase = () => {
    if (eventLink) {
      window.open(eventLink, '_blank');
    } else {
      // Fallback to general ticket page
      window.open('https://eventos.biotickets.com/', '_blank');
    }
  };

  if (!isUpcoming) {
    return null;
  }

  return (
    <button
      onClick={handlePurchase}
      className="w-full px-6 py-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-semibold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 hover:from-indigo-500 hover:to-purple-500"
      style={{
        boxShadow: '0 10px 30px rgba(99,102,241,0.4)'
      }}
    >
      Continuar
    </button>
  );
}