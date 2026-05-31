import { useState } from 'react'
import { Plus, Calendar, User, Clock, FileText, Wrench, AlertTriangle } from 'lucide-react'
import { OPERATORS } from '../../data/operatorsData'

const TYPE_CONFIG = {
  Preventivo: { className: 'badge-green', icon: Wrench },
  Correctivo: { className: 'badge-red', icon: AlertTriangle },
}

export default function MaintenanceHistory({ machine, onAddRecord }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    tipo: 'Preventivo',
    responsableId: 7,
    duracion: '',
    observaciones: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const operator = OPERATORS.find((o) => o.id === Number(form.responsableId))
    onAddRecord({
      id: `h${Date.now()}`,
      fecha: new Date().toISOString().split('T')[0],
      tipo: form.tipo,
      responsable: operator?.name || '',
      responsableId: Number(form.responsableId),
      duracion: form.duracion,
      observaciones: form.observaciones,
    })
    setShowForm(false)
    setForm({ tipo: 'Preventivo', responsableId: 7, duracion: '', observaciones: '' })
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-cadeli-blue" />
          <h4 className="font-bold text-gray-900 text-sm">Historial de Mantenimientos</h4>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"
        >
          <Plus size={14} />
          Registrar
        </button>
      </div>

      {/* Formulario de nuevo registro */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-cadeli-gray rounded-xl space-y-3 border border-cadeli-border">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Nuevo Registro</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
                className="w-full text-sm border border-cadeli-border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-cadeli-blue"
              >
                <option>Preventivo</option>
                <option>Correctivo</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Responsable</label>
              <select
                value={form.responsableId}
                onChange={(e) => setForm((f) => ({ ...f, responsableId: e.target.value }))}
                className="w-full text-sm border border-cadeli-border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-cadeli-blue"
              >
                {OPERATORS.map((op) => (
                  <option key={op.id} value={op.id}>{op.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Duración</label>
            <input
              value={form.duracion}
              onChange={(e) => setForm((f) => ({ ...f, duracion: e.target.value }))}
              placeholder="Ej: 3 horas"
              className="w-full text-sm border border-cadeli-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cadeli-blue"
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Observaciones</label>
            <textarea
              value={form.observaciones}
              onChange={(e) => setForm((f) => ({ ...f, observaciones: e.target.value }))}
              rows={3}
              placeholder="Describe el trabajo realizado..."
              className="w-full text-sm border border-cadeli-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cadeli-blue resize-none"
              required
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1 text-sm">Guardar</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1 text-sm">Cancelar</button>
          </div>
        </form>
      )}

      {/* Lista de registros */}
      <div className="space-y-3">
        {machine.historial.map((record) => {
          const config = TYPE_CONFIG[record.tipo] || TYPE_CONFIG.Preventivo
          const Icon = config.icon
          return (
            <div key={record.id} className="p-3.5 bg-cadeli-gray rounded-xl border border-cadeli-border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={config.className}>
                    <Icon size={11} />
                    {record.tipo}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={11} />
                  {record.fecha}
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <User size={11} />
                  <span className="font-medium text-gray-700">{record.responsable}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={11} />
                  {record.duracion}
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{record.observaciones}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
