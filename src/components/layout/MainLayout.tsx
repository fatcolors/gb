import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function MainLayout() {
  return (
    <div className="bg-brand-25 flex gap-4 p-4 h-screen rounded-3xl shadow-container overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col gap-6 overflow-y-auto pt-2 pb-4">
        <Outlet />
      </main>
    </div>
  )
}
