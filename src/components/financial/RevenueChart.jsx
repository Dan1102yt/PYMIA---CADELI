import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Area,
} from 'recharts'
import { MONTHLY_DATA, formatCOP } from '../../data/financialData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-cadeli-border rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-800 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-semibold text-gray-900">{formatCOP(p.value)}</span>
        </div>
      ))}
      {payload.length >= 2 && (
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2">
          <span className="text-gray-500">Utilidad:</span>
          <span className={`font-bold ${payload[0].value - payload[1].value > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {formatCOP(payload[0].value - payload[1].value)}
          </span>
        </div>
      )}
    </div>
  )
}

export default function RevenueChart() {
  const data = MONTHLY_DATA.map((m) => ({
    name: m.month,
    Ingresos: m.ingresos,
    Egresos: m.egresos,
    Utilidad: m.ingresos - m.egresos,
  }))

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Ingresos vs Egresos</h3>
          <p className="text-xs text-gray-400 mt-0.5">Enero — Junio 2026</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-cadeli-blue" />
            Ingresos
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-cadeli-mid" />
            Egresos
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-400" />
            Utilidad
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E4EA" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatCOP(v)}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Ingresos" fill="#1A2B6D" radius={[6, 6, 0, 0]} maxBarSize={36} />
          <Bar dataKey="Egresos" fill="#2E4098" radius={[6, 6, 0, 0]} maxBarSize={36} />
          <Line
            type="monotone"
            dataKey="Utilidad"
            stroke="#10B981"
            strokeWidth={2.5}
            dot={{ fill: '#10B981', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
