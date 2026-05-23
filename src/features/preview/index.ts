import type { ComponentType } from 'react'
import StandardTemplate from './templates/StandardTemplate'
import type { ResumeData } from '../builder/schema'

export type TemplateProps = {
  data: Partial<ResumeData>
}

export type Template = {
  id: string
  label: string
  component: ComponentType<TemplateProps>
}

export const TEMPLATES: Template[] = [
  { id: 'standard', label: 'スタンダード', component: StandardTemplate },
  // ← ここに追加するだけ
]