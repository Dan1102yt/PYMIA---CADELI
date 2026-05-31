import { X, MapPin, Clock, Calendar, Info } from 'lucide-react'
import StatusBadge from './StatusBadge'
import InspectionChecklist from './InspectionChecklist'
import MaintenanceHistory from './MaintenanceHistory'

export default function MachineDetail({ machine, onClose, onAddRecord }) {
  const isAlert = machine.diasRestantes <= 7

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white h-screen flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-cadeli-border">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{machine.imagenIcon}</span>
            <div>
              <h2 className="font-black text-gray-900 text-base leading-tight">{machine.nombre}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{machine.modelo}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <StatusBadge status={machine.estado} />
                {isAlert && (
                  <span className="badge-yellow text-xs">
                    ⚠ {machine.diasRestantes} días para mantenimiento
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-cadeli-gray text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Info rápida */}
        <div className="grid grid-cols-3 gap-0 border-b border-cadeli-border">
          {[
            { icon: MapPin, label: 'Ubicación', value: machine.ubicacion },
            { icon: Calendar, label: 'Próximo Mant.', value: machine.proximoMantenimiento },
            { icon: Clock, label: 'Horas Operación', value: machine.horasOperacion.toLocaleString('es-CO') },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-4 border-r last:border-r-0 border-cadeli-border">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={12} className="text-gray-400" />
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-sm font-bold text-gray-800 leading-tight">{value}</p>
            </div>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <InspectionChecklist machine={machine} />
          <MaintenanceHistory machine={machine} onAddRecord={onAddRecord} />
        </div>
      </div>
    </div>
  )
}
