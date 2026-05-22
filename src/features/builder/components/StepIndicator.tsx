import { STEPS } from '../index'

type Props = {
  currentStep: number
}

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 text-sm ${i === currentStep ? 'text-[#3B6D11]' : i < currentStep ? 'text-gray-400' : 'text-gray-300'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border
              ${i === currentStep ? 'bg-[#3B6D11] text-white border-[#3B6D11]' : i < currentStep ? 'bg-gray-100 border-gray-300 text-gray-400' : 'bg-white border-gray-200 text-gray-300'}`}>
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span className="hidden sm:inline">{step.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 h-px ${i < currentStep ? 'bg-gray-300' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}