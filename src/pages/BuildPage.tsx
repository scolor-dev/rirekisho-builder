import { useNavigate } from 'react-router-dom'
import { useBuilder } from '../features/builder/hooks/useBuilder'
import StepIndicator from '../features/builder/components/StepIndicator'
import ThemeSelectStep from '../features/builder/steps/ThemeSelectStep'

export default function BuildPage() {
  const { theme, selectTheme, currentStep, data, next, back, isLast } = useBuilder()
  const navigate = useNavigate()

  if (!theme) {
    return (
      <div className="max-w-xl mx-auto py-2 sm:py-8">
        <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-8">
          <ThemeSelectStep onSelect={selectTheme} />
        </div>
      </div>
    )
  }

  const CurrentStepComponent = theme.steps[currentStep].component

  const handleNext = (stepData: Record<string, unknown>) => {
    if (isLast) {
      navigate('/preview', { state: { data: { ...data, ...stepData }, themeId: theme.id } })
    } else {
      next(stepData)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-2 sm:py-8">
      <StepIndicator currentStep={currentStep} steps={theme.steps} />
      <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-8">
        <CurrentStepComponent
          defaultValues={data}
          onNext={handleNext}
          onBack={back}
        />
      </div>
    </div>
  )
}
