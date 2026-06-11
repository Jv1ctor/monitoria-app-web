# Navegação e alinhamento com as rotas atuais — Design

**Data:** 2026-06-11

## Objetivo

Fazer o código de navegação funcionar com a estrutura de rotas **atual** (definida em `src/router.tsx` e nos `routes.tsx` de cada papel), sem alterar as rotas — exceto uma correção pontual de uma rota malformada. Introduzir um helper `handleNavigateTo` para navegação programática, corrigir o realce de item ativo, **remover por completo** todas as referências ao fórum (mantendo os arquivos em `src/pages/forum/` intactos no disco) e deixar o build verde corrigindo os erros de tipo remanescentes.

## Contexto

As rotas reais hoje são:

- **Públicas:** `/`, `/login`, `/register`, `/recover`, `/ds`.
- **`/student`** (Layout + authLoader): index (`/student`), `availableMonitorings`, `specificMonitoring`, `materials/:id`, `/studentAttendance` (⚠️ barra inicial — malformada).
- **`/monitor`**: index (`/monitor`), `materials`, `availableMonitorings`, `monitorSchedule`.
- **`/admin`**: index (`/admin`), `classroom`.

Problemas atuais que este design resolve:

1. `src/routes/paths.ts` está desalinhado das rotas reais e referencia caminhos de fórum comentados.
2. `auth-layout.tsx` referencia `paths.studentForum` / `paths.monitorForum` (inexistentes) → erro de tipo; itens de menu apontam para destinos errados (`#`, `/students`, `/`).
3. `NavLink` sem `end` → item de menu que aponta para `/` ou `/student` fica ativo em todas as telas (bug do "item sempre ativo").
4. A rota `{ path: "/studentAttendance" }` (filha de `/student`) é uma rota absoluta inválida no React Router 7 e quebra a criação do router.
5. Erros de build não relacionados à navegação: `FormModal` exige `id` (3 modais admin não passam), `date-fns`/`react-day-picker` ausentes (`DatePicker`/`calendar`), casing de import `adminStudents` vs `AdminStudents`, variáveis não usadas.

## Decisões

- **Navegação:** helper `handleNavigateTo` para navegação **programática**; menus continuam com `<NavLink>` (mantém `isActive` e semântica de link).
- **Item ativo:** corrigir adicionando `end` ao `NavLink` do `dashboard-layout` e apontando todos os itens para rotas reais (sem `#` nos menus).
- **Rota malformada:** `path: "/studentAttendance"` → `path: "studentAttendance"` (relativa). É a única alteração de rota.
- **Fórum:** remover **completamente** todas as referências (não comentar). Manter os 3 arquivos em `src/pages/forum/` intactos no disco e excluí-los do `tsconfig` para não quebrarem o build.
- **Erros de build:** corrigir todos para `npm run build` passar.

## Arquitetura

### 1. Helper de navegação — `src/hooks/use-navigation.hook.ts` (novo)

```ts
import { useNavigate } from "react-router"

export function useNavigation() {
  const navigate = useNavigate()
  const handleNavigateTo = (path: string) => navigate(path)
  return { handleNavigateTo }
}
```

Uso em navegação programática (botões/ações), substituindo os `useNavigate` diretos existentes:

- `dashboard-layout.tsx`: logout → `handleNavigateTo(paths.login)`.
- `AvailableMonitorings.tsx`: `handleNavigateTo(paths.studentMonitorings)` (preservando o `{ state }` — ver nota abaixo).

Nota: `AvailableMonitorings` hoje passa `navigate(paths.studentMonitorings, { state: { subjectTitle: title } })`. Para não perder o `state`, `handleNavigateTo` aceitará um 2º parâmetro opcional `options`:

```ts
const handleNavigateTo = (path: string, options?: NavigateOptions) => navigate(path, options)
```

Os menus declarativos (`dashboard-layout`, `public-layout`) **continuam** usando `<NavLink>`.

### 2. `src/routes/paths.ts` alinhado às rotas reais

- Remover completamente as linhas de fórum (`studentForum`, `monitorForum`, o bloco comentado `forumByRole`).
- `studentFrequency`: `/student/frequencies` → **`/student/studentAttendance`**.
- Adicionar `monitorSchedule: "/monitor/monitorSchedule"`.
- Adicionar `adminClassroom: "/admin/classroom"`.
- Manter: `home`, `login`, `register`, `recover`, `designSystem`, `student`, `studentSearch`, `studentMonitorings`, `studentMaterials`, `monitor`, `monitorMaterials`, `monitorSearch`, `admin`.
- Manter `studentMaterial(id)` (base `studentMaterials` + `/{id}` → casa com `materials/:id`).

### 3. Correção da rota

`src/pages/student/routes.tsx`: `path: "/studentAttendance"` → `path: "studentAttendance"`. Remover também os blocos comentados de import/rota de fórum. Idem `src/pages/monitor/routes.tsx` (remover linhas comentadas de fórum).

### 4. Menu — `auth-layout.tsx` `ROLE_NAVS`

