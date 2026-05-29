import { useState } from 'react'
import type { Theme } from '../../themes'
import { loadProfile, saveProfile } from '../profile'

export function useBuilder() {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<Record<string, unknown>>(() => loadProfile() ?? {})

  const steps = theme?.steps ?? []
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const next = (stepData: Record<string, unknown>) => {
    const merged = { ...data, ...stepData }
    setData(merged)
    saveProfile(merged)
    if (!isLast) setCurrentStep(prev => prev + 1)
  }

  const back = () => {
    if (!isFirst) setCurrentStep(prev => prev - 1)
  }

  const selectTheme = (t: Theme) => {
    setTheme(t)
    setCurrentStep(0)
  }

  return { theme, selectTheme, currentStep, data, next, back, isFirst, isLast }
}
