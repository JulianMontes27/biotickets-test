export default function EventsGridLoading() {
  return (
    <div className="pb-16 sm:pb-20 md:pb-24">
      <div className="container mx-auto px-4">
        {/* Tabs Loading */}
        <div className="flex gap-8 mb-12 border-b border-zinc-800">
          <div className="pb-6 px-2">
            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
          </div>
          <div className="pb-6 px-2">
            <div className="h-4 w-20 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>

        {/* Grid Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden animate-pulse"
              style={{ height: '420px' }}
            >
              {/* Image placeholder */}
              <div className="bg-zinc-800 w-full h-[280px]" />
              {/* Content placeholder */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-800 rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-zinc-800 rounded w-2/3" />
                  <div className="h-3 bg-zinc-800 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Loading */}
        <div className="flex justify-between items-center mt-12">
          <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-800 rounded-full animate-pulse" />
            <div className="w-8 h-8 bg-zinc-800 rounded-full animate-pulse" />
            <div className="w-8 h-8 bg-zinc-800 rounded-full animate-pulse" />
            <div className="w-8 h-8 bg-zinc-800 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}