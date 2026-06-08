import * as React from "react"
import { Book, Users, ChevronRight, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { paths } from "@/routes/paths"

const mockMonitorings = [
  { id: "1", title: "Desenvolvimento Web Front-End", course: "Ciência da Computação", code: "COMP011", monitorsCount: 3 },
  { id: "2", title: "Back-End com Spring Boot", course: "Ciência da Computação", code: "COMP022", monitorsCount: 2 },
  { id: "3", title: "Lógica de Programação em C", course: "Engenharia de Computação", code: "ENG033", monitorsCount: 4 },
  { id: "4", title: "Análise de Dados com Python", course: "Ciência de Dados", code: "DAT044", monitorsCount: 1 },
  { id: "5", title: "Programação Orientada a Objetos", course: "Ciência da Computação", code: "COMP055", monitorsCount: 5 },
  { id: "6", title: "Interação Humano-Computador", course: "Ciência da Computação", code: "COMP066", monitorsCount: 2 },
  { id: "7", title: "Segurança da Informação", course: "Ciência da Computação", code: "COMP075", monitorsCount: 3 },
  { id: "8", title: "Arquitetura de Computadores", course: "Ciência da Computação", code: "COMP088", monitorsCount: 2 },
  { id: "9", title: "Inteligência Artificial", course: "Ciência da Computação", code: "COMP099", monitorsCount: 6 },
  { id: "10", title: "Gestão de Projetos Ágeis", course: "Engenharia de Software", code: "ENG100", monitorsCount: 2 },
  { id: "11", title: "Banco de Dados NoSQL", course: "Análise e Desenvolvimento de Sistemas", code: "ADS066", monitorsCount: 2 },
  { id: "12", title: "Inteligência Artificial", course: "Análise e Desenvolvimento de Sistemas", code: "ADS077", monitorsCount: 5 },
  { id: "13", title: "Redes de Computadores", course: "Análise e Desenvolvimento de Sistemas", code: "ADS088", monitorsCount: 3 },
  { id: "14", title: "Transferência de Calor", course: "Engenharia Mecânica", code: "ENG110", monitorsCount: 4 },
  { id: "15", title: "Fundações e Estruturas", course: "Engenharia Civil", code: "ENG111", monitorsCount: 3 },
  { id: "16", title: "Eletrônica de Potência", course: "Engenharia Elétrica", code: "ENG112", monitorsCount: 2 },
  { id: "17", title: "Logística e Supply Chain", course: "Engenharia de Produção", code: "ENG113", monitorsCount: 4 },
  { id: "18", title: "Sistemas Embarcados", course: "Engenharia de Computação", code: "ENG114", monitorsCount: 3 },
  { id: "19", title: "Segurança da Informação", course: "Análise e Desenvolvimento de Sistemas", code: "ADS099", monitorsCount: 4 },
  { id: "20", title: "Automação Industrial", course: "Engenharia de Produção", code: "ENG115", monitorsCount: 2 }
  
]

const ITEMS_PER_PAGE = 12

export function AvailableMonitoringsPage() {
  const navigate = useNavigate()
  
  const [monitorings] = React.useState(mockMonitorings)
  const [currentPage, setCurrentPage] = React.useState(1)

  const totalPages = Math.ceil(monitorings.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMonitorings = monitorings.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleCardClick = (title: string) => {
    navigate(paths.studentMonitorings, { state: { subjectTitle: title } })
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Monitorias Disponíveis</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {currentMonitorings.map((item) => (
          <Card 
            key={item.id} 
            onClick={() => handleCardClick(item.title)}
            className="shadow-sm border-border hover:border-[#0047BA]/40 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
          >
            <CardContent className="p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="size-10 rounded-md bg-blue-50 flex items-center justify-center text-[#0047BA]">
                  <Book className="size-5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{item.code}</span>
              </div>

              <div className="mb-6 flex-1">
                <h3 className="font-bold text-base text-foreground leading-tight mb-1 group-hover:text-[#0047BA] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.course}</p>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <div className="bg-blue-50 text-[#0047BA] px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  {item.monitorsCount} monitores
                </div>
                <ChevronRight className="size-4 text-muted-foreground group-hover:text-[#0047BA] transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-muted-foreground"
          >
            <ChevronLeft className="size-4" />
          </Button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(pageNumber)}
                className={`w-8 h-8 p-0 font-medium ${
                  currentPage === pageNumber 
                    ? "bg-[#0047BA] text-white hover:bg-[#003a99]" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {pageNumber}
              </Button>
            )
          })}

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-muted-foreground"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}