import { AlertTriangle, TrendingDown, TrendingUp, Info, CheckCircle } from 'lucide-react'
import { MONTHLY_DATA, TOTALS, formatCOP } from '../../data/financialData'

const first = MONTHLY_DATA[0]
const last = MONTHLY_DATA[MONTHLY_DATA.length - 1]

const LEVEL_STYLES = {
  danger: {
    card: 'bg-red-50 border-red-200',
    icon: 'text-red-500 bg-red-100',
    title: 'text-red-800',
    detail: 'text-red-600',
    tag: 'bg-red-100 text-red-700',
    dot: 'bg-red-400',
  },
  warning: {
    card: 'bg-amber-50 border-amber-200',
    icon: 'text-amber-600 bg-amber-100',
    title: 'text-amber-800',
    detail: 'text-amber-700',
    tag: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-400',
  },
  info: {
    card: 'bg-blue-50 border-blue-200',
    icon: 'text-cadeli-blue bg-blue-100',
    title: 'text-cadeli-blue',
    detail: 'text-blue-700',
    tag: 'bg-blue-100 text-cadeli-blue',
    dot: 'bg-blue-400',
  },
  ok: {
    card: 'bg-emerald-50 border-emerald-200',
    icon: 'text-emerald-600 bg-emerald-100',
    title: 'text-emerald-800',
    detail: 'text-emerald-700',
    tag: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-400',
  },
}

function computeAlerts() {
  const alerts = []

  // 1. Concentración de ingresos en una sola línea
  const cauchosPct = (MONTHLY_DATA.reduce((s, m) => s + m.cauchosMoldeados, 0) / TOTALS.ingresos) * 100
  alerts.push({
    level: cauchosPct >= 45 ? 'danger' : 'warning',
    icon: AlertTriangle,
    title: 'Alta concentración de ingresos',
    detail: `Cauchos Moldeados representa el ${cauchosPct.toFixed(1)}% del total. Dependencia elevada de una sola línea de negocio.`,
    tag: `${cauchosPct.toFixed(0)}% en una línea`,
  })

  // 2. Caída pronunciada en Abril
  const aprDrop = ((MONTHLY_DATA[3].ingresos - MONTHLY_DATA[2].ingresos) / MONTHLY_DATA[2].ingresos) * 100
  if (aprDrop < -10) {
    alerts.push({
      level: 'warning',
      icon: TrendingDown,
      title: 'Caída estacional en Abril',
      detail: `Los ingresos cayeron ${Math.abs(aprDrop).toFixed(1)}% respecto a Marzo. Posible estacionalidad o pérdida puntual de pedidos.`,
      tag: `−${Math.abs(aprDrop).toFixed(1)}% vs Marzo`,
    })
  }

  // 3. Materia prima como % de egresos — presión al alza
  const mpFirst = (first.materiaPrima / first.egresos) * 100
  const mpLast = (last.materiaPrima / last.egresos) * 100
  const mpDelta = mpLast - mpFirst
  alerts.push({
    level: mpDelta > 2 ? 'warning' : 'info',
    icon: mpDelta > 0 ? AlertTriangle : Info,
    title: 'Presión en materia prima',
    detail: `El peso de la materia prima en egresos subió de ${mpFirst.toFixed(1)}% (Ene) a ${mpLast.toFixed(1)}% (Jun). Vigilar negociación con proveedores.`,
    tag: `+${mpDelta.toFixed(1)} pp en el semestre`,
  })

  // 4. Ratio egresos/ingresos — eficiencia operacional
  const ratioFirst = (first.egresos / first.ingresos) * 100
  const ratioLast = (last.egresos / last.ingresos) * 100
  alerts.push({
    level: ratioLast < 83 ? 'ok' : 'info',
    icon: ratioLast < ratioFirst ? CheckCircle : AlertTriangle,
    title: 'Eficiencia operacional',
    detail: `Ratio egresos/ingresos pasó de ${ratioFirst.toFixed(1)}% (Ene) a ${ratioLast.toFixed(1)}% (Jun). El margen se está ampliando progresivamente.`,
    tag: `${ratioLast.toFixed(1)}% ratio en Junio`,
  })

  // 5. Crecimiento de nómina en el semestre
  const nominaGrowth = ((last.nomina - first.nomina) / first.nomina) * 100
  alerts.push({
    level: nominaGrowth > 15 ? 'warning' : 'info',
    icon: Info,
    title: 'Crecimiento de nómina',
    detail: `La nómina creció ${nominaGrowth.toFixed(1)}% en el semestre (${formatCOP(first.nomina)} → ${formatCOP(last.nomina)}). Verificar alineación con productividad.`,
    tag: `+${nominaGrowth.toFixed(1)}% semestral`,
  })

  // 6. Recuperación sostenida últimos 3 meses
  const lastThree = MONTHLY_DATA.slice(3)
  const recovering = lastThree.every((m, i, arr) => i === 0 || m.ingresos > arr[i - 1].ingresos)
  if (recovering) {
    alerts.push({
      level: 'ok',
      icon: TrendingUp,
      title: 'Recuperación sostenida',
      detail: `Ingresos en crecimiento 3 meses consecutivos (Abr → May → Jun). Señal positiva tras la caída de Abril.`,
      tag: '3 meses al alza',
    })
  }

  return alerts
}

const ALERTS = computeAlerts()

const LEGEND = [
  { label: 'Crítico', dot: 'bg-red-400' },
  { label: 'Alerta', dot: 'bg-amber-400' },
  { label: 'Info', dot: 'bg-blue-400' },
  { label: 'Positivo', dot: 'bg-emerald-400' },
]

export default function FinancialAlerts() {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Señales de Advertencia</h3>
          <p className="text-xs text-gray-400 mt-0.5">Indicadores calculados · Ene — Jun 2026</p>
        </div>
        <div className="flex items-center gap-3">
          {LEGEND.map(({ label, dot }) => (
            <span key={label} className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {ALERTS.map((alert, i) => {
          const s = LEVEL_STYLES[alert.level]
          const Icon = alert.icon
          return (
            <div key={i} className={`rounded-xl border p-4 ${s.card}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${s.icon}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold leading-tight ${s.title}`}>{alert.title}</p>
                  <p className={`text-xs mt-1.5 leading-relaxed ${s.detail}`}>{alert.detail}</p>
                  <span className={`inline-block mt-2.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${s.tag}`}>
                    {alert.tag}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
