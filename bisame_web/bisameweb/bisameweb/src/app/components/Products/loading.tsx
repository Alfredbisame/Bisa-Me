import { Skeleton } from "@/components/ui/skeleton"

function ProductCardSkeleton() {
  return (
    <div className="bg-white p-2 border rounded-sm">
      <Skeleton className="w-full h-32 rounded-md mb-2" /> {/* Image */}
      
      <div className="flex items-center space-x-1 mb-1">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-3 h-3 rounded-full" />
          ))}
        </div>
        <Skeleton className="w-12 h-4" /> {/* Reviews count */}
      </div>
      
      <Skeleton className="h-6 w-full mb-1" /> {/* Title */}
      <Skeleton className="h-6 w-24" /> {/* Price */}
    </div>
  )
}

function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Skeleton className="w-10 h-10 rounded-full" /> {/* Prev button */}
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="w-10 h-10 rounded-full" />
      ))}
      <Skeleton className="w-10 h-10 rounded-full" /> {/* Next button */}
    </div>
  )
}

export default function ProductGridSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
        <PaginationSkeleton />
      </div>
    </div>
  )
}
