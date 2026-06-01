import { BarChart3, Wrench, Bot, LogOut } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'financiero', label: 'Financiero', icon: BarChart3 },
  { id: 'mantenimiento', label: 'Mant.', icon: Wrench },
  { id: 'asistente', label: 'Asistente', icon: Bot },
]

export default function BottomNav({ current, onChange, onLogout }) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-cadeli-border flex z-50 safe-bottom">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex-1 flex flex-col items-center gap-1 py-3 text-[11px] font-semibold transition-colors ${
            current === id
              ? 'text-cadeli-blue'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Icon size={22} />
          <span>{label}</span>
          {current === id && (
            <span className="absolute bottom-0 w-8 h-0.5 bg-cadeli-blue rounded-full" />
          )}
        </button>
      ))}
      <button
        onClick={onLogout}
        className="flex-1 flex flex-col items-center gap-1 py-3 text-[11px] font-semibold text-gray-400 hover:text-red-500 transition-colors"
      >
        <LogOut size={22} />
        <span>Salir</span>
      </button>
    </nav>
  )
}
