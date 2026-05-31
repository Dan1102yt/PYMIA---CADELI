import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

export default function Layout({ current, onChange, children }) {
  return (
    <div className="flex min-h-screen bg-cadeli-gray">
      <Sidebar current={current} onChange={onChange} />
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        {children}
      </main>
      <BottomNav current={current} onChange={onChange} />
    </div>
  )
}
