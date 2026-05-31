import { Calendar, Clock, ChevronRight, Bell } from 'lucide-react'
import StatusBadge from './StatusBadge'

export default function MachineCard({ machine, onClick }) {
  const isAlert = machine.diasRestantes <= 7
  const isUrgent = machine.diasRestantes <= 3

  return (
    <button
      onClick={() => onClick(machine)}
      className={`card p-4 text-left w-full hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 ${
        isUrgent ? 'ring-2 ring-rose-400' : isAlert ? 'ring-2 ring-amber-400' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{machine.imagenIcon}</span>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">{machine.nombre}</p>
            <p className="text-xs text-gray-400 mt-0.5">{machine.modelo}</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <StatusBadge status={machine.estado} />
        {isAlert && (
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            isUrgent ? 'bg-rose-100 text-rose-700 animate-pulse-soft' : 'bg-amber-100 text-amber-700'
          }`}>
            <Bell size={10} />
            {machine.diasRestantes}d
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} className="flex-shrink-0" />
          <span>Próximo: <span className="font-semibold text-gray-700">{machine.proximoMantenimiento}</span></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={12} className="flex-shrink-0" />
          <span>{machine.horasOperacion.toLocaleString('es-CO')} horas operación</span>
        </div>
      </div>

      {/* Barra de progreso hasta el próximo mantenimiento */}
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Días restantes</span>
          <span className={`font-semibold ${isUrgent ? 'text-rose-600' : isAlert ? 'text-amber-600' : 'text-emerald-600'}`}>
            {machine.diasRestantes} días
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isUrgent ? 'bg-rose-400' : isAlert ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
            style={{ width: `${Math.min(100, Math.max(5, (machine.diasRestantes / 30) * 100))}%` }}
          />
        </div>
      </div>
    </button>
  )
}
