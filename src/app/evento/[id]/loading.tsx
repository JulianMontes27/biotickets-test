import { ArrowLeft } from "lucide-react";

export default function EventDetailLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background Skeleton */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 to-zinc-700 animate-pulse" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        {/* Back Button Skeleton */}
        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-white/50 w-fit">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Volver</span>
            </div>
          </div>
        </div>

        {/* Event Title and Basic Info Skeleton */}
        <div className="absolute bottom-16 left-0 right-0">
          <div className="container mx-auto px-6">
            {/* Category Skeleton */}
            <div className="mb-4">
              <div className="h-4 w-24 bg-indigo-400/30 rounded animate-pulse" />
            </div>
            
            {/* Title Skeleton */}
            <div className="mb-4 space-y-3">
              <div className="h-12 w-3/4 bg-white/20 rounded animate-pulse" />
              <div className="h-12 w-1/2 bg-white/20 rounded animate-pulse" />
            </div>
            
            {/* Date and Time Skeleton */}
            <div className="flex flex-wrap items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white/20 rounded animate-pulse" />
                <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white/20 rounded animate-pulse" />
                <div className="h-4 w-16 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description Section */}
            <div>
              <div className="h-8 w-48 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded mb-6 animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 w-full bg-zinc-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-zinc-700 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-zinc-700 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-zinc-700 rounded animate-pulse" />
              </div>
            </div>

            {/* Tags Section Skeleton */}
            <div>
              <div className="h-6 w-24 bg-white/20 rounded mb-4 animate-pulse" />
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-20 bg-zinc-800/50 border border-zinc-700 rounded-full animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            {/* Ticket Purchase Card Skeleton */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6">
              <div className="h-6 w-32 bg-white/20 rounded mb-4 animate-pulse" />
              <div className="space-y-4">
                <div className="h-12 w-full bg-indigo-500/20 rounded-lg animate-pulse" />
                <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
              </div>
            </div>

            {/* Location Map Skeleton */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="h-6 w-40 bg-white/20 rounded mb-6 animate-pulse" />
              <div className="w-full h-64 bg-zinc-800 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}