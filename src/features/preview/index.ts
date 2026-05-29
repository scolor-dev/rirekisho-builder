import type { ComponentType } from 'react'
import type { ResumeData } from '../builder/schema'

export type TemplateProps = {
  data: Partial<ResumeData>
}

export type Template = {
  id: string
  label: string
  component: ComponentType<TemplateProps>
}
