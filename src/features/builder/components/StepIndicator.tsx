import type { Step } from '../index'

type Props = {
  currentStep: number
  steps: Step[]
}

export default function StepIndicator({ currentStep, steps }: Props) {
  return (
    <div className="mb-6 sm:mb-8">
      {/* モバイル: コンパクト表示 */}
      <div className="flex sm:hidden items-center gap-3 mb-2">
        <div className="flex items-center gap-1.5">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`rounded-full transition-all ${
                i === currentStep
                  ? 'w-6 h-2 bg-[#3B6D11]'
                  : i < currentStep
                  ? 'w-2 h-2 bg-[#3B6D11] opacity-40'
                  : 'w-2 h-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">
          <span className="font-medium text-gray-700">{currentStep + 1}</span> / {steps.length}
          <span className="ml-1.5 text-gray-600">{steps[currentStep].label}</span>
        </span>
      </div>

      {/* デスクトップ: フル表示 */}
      <div className="hidden sm:flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 text-sm ${i === currentStep ? 'text-[#3B6D11]' : i < currentStep ? 'text-gray-400' : 'text-gray-300'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border
                ${i === currentStep ? 'bg-[#3B6D11] text-white border-[#3B6D11]' : i < currentStep ? 'bg-gray-100 border-gray-300 text-gray-400' : 'bg-white border-gray-200 text-gray-300'}`}>
                {i < currentStep ? '✓' : i + 1}
              </div>
              <span>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-px ${i < currentStep ? 'bg-gray-300' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
