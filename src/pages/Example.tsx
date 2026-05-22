import { EmptyState } from "@/components/shared/empty-state"
import { SearchBar } from "@/components/shared/search-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const Example = () => {
  return (
    <div className="min-h-svh bg-muted/30 px-6 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary">Monitoria</Badge>
            <h1>Dashboard academico</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe solicitacoes, turmas e agendas de monitoria.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">Exportar</Button>
            <Button>Nova solicitacao</Button>
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Solicitacoes recentes</CardTitle>
            <CardDescription>
              Visao rapida das solicitacoes de monitoria por status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SearchBar placeholder="Buscar por disciplina, monitor ou turma" />
            <Tabs defaultValue="pendentes">
              <TabsList>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                <TabsTrigger value="agendadas">Agendadas</TabsTrigger>
                <TabsTrigger value="concluidas">Concluidas</TabsTrigger>
              </TabsList>
              <TabsContent value="pendentes" className="space-y-4">
                <EmptyState
                  title="Nenhuma solicitacao pendente"
                  description="Quando uma nova solicitacao chegar, ela aparecera aqui."
                  action={<Button size="sm">Criar solicitacao</Button>}
                />
              </TabsContent>
              <TabsContent value="agendadas">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Disciplina</TableHead>
                      <TableHead>Monitor</TableHead>
                      <TableHead>Horario</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Algoritmos</TableCell>
                      <TableCell>Maria Santos</TableCell>
                      <TableCell>Seg, 14:00</TableCell>
                      <TableCell>
                        <Badge variant="success">Confirmada</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Calculo I</TableCell>
                      <TableCell>Lucas Lima</TableCell>
                      <TableCell>Qua, 09:30</TableCell>
                      <TableCell>
                        <Badge variant="warning">Aguardando</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="concluidas" className="space-y-4">
                <EmptyState
                  title="Sem solicitacoes concluidas"
                  description="Quando uma monitoria for finalizada, ela aparecera aqui."
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
