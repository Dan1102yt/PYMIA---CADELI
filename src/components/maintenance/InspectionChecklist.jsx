import { useState } from 'react'
import { CheckSquare, Square, ClipboardList, RotateCcw } from 'lucide-react'

export default function InspectionChecklist({ machine }) {
  const [checked, setChecked] = useState({})

  const toggle = (idx) => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }))
  const reset = () => setChecked({})

  const completedCount = Object.values(checked).filter(Boolean).length
  const total = machine.checklistItems.length
  const progress = total > 0 ? (completedCount / total) * 100 : 0

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList size={18} className="text-cadeli-blue" />
          <h4 className="font-bold text-gray-900 text-sm">Inspección Diaria</h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{completedCount}/{total}</span>
          <button onClick={reset} className="text-gray-300 hover:text-gray-500 transition-colors">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              progress === 100 ? 'bg-emerald-500' : 'bg-cadeli-blue'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-xs text-emerald-600 font-semibold mt-1.5">✓ Inspección completa</p>
        )}
      </div>

      <div className="space-y-2">
        {machine.checklistItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => toggle(idx)}
            className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
              checked[idx] ? 'bg-emerald-50' : 'hover:bg-cadeli-gray'
            }`}
          >
            {checked[idx] ? (
              <CheckSquare size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <Square size={18} className="text-gray-300 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${checked[idx] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {item}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
