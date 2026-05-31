import { useState } from 'react'
import { Bell, CheckCircle2, Wrench, AlertTriangle } from 'lucide-react'
import { INITIAL_MACHINES } from '../../data/machinesData'
import MachineCard from './MachineCard'
import MachineDetail from './MachineDetail'

export default function MaintenanceDashboard() {
  const [machines, setMachines] = useState(INITIAL_MACHINES)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('todas')

  const alerts = machines.filter((m) => m.diasRestantes <= 7)
  const operative = machines.filter((m) => m.estado === 'operativa').length
  const inMaintenance = machines.filter((m) => m.estado === 'mantenimiento').length

  const filtered = filter === 'todas' ? machines : machines.filter((m) => m.estado === filter || (filter === 'alerta' && m.diasRestantes <= 7))

  const handleAddRecord = (record) => {
    setMachines((prev) =>
      prev.map((m) =>
        m.id === selected.id
          ? { ...m, historial: [record, ...m.historial] }
          : m
      )
    )
    setSelected((prev) =>
      prev ? { ...prev, historial: [record, ...prev.historial] } : prev
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Mantenimiento Preventivo</h1>
        <p className="text-sm text-gray-400 mt-1">10 máquinas · 14 operarios registrados</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Máquinas', value: machines.length, icon: Wrench, color: 'text-cadeli-blue bg-cadeli-blue/10' },
          { label: 'Operativas', value: operative, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'En Mantenimiento', value: inMaintenance, icon: Wrench, color: 'text-rose-600 bg-rose-50' },
          { label: 'Con Alerta (≤7d)', value: alerts.length, icon: Bell, color: 'text-amber-600 bg-amber-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Alertas activas */}
      {alerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={16} className="text-amber-600" />
            <h3 className="font-bold text-amber-800 text-sm">Alertas de Mantenimiento Próximo</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {alerts.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  m.diasRestantes <= 3
                    ? 'bg-rose-100 border-rose-300 text-rose-700 animate-pulse-soft'
                    : 'bg-amber-100 border-amber-300 text-amber-700'
                }`}
              >
                <AlertTriangle size={11} />
                {m.nombre} — {m.diasRestantes}d
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'todas', label: 'Todas' },
          { id: 'operativa', label: 'Operativas' },
          { id: 'mantenimiento', label: 'En Mantenimiento' },
          { id: 'alerta', label: 'Con Alerta' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${
              filter === id
                ? 'bg-cadeli-blue text-white'
                : 'bg-white text-gray-500 border border-cadeli-border hover:border-cadeli-mid'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid de máquinas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onClick={setSelected}
          />
        ))}
      </div>

      {/* Panel de detalle */}
      {selected && (
        <MachineDetail
          machine={selected}
          onClose={() => setSelected(null)}
          onAddRecord={handleAddRecord}
        />
      )}
    </div>
  )
}
