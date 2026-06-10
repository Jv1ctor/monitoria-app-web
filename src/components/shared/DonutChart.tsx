import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type DonutSegment = {
  label: string
  value: number
  /** Cor do segmento (qualquer valor CSS válido, ex.: "#1e3a8a"). */
  color: string
}

type DonutChartProps = {
  title: string
  data: DonutSegment[]
  className?: string
}

// Raio cuja circunferência é exatamente 100, para que `value` (em %) mapeie
// diretamente para o comprimento do traço (stroke-dasharray).
const RADIUS = 15.915

function DonutChart({ title, data, className }: DonutChartProps) {
  const total = data.reduce((sum, segment) => sum + segment.value, 0) || 1
  let cumulative = 0

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <svg viewBox="0 0 42 42" className="size-[140px] shrink-0" role="img">
          <title>{title}</title>
          <circle
            cx="21"
            cy="21"
            r={RADIUS}
            fill="none"
            strokeWidth="6"
            className="stroke-muted"
          />
          {data.map((segment) => {
            const fraction = (segment.value / total) * 100
            // Inicia no topo (12h) e desenha cada fatia em sequência.
            const dashoffset = (100 - cumulative + 25) % 100
            cumulative += fraction
            return (
              <circle
                key={segment.label}
                cx="21"
                cy="21"
                r={RADIUS}
                fill="none"
                stroke={segment.color}
                strokeWidth="6"
                strokeDasharray={`${fraction} ${100 - fraction}`}
                strokeDashoffset={dashoffset}
              />
            )
          })}
        </svg>

        <ul className="flex-1 space-y-1.5 text-sm">
          {data.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-muted-foreground">{segment.label}</span>
              <span className="ml-auto font-semibold">{segment.value}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export { DonutChart }
