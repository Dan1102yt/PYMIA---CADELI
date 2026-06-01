import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Percent } from 'lucide-react'
import MetricCard from './MetricCard'
import RevenueChart from './RevenueChart'
import ExpenseChart from './ExpenseChart'
import ReceiptUploader from './ReceiptUploader'
import ExpenseTable from './ExpenseTable'
import FinancialAlerts from './FinancialAlerts'
import { MONTHLY_DATA, EXPENSE_RECORDS, TOTALS, formatCOP, formatCOPFull } from '../../data/financialData'

const lastMonth = MONTHLY_DATA[MONTHLY_DATA.length - 1]
const prevMonth = MONTHLY_DATA[MONTHLY_DATA.length - 2]
const lastUtility = lastMonth.ingresos - lastMonth.egresos
const prevUtility = prevMonth.ingresos - prevMonth.egresos
const utilityTrend = lastUtility > prevUtility ? 'up' : 'down'
const utilityChange = (((lastUtility - prevUtility) / prevUtility) * 100).toFixed(1)

export default function FinancialDashboard() {
  const [expenseRecords, setExpenseRecords] = useState(EXPENSE_RECORDS)

  const handleNewExpense = (expense) => {
    setExpenseRecords((prev) => [expense, ...prev])
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Financiero</h1>
        <p className="text-sm text-gray-400 mt-1">Acumulado Enero — Junio 2026 · Cifras en COP</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Ingresos Totales"
          value={formatCOP(TOTALS.ingresos)}
          subtitle="Ene — Jun 2026"
          trend="up"
          trendValue={`+${formatCOP(lastMonth.ingresos - prevMonth.ingresos)} vs May`}
          icon={DollarSign}
          color="blue"
        />
        <MetricCard
          title="Egresos Totales"
          value={formatCOP(TOTALS.egresos)}
          subtitle="Ene — Jun 2026"
          trend="up"
          trendValue={`+${formatCOP(lastMonth.egresos - prevMonth.egresos)} vs May`}
          icon={TrendingDown}
          color="purple"
        />
        <MetricCard
          title="Utilidad Neta"
          value={formatCOP(TOTALS.utilidad)}
          subtitle="Ene — Jun 2026"
          trend={utilityTrend}
          trendValue={`${utilityTrend === 'up' ? '+' : ''}${utilityChange}% vs May`}
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Margen Neto"
          value={`${TOTALS.margen}%`}
          subtitle="Sobre ingresos totales"
          trend="up"
          trendValue={`${((lastUtility / lastMonth.ingresos) * 100).toFixed(1)}% en Jun`}
          icon={Percent}
          color="blue"
        />
      </div>

      {/* Tarjetas del mes actual */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Ingreso Jun', value: lastMonth.ingresos, color: 'text-cadeli-blue' },
          { label: 'Egreso Jun', value: lastMonth.egresos, color: 'text-gray-600' },
          { label: 'Utilidad Jun', value: lastUtility, color: 'text-emerald-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card p-4 text-center">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-lg font-black ${color}`}>{formatCOPFull(value)}</p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <ExpenseChart />
      </div>

      {/* Señales de advertencia */}
      <FinancialAlerts />

      {/* Registrar egreso y tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReceiptUploader onNewExpense={handleNewExpense} />
        <div className="lg:col-span-2">
          <ExpenseTable records={expenseRecords} />
        </div>
      </div>
    </div>
  )
}
