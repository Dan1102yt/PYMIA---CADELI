import { useState } from 'react'
import Layout from './components/layout/Layout'
import FinancialDashboard from './components/financial/FinancialDashboard'
import MaintenanceDashboard from './components/maintenance/MaintenanceDashboard'
import AIAssistant from './components/assistant/AIAssistant'
import LoginScreen from './components/auth/LoginScreen'
import { useAuth } from './hooks/useAuth'

const SECTIONS = {
  financiero: FinancialDashboard,
  mantenimiento: MaintenanceDashboard,
  asistente: AIAssistant,
}

export default function App() {
  const [current, setCurrent] = useState('financiero')
  const { authenticated, login, logout } = useAuth()
  const Section = SECTIONS[current]

  if (!authenticated) {
    return <LoginScreen onLogin={login} />
  }

  return (
    <Layout current={current} onChange={setCurrent} onLogout={logout}>
      <Section />
    </Layout>
  )
}
