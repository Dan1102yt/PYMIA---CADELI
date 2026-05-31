import { useState } from 'react'
import Layout from './components/layout/Layout'
import FinancialDashboard from './components/financial/FinancialDashboard'
import MaintenanceDashboard from './components/maintenance/MaintenanceDashboard'
import AIAssistant from './components/assistant/AIAssistant'

const SECTIONS = {
  financiero: FinancialDashboard,
  mantenimiento: MaintenanceDashboard,
  asistente: AIAssistant,
}

export default function App() {
  const [current, setCurrent] = useState('financiero')
  const Section = SECTIONS[current]

  return (
    <Layout current={current} onChange={setCurrent}>
      <Section />
    </Layout>
  )
}
