import { CheckCircle2, AlertTriangle, Wrench } from 'lucide-react'

const STATUS_CONFIG = {
  operativa: {
    label: 'Operativa',
    className: 'badge-green',
    icon: CheckCircle2,
  },
  alerta: {
    label: 'Alerta',
    className: 'badge-yellow',
    icon: AlertTriangle,
  },
  mantenimiento: {
    label: 'En Mantenimiento',
    className: 'badge-red',
    icon: Wrench,
  },
}

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.operativa
  const Icon = config.icon
  return (
    <span className={config.className}>
      <Icon size={11} />
      {config.label}
    </span>
  )
}
