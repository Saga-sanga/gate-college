import { Skeleton } from '@/components/ui/skeleton'

export function EventsSkeletion() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Skeleton className="h-[400px]" />
      <Skeleton className="h-[550px]" />
    </div>
  )
}
