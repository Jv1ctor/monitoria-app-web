import * as React from "react"
import { Book, Users, ChevronRight, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router"
import { useLoaderData } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { paths } from "@/routes/paths"
import type { AvailableMonitoringsLoaderResult } from "@/loaders/available-monitorings.loader"

const ITEMS_PER_PAGE = 12

export function AvailableMonitoringsPage() {
  const navigate = useNavigate()
  const { monitorings } = useLoaderData<AvailableMonitoringsLoaderResult>()

  const [currentPage, setCurrentPage] = React.useState(1)

  const totalPages = Math.ceil(monitorings.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMonitorings = monitorings.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleCardClick = (id: number) => {
    navigate(`${paths.studentMonitorings}/${id}`)
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
            onClick={() => handleCardClick(item.id)}
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
                  {item.subjectName}
                </h3>
                <p className="text-xs text-muted-foreground">{item.code}</p>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <div className="bg-blue-50 text-[#0047BA] px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  {item.monitorsCount} monitor{item.monitorsCount === 1 ? "" : "es"}
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
