import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { MONTHLY_DATA, EXPENSE_CATEGORIES, formatCOP } from '../../data/financialData'

const RADIAN = Math.PI / 180
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.08) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="bg-white border border-cadeli-border rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-800">{item.name}</p>
      <p className="text-gray-500 mt-1">{formatCOP(item.value)}</p>
    </div>
  )
}

export default function ExpenseChart({ selectedMonth = null }) {
  const source = selectedMonth !== null ? [MONTHLY_DATA[selectedMonth]] : MONTHLY_DATA

  const totals = EXPENSE_CATEGORIES.map(({ key, label, color }) => ({
    name: label,
    value: source.reduce((s, m) => s + (m[key] || 0), 0),
    color,
  }))

  return (
    <div className="card p-5">
      <div className="mb-5">
        <h3 className="font-bold text-gray-900 text-base">Distribución de Egresos</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {selectedMonth !== null
            ? `Solo ${['Enero','Febrero','Marzo','Abril','Mayo','Junio'][selectedMonth]}`
            : 'Acumulado Ene — Jun 2026'}
        </p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={totals}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {totals.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-2">
        {totals.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-gray-500 flex-1">{item.name}</span>
            <span className="font-semibold text-gray-800">{formatCOP(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
