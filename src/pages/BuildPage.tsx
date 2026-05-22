import { STEPS } from '../features/builder'
import { useBuilder } from '../features/builder/hooks/useBuilder'
import StepIndicator from '../features/builder/components/StepIndicator'

export default function BuildPage() {
  const { currentStep, data, next, back, isLast } = useBuilder()
  const CurrentStepComponent = STEPS[currentStep].component

  const handleNext = (stepData: Record<string, unknown>) => {
    if (isLast) {
      console.log('完成データ:', { ...data, ...stepData })
      // TODO: プレビューページへ
    } else {
      next(stepData)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <StepIndicator currentStep={currentStep} />
      <div className="bg-white border border-gray-100 rounded-xl p-8">
        <CurrentStepComponent
          defaultValues={data}
          onNext={handleNext}
          onBack={back}
        />
      </div>
    </div>
  )
}