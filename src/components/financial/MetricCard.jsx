import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function MetricCard({ title, value, subtitle, trend, trendValue, icon: Icon, color = 'blue' }) {
  const colors = {
    blue: 'bg-cadeli-blue text-white',
    green: 'bg-emerald-500 text-white',
    red: 'bg-rose-500 text-white',
    purple: 'bg-violet-500 text-white',
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-gray-400'

  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</span>
          <span className="text-2xl font-black text-gray-900 leading-tight">{value}</span>
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{subtitle}</span>
        {trendValue && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
            <TrendIcon size={12} />
            {trendValue}
          </span>
        )}
      </div>
    </div>
  )
}
