import { useMemo, useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SearchBar } from "@/components/shared/search-bar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { Student } from "@/types/admin/StudentType"

const MOCK_STUDENTS: Student[] = [
  { id: 1, name: "Breno Sampaio", initials: "BS", enrollment: "2422974", course: "C. Computacao", email: "breno@edu.unifor.br" },
  { id: 2, name: "Joao Victor Barreto", initials: "JV", enrollment: "2422976", course: "C. Computacao", email: "joao.b@edu.unifor.br" },
  { id: 3, name: "Lara Cruz", initials: "LC", enrollment: "2422979", course: "C. Computacao", email: "lara@edu.unifor.br" },
  { id: 4, name: "Gabriel Oliveira", initials: "GO", enrollment: "2010641", course: "ADS", email: "gabriel@edu.unifor.br" },
  { id: 5, name: "Marina Lopes", initials: "ML", enrollment: "2422001", course: "Eng. Software", email: "marina@edu.unifor.br" },
  { id: 6, name: "Diego Silva", initials: "DS", enrollment: "2422002", course: "C. Computacao", email: "diego@edu.unifor.br" },
]

export default function AdminStudents() {
  const [query, setQuery] = useState("")

  const filteredStudents = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return MOCK_STUDENTS

    return MOCK_STUDENTS.filter((student) => {
      return (
        student.name.toLowerCase().includes(term) ||
        student.enrollment.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
      )
    })
  }, [query])

  return (
    <div className="min-h-svh bg-muted/30 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <h1>Alunos</h1>
            <p className="text-sm text-muted-foreground">
              Listagem dos alunos cadastrados na plataforma. O cadastro de alunos e feito pelo proprio aluno via tela de Cadastro.
            </p>
          </div>

          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Filtrar por nome, matricula ou e-mail"
            className="w-full md:max-w-md"
          />
        </section>

        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NOME</TableHead>
                <TableHead>MATRICULA</TableHead>
                <TableHead>CURSO</TableHead>
                <TableHead>E-MAIL</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="default">
                        <AvatarFallback className="bg-primary text-white">
                          {student.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{student.name}</span>
                    </div>
                  </TableCell>

                  <TableCell>{student.enrollment}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))}

              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    Nenhum aluno encontrado para esse filtro.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </div>
    </div>
  )
}