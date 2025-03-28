import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("grid gap-1", className)}>
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      {description && <p className="text-lg text-muted-foreground">{description}</p>}
    </div>
  )
}

