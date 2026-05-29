import type { ComponentType } from 'react'
import type { StepProps, Step } from '../builder'
import type { TemplateProps } from '../preview'
import StandardTemplate from '../preview/templates/StandardTemplate'
import SimpleTemplate from '../preview/templates/SimpleTemplate'
import BasicInfoStep from '../builder/steps/BasicInfoStep'
import ContactStep from '../builder/steps/ContactStep'
import HistoryStep from '../builder/steps/HistoryStep'
import QualificationStep from '../builder/steps/QualificationStep'
import PRStep from '../builder/steps/PRStep'
import PreferenceStep from '../builder/steps/PreferenceStep'
import SimplePRStep from '../builder/steps/SimplePRStep'

export type Theme = {
  id: string
  label: string
  description: string
  badge?: string
  pages: number
  steps: Step[]
  template: ComponentType<TemplateProps>
}

const standardSteps: Step[] = [
  { id: 'basic', label: '基本情報', component: BasicInfoStep as ComponentType<StepProps> },
  { id: 'contact', label: '連絡先', component: ContactStep as ComponentType<StepProps> },
  { id: 'history', label: '学歴・職歴', component: HistoryStep as ComponentType<StepProps> },
  { id: 'qualification', label: '資格・免許', component: QualificationStep as ComponentType<StepProps> },
  { id: 'pr', label: '志望動機・自己PR', component: PRStep as ComponentType<StepProps> },
  { id: 'preference', label: '本人希望', component: PreferenceStep as ComponentType<StepProps> },
]

const simpleSteps: Step[] = [
  { id: 'basic', label: '基本情報', component: BasicInfoStep as ComponentType<StepProps> },
  { id: 'contact', label: '連絡先', component: ContactStep as ComponentType<StepProps> },
  { id: 'history', label: '学歴・職歴', component: HistoryStep as ComponentType<StepProps> },
  { id: 'qualification', label: '資格・免許', component: QualificationStep as ComponentType<StepProps> },
  { id: 'pr', label: '志望動機・希望', component: SimplePRStep as ComponentType<StepProps> },
]

export const THEMES: Theme[] = [
  {
    id: 'standard',
    label: 'スタンダード',
    description: '転職・就活に対応した標準的な2ページ構成。志望動機・自己PRを詳しく書けます。',
    badge: '定番',
    pages: 2,
    steps: standardSteps,
    template: StandardTemplate,
  },
  {
    id: 'simple',
    label: 'シンプル',
    description: 'アルバイト・パートに最適な1ページ完結の構成。すばやく作成できます。',
    badge: 'コンパクト',
    pages: 1,
    steps: simpleSteps,
    template: SimpleTemplate,
  },
  // ← ここにテーマを追加する
]
