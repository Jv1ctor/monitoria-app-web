import * as React from "react"
import { toast } from "sonner"
import { AppShell } from "@/components/layout/app-shell"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { EmptyState } from "@/components/shared/empty-state"
import { SearchBar } from "@/components/shared/search-bar"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { NavLink } from "react-router"
import { LogOut } from "lucide-react"

type DemoFormValues = {
  nome: string
  email: string
  area: string
  observacao: string
}

export const DesignSystem = () => {
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const zoneValueRef = React.useRef<string>(null)
  const remarkRef = React.useRef<HTMLTextAreaElement>(null)

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const values: DemoFormValues = {
      nome: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      area: zoneValueRef.current || "",
      observacao: nameRef.current?.value || "",
    }

    toast.success("Formulario enviado", {
      description: `Nome: ${values.nome || "-"}, Area: ${values.area || "-"}`,
    })
  }

  return (
    <AppShell
      sidebar={
        <Sidebar title="Design System" subtitle="Universidade de Fortaleza">
          <Button variant="ghost" className="w-full justify-start">
            Fundacoes
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Componentes UI
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Formularios
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Tabelas e dados
          </Button>
        </Sidebar>
      }
      header={
        <Topbar
          actions={
            <div className="flex items-center gap-4">
              <Avatar size="default">
                <AvatarFallback className="bg-primary text-white font-bold">
                  AL
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold">Alex Lima</p>
                <p className="text-sm text-muted-foreground">Mat. 12313512</p>
              </div>

              <Button size={"icon-xl"} className="cursor-pointer rounded-full border-2 border-muted bg-transparent w-10 h-10 text-foreground hover:border-red-100 hover:bg-red-100 hover:text-red-600">
                <LogOut />
              </Button>
            </div>
          }
          navComponents={[
            <NavLink
              className={
                "text-primary font-bold border-b-2 pb-1 border-primary"
              }
              to={"/ds"}
              key="inicio"
            >
              Inicio
            </NavLink>,
            <NavLink to={"/ds"} key="minhas_monitorias">
              Minhas Monitorias
            </NavLink>,
            <NavLink to={"/ds"} key="frequencia">
              Frequencia
            </NavLink>,
            <NavLink to={"/ds"} key="buscar_disciplinas">
              Buscar Disciplina
            </NavLink>,
            <NavLink to={"/ds"} key="forum">
              Forum
            </NavLink>,
          ]}
        />
      }
    >
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Identidade institucional</CardTitle>
            <CardDescription>
              Componentes padronizados para interfaces academicas e dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Badge>Academico</Badge>
            <Badge variant="secondary">Dashboards</Badge>
            <Badge variant="info">Informativo</Badge>
            <Badge variant="success">Confirmado</Badge>
            <Badge variant="warning">Atencao</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buttons e acoes</CardTitle>
            <CardDescription>
              Variantes principais, secundarias, ghost e feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="success">Sucesso</Button>
            <Button variant="destructive">Perigo</Button>
            <Button size="sm">Pequeno</Button>
            <Button size="lg">Grande</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs e formularios</CardTitle>
            <CardDescription>
              Inputs, selects e textarea integrados com React Hook Form.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit}>
              <FieldGroup className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Nome completo</FieldLabel>
                  <Input
                    ref={nameRef}
                    name="name"
                    placeholder="Digite o nome"
                  />
                  <FieldDescription>
                    Informe o nome completo do aluno.
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel>Email institucional</FieldLabel>
                  <Input
                    ref={emailRef}
                    name="email"
                    placeholder="nome@unifor.br"
                  />
                </Field>

                <Field>
                  <FieldLabel>Area</FieldLabel>
                  <Select
                    name="zone"
                    onValueChange={(value) => (zoneValueRef.current = value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computacao">Computacao</SelectItem>
                      <SelectItem value="engenharia">Engenharia</SelectItem>
                      <SelectItem value="saude">Saude</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field className="md:col-span-2">
                  <FieldLabel htmlFor="remark">Observacoes</FieldLabel>
                  <Textarea
                    ref={remarkRef}
                    id="remark"
                    name="remark"
                    placeholder="Observacoes para a equipe"
                  />
                </Field>

                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <Button type="submit">Salvar</Button>
                  <Button type="button" variant="secondary">
                    Cancelar
                  </Button>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Tabelas e tabs</CardTitle>
              <CardDescription>
                Exemplo de navegacao por abas e tabela de dados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="turmas">
                <TabsList>
                  <TabsTrigger value="turmas">Turmas</TabsTrigger>
                  <TabsTrigger value="monitores">Monitores</TabsTrigger>
                </TabsList>
                <TabsContent value="turmas" className="space-y-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Turma</TableHead>
                        <TableHead>Curso</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>INF101</TableCell>
                        <TableCell>Computacao</TableCell>
                        <TableCell>
                          <Badge variant="success">Ativa</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>ENG220</TableCell>
                        <TableCell>Engenharia</TableCell>
                        <TableCell>
                          <Badge variant="warning">Pendente</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="monitores">
                  <EmptyState
                    title="Sem monitores vinculados"
                    description="Associe monitores a uma turma para visualizar aqui."
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatares e status</CardTitle>
              <CardDescription>
                Exemplo de avatar com badge de disponibilidade.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/80?img=32" />
                  <AvatarFallback>MS</AvatarFallback>
                  <AvatarBadge />
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">Maria Santos</p>
                  <p className="text-sm text-muted-foreground">Disponivel</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar size="sm">
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">Alex Lima</p>
                  <p className="text-sm text-muted-foreground">Offline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Feedback e estados</CardTitle>
              <CardDescription>
                Toast, skeletons e estados vazios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => toast.success("Monitoria confirmada")}
                >
                  Toast sucesso
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    toast("Nova solicitacao", {
                      description: "A equipe foi notificada.",
                    })
                  }
                >
                  Toast neutro
                </Button>
              </div>
              <div className="grid gap-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <EmptyState
                title="Sem dados no momento"
                description="Aguardando novas solicitacoes."
                action={<Button size="sm">Criar solicitacao</Button>}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Menus e overlays</CardTitle>
              <CardDescription>
                Dropdown, dialog e sheet usando tokens institucionais.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">Abrir menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Opcoes</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Duplicar</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Abrir dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar acao</DialogTitle>
                    <DialogDescription>
                      Esta acao envia uma notificacao aos alunos.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="secondary">Cancelar</Button>
                    <Button>Confirmar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Abrir sheet</Button>
                </SheetTrigger>
                <SheetContent className="mt-5 mr-5 data-[side=right]:h-11/12">
                  <SheetHeader>
                    <SheetTitle>Resumo da turma</SheetTitle>
                    <SheetDescription>
                      Informacoes gerais da turma selecionada.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-3 px-5">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Alunos</p>
                      <p className="text-sm text-muted-foreground">
                        32 matriculados
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">Monitor</p>
                      <p className="text-sm text-muted-foreground">
                        Maria Santos
                      </p>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button variant="secondary">Fechar</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search e filtros</CardTitle>
            <CardDescription>
              Busca institucional com acao integrada.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SearchBar
              placeholder="Buscar por disciplina, turma ou monitor"
              action={<Button size="sm">Filtrar</Button>}
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
