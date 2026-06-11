import { getMajors, type Major } from "@/services/major.service"

export type MajorLoaderResult = {
  majors: Major[]
  error: string | null
}

export const majorLoader = async (): Promise<MajorLoaderResult> => {
  try {
    const majors = await getMajors()
    return { majors, error: null }
  } catch (error) {
    console.error(error)
    return { majors: [], error: "Não foi possível carregar os cursos." }
  }
}
