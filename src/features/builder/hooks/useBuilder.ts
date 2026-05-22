import { useState } from 'react'
import { STEPS } from '../index'

export function useBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<Record<string, unknown>>({})

  const isFirst = currentStep === 0
  const isLast = currentStep === STEPS.length - 1

  const next = (stepData: Record<string, unknown>) => {
    setData(prev => ({ ...prev, ...stepData }))
    if (!isLast) setCurrentStep(prev => prev + 1)
  }

  const back = () => {
    if (!isFirst) setCurrentStep(prev => prev - 1)
  }

  return { currentStep, data, next, back, isFirst, isLast }
}