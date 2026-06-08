import { Card, CardContent } from "@/components/ui/card"
import type {Metric, Session} from "@/types/teachingAssistant/MonitoringDashboard.type"


function cardDashboardMonitor({ label, value, icon: Icon }: Metric) {
  return (
    <Card className="py-3">
      <CardContent className="flex items-center gap-3 px-4">
        <div className="rounded-md bg-info/10 p-2 text-info">
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-3xl leading-none font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default cardDashboardMonitor