import type { ComponentType } from 'react'

export type StepProps = {
  defaultValues?: Record<string, unknown>
  onNext: (data: Record<string, unknown>) => void
  onBack: () => void
}

export const STEPS: { id: string; label: string; component: ComponentType<StepProps> }[] = [
  {
    id: 'basic',
    label: '基本情報',
    component: (await import('./steps/BasicInfoStep')).default,
  },
  {
    id: 'contact',
    label: '連絡先',
    component: (await import('./steps/ContactStep')).default,
  },
]