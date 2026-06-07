import * as React from "react"
import { FileText, Plus, Pencil, Trash2, Sheet } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const initialMaterials = [
  { id: "1", title: "Apostila de Limites", course: "Cálculo I", type: "PDF", date: "12/05/2026" },
  { id: "2", title: "Lista de Exercícios — Derivadas", course: "Cálculo I", type: "DOCX", date: "14/05/2026" },
  { id: "3", title: "Slides — Integral por partes", course: "Cálculo I", type: "PDF", date: "15/05/2026" }
]

const COURSES = [
  { value: "Cálculo I", label: "Cálculo I" },
  { value: "Física II", label: "Física II" },
  { value: "Álgebra Linear", label: "Álgebra Linear" }
]

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".pptx"]

export function MaterialsListPage() {
  const [materials, setMaterials] = React.useState(initialMaterials)

  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({})

  //estatdos p modal de criacao
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [createTitle, setCreateTitle] = React.useState("")
  const [createCourse, setCreateCourse] = React.useState("")
  const fileRef = React.useRef<HTMLInputElement>(null)

  //estados p modal de edicao
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editTitle, setEditTitle] = React.useState("")
  const [editCourse, setEditCourse] = React.useState("")

  const handleDelete = (id: string) => {
    setMaterials((current) => current.filter((item) => item.id !== id))
    toast.success("Material excluído com sucesso!")
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (!createTitle || createTitle.trim() === "") errors.title = "O título é obrigatório."
    if (!createCourse) errors.course = "Selecione uma disciplina."

    const selectedFile = fileRef.current?.files?.[0]
    let autoDetectedType = ""

    if (!selectedFile) {
      errors.file = "Anexe o arquivo do material."
    } else {
      const fileName = selectedFile.name.toLowerCase()
      const isValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext))
      
      if (!isValidExtension) {
        errors.file = "Formato inválido. Apenas .pdf, .docx ou .pptx são aceitos."
      } else {
        if (fileName.endsWith(".pdf")) autoDetectedType = "PDF"
        else if (fileName.endsWith(".docx")) autoDetectedType = "DOCX"
        else if (fileName.endsWith(".pptx")) autoDetectedType = "PPTX"
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({}) 

    const newMaterial = {
      id: Math.random().toString(),
      title: createTitle,
      course: createCourse,
      type: autoDetectedType,
      date: "Agora", 
    }

    setMaterials([newMaterial, ...materials])
    toast.success("Material publicado!")
    setIsCreateOpen(false)
    
    setCreateTitle("")
    setCreateCourse("")
    if (fileRef.current) fileRef.current.value = ""
  }

  const openEditModal = (material: any) => {
    setFormErrors({}) 
    setEditingId(material.id)
    setEditTitle(material.title)
    setEditCourse(material.course)
    setIsEditOpen(true)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const errors: Record<string, string> = {}

    if (!editTitle || editTitle.trim() === "") errors.editTitle = "O título não pode ficar vazio."
    if (!editCourse) errors.editCourse = "Selecione uma disciplina."

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})

    const updatedMaterials = []
    for (let i = 0; i < materials.length; i++) {
      if (materials[i].id === editingId) {
        updatedMaterials.push({
          ...materials[i],
          title: editTitle,
          course: editCourse,
        })
      } else {
        updatedMaterials.push(materials[i])
      }
    }

    setMaterials(updatedMaterials)
    toast.success("Material atualizado!")
    setIsEditOpen(false)
  }

  // const onOpenCreateChange = (open: boolean) => {
  //   setIsCreateOpen(open)
  //   if (!open) setFormErrors({})
  // }

  const onOpenEditChange = (open: boolean) => {
    setIsEditOpen(open)
    if (!open) setFormErrors({})
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Materiais</h1>
          <p className="text-sm text-muted-foreground mt-1">Publique apostilas, listas e slides.</p>
        </div>

        {/* <Sheet ={isCreateOpen} onOpenChange={onOpenCreateChange}>
          <SheetTrigger asChild>
            <Button className="bg-[#0047BA] hover:bg-[#003a99] text-white">
              <Plus className="mr-2 size-4" />
              Publicar Material
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md">
            <SheetHeader className="mb-2">
              <SheetTitle>Publicar Material</SheetTitle>
              <SheetDescription>Preencha os dados e selecione o arquivo (.pdf, .docx, .pptx).</SheetDescription>
            </SheetHeader>
            <form onSubmit={handleCreateSubmit}>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel>Título do Material</FieldLabel>
                  <Input 
                    value={createTitle} 
                    onChange={(e) => setCreateTitle(e.target.value)} 
                    placeholder="Ex: Lista de Exercícios 01" 
                    className={formErrors.title ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {formErrors.title && <FieldError errors={[{ message: formErrors.title }]} />}
                </Field>

                <Field>
                  <FieldLabel>Disciplina</FieldLabel>
                  <Select onValueChange={setCreateCourse} value={createCourse}>
                    <SelectTrigger className={formErrors.course ? "border-destructive" : ""}>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {formErrors.course && <FieldError errors={[{ message: formErrors.course }]} />}
                </Field>

                <Field>
                  <FieldLabel>Arquivo</FieldLabel>
                  <Input 
                    type="file" 
                    ref={fileRef}
                    accept=".pdf,.docx,.pptx" 
                    className={`cursor-pointer ${formErrors.file ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  {formErrors.file && <FieldError errors={[{ message: formErrors.file }]} />}
                </Field>

                <div className="flex justify-end gap-3 mt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
                  <Button type="submit" className="bg-[#0047BA] hover:bg-[#003a99]">Salvar</Button>
                </div>
              </FieldGroup>
            </form>
          </SheetContent>
        </Sheet> */}
      </div>

      <Card className="shadow-sm border-border overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[300px] text-xs font-bold text-muted-foreground uppercase">Título</TableHead>
                <TableHead className="text-xs font-bold text-muted-foreground uppercase">Disciplina</TableHead>
                <TableHead className="text-xs font-bold text-muted-foreground uppercase">Tipo</TableHead>
                <TableHead className="text-xs font-bold text-muted-foreground uppercase">Publicado</TableHead>
                <TableHead className="text-right text-xs font-bold text-muted-foreground uppercase pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">Nenhum material publicado.</TableCell>
                </TableRow>
              ) : (
                materials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <FileText className="size-4" />
                        </div>
                        <span className="text-sm font-bold text-foreground">{material.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{material.course}</TableCell>
                    <TableCell>
                      <span className="text-[10px] font-bold bg-muted text-muted-foreground px-2 py-1 rounded uppercase">
                        {material.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{material.date}</TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="icon" className="size-8 text-muted-foreground hover:text-foreground" onClick={() => openEditModal(material)} title="Editar">
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20" onClick={() => handleDelete(material.id)} title="Excluir">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={onOpenEditChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="mb-2">
            <DialogTitle>Editar Material</DialogTitle>
            <DialogDescription>Altere as informações do material selecionado.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel>Título do Material</FieldLabel>
                <Input 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  className={formErrors.editTitle ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {formErrors.editTitle && <FieldError errors={[{ message: formErrors.editTitle }]} />}
              </Field>
              <Field>
                <FieldLabel>Disciplina</FieldLabel>
                <Select onValueChange={setEditCourse} value={editCourse}>
                  <SelectTrigger className={formErrors.editCourse ? "border-destructive" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {formErrors.editCourse && <FieldError errors={[{ message: formErrors.editCourse }]} />}
              </Field>
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
                <Button type="submit" className="bg-[#0047BA] hover:bg-[#003a99]">Atualizar</Button>
              </div>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}