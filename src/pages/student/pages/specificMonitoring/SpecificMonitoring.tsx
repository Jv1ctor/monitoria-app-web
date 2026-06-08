import * as React from "react"
import { ChevronLeft, CalendarDays, Clock, MapPin, CheckCircle2 } from "lucide-react"
import { useNavigate, useLocation } from "react-router"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { studentMaterial } from "@/routes/paths"


const initialEnrolled = [
  { 
    id: "1", 
    name: "Mariana Souza", 
    course: "Engenharia Mecânica", 
    days: "Segunda e Quarta", 
    time: "08:00 - 10:00", 
    location: "Presencial - K11" 
  }
]

const initialAvailable = [
  { 
    id: "2", 
    name: "Ricardo Alves", 
    course: "Engenharia Elétrica", 
    days: "Terça e Quinta", 
    time: "14:00 - 16:00", 
    location: "Presencial - I05"
  },
  { 
    id: "3", 
    name: "Beatriz Oliveira", 
    course: "Ciência da Computação", 
    days: "Segunda e Quarta", 
    time: "16:00 - 18:00", 
    location: "Online - Google Meet" 
  }
]

interface MonitorCardProps {
  data: {
    id: string
    name: string
    course: string
    days: string
    time: string
    location: string
  }
  isEnrolled?: boolean
  onAction: (id: string) => void
  onUnenroll?: (id: string) => void
}

function MonitorCard({ data, isEnrolled = false, onAction, onUnenroll }: MonitorCardProps) {
  const initials = data.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()

  return (
    <Card className="shadow-sm border-border">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-3 items-center">
            <div className="size-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-base leading-tight">{data.name}</span>
              <span className="text-xs text-muted-foreground">{data.course}</span>
            </div>
          </div>
          
          {isEnrolled && (
            <div className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
              <CheckCircle2 className="size-3" />
              Inscrito
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6 flex-1">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            <span>{data.days}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span>{data.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">{data.location}</span>
          </div>
        </div>

        <div className="mt-auto pt-2 flex flex-col gap-2">
          {isEnrolled ? (
            <>
              <Button 
                variant="outline" 
                className="w-full text-foreground"
                onClick={() => onAction(data.id)}
              >
                Ver conteúdos
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs h-8"
                onClick={() => onUnenroll?.(data.id)}
              >
                Cancelar Inscrição
              </Button>
            </>
          ) : (
            <Button 
              className="w-full bg-[#0047BA] hover:bg-[#003a99] text-white"
              onClick={() => onAction(data.id)}
            >
              Inscrever-se
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function SpecificMonitoringPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [enrolled, setEnrolled] = React.useState(initialEnrolled)
  const [available, setAvailable] = React.useState(initialAvailable)

  const subjectTitle = location.state?.subjectTitle || "Disciplina"

  const handleEnroll = (id: string) => {
    const monitoringToEnroll = available.find(m => m.id === id)
    if (monitoringToEnroll) {
      setAvailable(current => current.filter(m => m.id !== id))
      setEnrolled(current => [...current, monitoringToEnroll])
      toast.success("Inscrição realizada com sucesso!")
    }
  }

  const handleUnenroll = (id: string) => {
    const monitoringToUnenroll = enrolled.find(m => m.id === id)
    if (monitoringToUnenroll) {
      setEnrolled(current => current.filter(m => m.id !== id))
      setAvailable(current => [...current, monitoringToUnenroll])
      toast.success("Inscrição cancelada com sucesso!")
    }
  }

  const handleViewContent = (id: string) => {
    navigate(studentMaterial(id))
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 w-full">
      <Button 
        variant="ghost" 
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-1 size-4" />
        Voltar à busca
      </Button>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          Monitores de {subjectTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe as monitorias em que você está inscrito ou escolha uma nova para participar.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-foreground">Monitorias Inscritas</h2>
            <span className="text-sm text-muted-foreground">({enrolled.length})</span>
          </div>
          
          {enrolled.length === 0 ? (
            <div className="py-8 text-sm text-muted-foreground border border-dashed rounded-lg text-center">
              Você ainda não está inscrito em nenhuma monitoria desta disciplina.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolled.map(monitoring => (
                <MonitorCard 
                  key={monitoring.id} 
                  data={monitoring} 
                  isEnrolled={true} 
                  onAction={handleViewContent} 
                  onUnenroll={handleUnenroll}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-foreground">Monitorias Disponíveis</h2>
            <span className="text-sm text-muted-foreground">({available.length})</span>
          </div>

          {available.length === 0 ? (
            <div className="py-8 text-sm text-muted-foreground border border-dashed rounded-lg text-center">
              Não há mais monitorias disponíveis para esta disciplina no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {available.map(monitoring => (
                <MonitorCard 
                  key={monitoring.id} 
                  data={monitoring} 
                  isEnrolled={false} 
                  onAction={handleEnroll} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}