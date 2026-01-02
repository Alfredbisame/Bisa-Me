import { Skeleton } from "@/components/ui/skeleton"

export default function MainBannerSkeleton() {
  return (
    <div className="bg-gray-100 p-8 rounded-sm col-span-2 w-full h-full">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <Skeleton className="w-6 h-[2px] mr-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-9 w-64 mb-2" /> {/* Title */}
          <Skeleton className="h-20 w-[400px] mb-2" /> {/* Description */}
          
          <Skeleton className="h-10 w-32 rounded-sm" /> {/* Button */}

          <div className="flex items-center mt-8">
            {[1, 2, 3].map((_, index) => (
              <Skeleton 
                key={index}
                className="h-2 w-2 rounded-full mr-2"
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <Skeleton className="absolute -top-2 right-0 h-16 w-16 rounded-full z-10" />
          <Skeleton className="h-64 w-[250px]" />
        </div>
      </div>
    </div>
  )
}

export function SideBannerSkeleton() {
    return (
      <div className="bg-gray-100 p-6 rounded-sm h-full">
        <Skeleton className="h-7 w-48 mb-4" /> {/* Title */}
        <Skeleton className="h-10 w-32 rounded-sm" /> {/* Button */}
      </div>
    )
  }

