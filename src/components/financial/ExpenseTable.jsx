import { formatCOPFull } from '../../data/financialData'
import { Receipt } from 'lucide-react'

const CATEGORY_COLORS = {
  'Materia Prima': 'badge-blue',
  'Energía': 'badge-yellow',
  'Nómina': 'badge-green',
  'Mantenimiento': 'badge-red',
  'Arriendo': 'badge-blue',
  'Otros Gastos': 'badge-blue',
}

export default function ExpenseTable({ records }) {
  if (!records.length) {
    return (
      <div className="card p-8 flex flex-col items-center gap-3 text-gray-300">
        <Receipt size={32} />
        <p className="text-sm font-medium">No hay egresos registrados</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-5 border-b border-cadeli-border">
        <h3 className="font-bold text-gray-900 text-base">Últimos Egresos Registrados</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cadeli-gray">
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Fecha</th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Descripción</th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Proveedor</th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Categoría</th>
              <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cadeli-border">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-cadeli-gray/50 transition-colors">
                <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{r.fecha}</td>
                <td className="px-5 py-3.5 font-medium text-gray-800">{r.descripcion}</td>
                <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{r.proveedor}</td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className={CATEGORY_COLORS[r.categoria] || 'badge-blue'}>{r.categoria}</span>
                </td>
                <td className="px-5 py-3.5 text-right font-bold text-gray-900 whitespace-nowrap">
                  {formatCOPFull(r.monto)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
