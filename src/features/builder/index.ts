import type { ComponentType } from 'react'

export type StepProps = {
  defaultValues?: Record<string, unknown>
  onNext: (data: Record<string, unknown>) => void
  onBack: () => void
}

export type Step = {
  id: string
  label: string
  component: ComponentType<StepProps>
}
