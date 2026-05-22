import type { ComponentType } from 'react'
import BasicInfoStep from './steps/BasicInfoStep'
import ContactStep from './steps/ContactStep'
import HistoryStep from './steps/HistoryStep'
import QualificationStep from './steps/QualificationStep'
import PRStep from './steps/PRStep'
import PreferenceStep from './steps/PreferenceStep'

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

export const STEPS: Step[] = [
  { id: 'basic', label: '基本情報', component: BasicInfoStep as ComponentType<StepProps> },
  { id: 'contact', label: '連絡先', component: ContactStep as ComponentType<StepProps> },
  { id: 'history', label: '学歴・職歴', component: HistoryStep as ComponentType<StepProps> },
  { id: 'qualification', label: '資格・免許', component: QualificationStep as ComponentType<StepProps> },
  { id: 'pr', label: '志望動機・自己PR', component: PRStep as ComponentType<StepProps> },
  { id: 'preference', label: '本人希望', component: PreferenceStep as ComponentType<StepProps> },
  // ← ここに追加するだけ
]