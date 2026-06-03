import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

type StarRatingProps = {
  value: number
  onChange?: (value: number) => void
  max?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  className?: string
}

const sizeMap = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
}

export function StarRating({
  value,
  onChange,
  max = 5,
  size = "lg",
  readonly = false,
  className,
}: StarRatingProps) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="radiogroup"
      aria-label="Avaliacao por estrelas"
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const ativa = starValue <= value

        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={value === starValue}
            aria-label={`${starValue} estrela${starValue > 1 ? "s" : ""}`}
            disabled={readonly}
            className={cn(
              "text-warning transition-opacity",
              readonly ? "cursor-default" : "cursor-pointer hover:opacity-80",
            )}
            onClick={() => !readonly && onChange?.(starValue)}
          >
            <Star
              className={sizeMap[size]}
              fill={ativa ? "currentColor" : "none"}
            />
          </button>
        )
      })}
    </div>
  )
}