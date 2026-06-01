import { BarChart3, Wrench, Bot, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { useState } from 'react'
import CadeliLogo from './CadeliLogo'

const NAV_ITEMS = [
  { id: 'financiero', label: 'Financiero', icon: BarChart3 },
  { id: 'mantenimiento', label: 'Mantenimiento', icon: Wrench },
  { id: 'asistente', label: 'Asistente IA', icon: Bot },
]

export default function Sidebar({ current, onChange, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`hidden md:flex flex-col bg-cadeli-blue min-h-screen transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-blue-700/40">
        <CadeliLogo collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex-shrink-0 p-1.5 rounded-lg text-blue-200 hover:bg-blue-700/40 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {!collapsed && (
          <p className="text-blue-300/60 text-[10px] font-semibold uppercase tracking-widest px-3 py-2">
            Módulos
          </p>
        )}
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
              current === id
                ? 'bg-white text-cadeli-blue shadow-sm'
                : 'text-blue-100 hover:bg-blue-700/40 hover:text-white'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon size={20} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className={`px-4 py-4 border-t border-blue-700/40 space-y-3 ${collapsed ? 'text-center' : ''}`}>
        {!collapsed && (
          <div className="text-blue-300/60 text-[10px] font-medium leading-relaxed">
            Panel de Control<br />v1.0 · 2026
          </div>
        )}
        <button
          onClick={onLogout}
          title="Cerrar sesión"
          className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-blue-200 hover:bg-blue-700/40 hover:text-white transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}