| Papel | Itens (→ rota) |
|---|---|
| **student** | Início→`paths.student` · Buscar Disciplina→`paths.studentSearch` · Minhas Monitorias→`paths.studentMonitorings` · Frequência→`paths.studentFrequency` |
| **monitor** | Início→`paths.monitor` · Materiais→`paths.monitorMaterials` · Buscar Disciplina→`paths.monitorSearch` · Meus Horários→`paths.monitorSchedule` |
| **admin** | Dashboard→`paths.admin` · Turmas→`paths.adminClassroom` |

- Fórum removido de todos os papéis.
- Itens sem rota real removidos (monitor "Frequência"; admin "Disciplinas/Monitores/Vincular/Alunos").

### 5. Atalhos (`ShortcutCard`)

- `WelcomeStudent.tsx`: "Minha Frequência" → `paths.studentFrequency`; **remover** o card "Fórum da Monitoria" e o import `MessageSquare` (não usado depois).
- `WelcomeMonitor.tsx`: "Meus Horários" → `paths.monitorSchedule`; **remover** o card "Fórum da Monitoria" e o import `MessageSquare`.
- `WelcomeAdmin.tsx`: cards permanecem com `to="#"` (features não implementadas; inertes — o fix do `end` evita que fiquem "ativos"). Sem alteração.

### 6. Fórum — remoção total de referências, arquivos mantidos

- Remover referências em: `paths.ts`, `auth-layout.tsx`, `WelcomeStudent.tsx`, `WelcomeMonitor.tsx`, `student/routes.tsx`, `monitor/routes.tsx`, e o `<NavLink>` rotulado "Forum" em `DesignSystem.tsx` (linha ~170).
- **Manter** intactos: `src/pages/forum/ForumList.tsx`, `ForumTopic.tsx`, `forum.mock.ts`.
- `tsconfig.app.json`: adicionar `"exclude": ["src/pages/forum"]` para que os arquivos não sejam typechecados/quebrem o build. (Ao implementar o fórum no futuro: remover a exclusão e religar as referências.)

### 7. Correções de build não-navegação

- **`date-fns` + `react-day-picker`:** instalar (`pnpm add date-fns react-day-picker`). Necessários por `DatePicker.tsx`/`calendar.tsx`. Tipar parâmetros `any` remanescentes (ex.: `date` em `onSelect`, binding elements em `calendar.tsx`).
- **3 modais admin:** adicionar `id` ao `<FormModal>`: `EditSubjectFormModal` → `id="edit-subject-form"`; `EditMonitorFormModal` → `id="edit-monitor-form"`; `EditClassroomFormModal` → `id="edit-classroom-form"`.
- **Casing:** `admin/routes.tsx` import `./pages/adminStudents` → `./pages/AdminStudents`.
- **Var não usada:** `StudentAttendance.tsx` — remover `setAttendances` (usar `const [attendances] = useState(...)`).

## Componentes alterados (resumo)

| Arquivo | Mudança |
|---|---|
| `src/hooks/use-navigation.hook.ts` | **Novo** — `handleNavigateTo` |
| `src/routes/paths.ts` | Alinhar paths; remover fórum |
| `src/pages/student/routes.tsx` | Corrigir `studentAttendance`; remover fórum comentado |
| `src/pages/monitor/routes.tsx` | Remover fórum comentado |
| `src/components/layout/auth-layout.tsx` | `ROLE_NAVS` reais; remover fórum |
| `src/components/layout/dashboard-layout.tsx` | `end` no `NavLink`; `handleNavigateTo` no logout |
| `src/pages/student/WelcomeStudent.tsx` | Frequência real; remover card+import fórum |
| `src/pages/monitor/WelcomeMonitor.tsx` | Horários real; remover card+import fórum |
| `src/pages/student/pages/availableMonitoring/AvailableMonitorings.tsx` | `handleNavigateTo` com `state` |
| `src/pages/DesignSystem.tsx` | Remover NavLink "Forum" |
| `tsconfig.app.json` | `exclude: ["src/pages/forum"]` |
| `src/pages/admin/components/Edit{Subject,Monitor,Classroom}FormModal.tsx` | `id` no `FormModal` |
| `src/pages/admin/routes.tsx` | Casing `AdminStudents` |
| `src/pages/student/StudentAttendance.tsx` | Remover `setAttendances` |
| `src/components/shared/DatePicker.tsx`, `src/components/ui/calendar.tsx` | Tipar `any` (após instalar deps) |
| `package.json` | `date-fns`, `react-day-picker` |

## Verificação

1. `npm run build` (`tsc -b && vite build`) → **sem erros**.
2. `npm run lint` → sem novos warnings.
3. `npm run dev` → login em cada papel e percorrer os menus:
   - **student:** Início, Buscar Disciplina, Minhas Monitorias, Frequência — todos navegam e o item ativo destaca corretamente (e só o item correto).
   - **monitor:** Início, Materiais, Buscar Disciplina, Meus Horários.
   - **admin:** Dashboard, Turmas.
   - Logout volta para `/login`.
   - Nenhuma referência a fórum visível.

## Fora de escopo

- Implementar o fórum (arquivos ficam parados, excluídos do build).
- Criar novas rotas/telas para features sem rota (admin Disciplinas/Monitores/Vincular; monitor Frequência).
- Refatorações não relacionadas à navegação.
