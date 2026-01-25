import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAdminStore from '../../store/adminStore'
import { FiMenu, FiX } from 'react-icons/fi'

export default function AdminHeader() {
  const admin = useAdminStore((s) => s.admin)
  const logout = useAdminStore((s) => s.logout)
  const navigate = useNavigate()
  const sidebarOpen = useAdminStore((s) => s.sidebarOpen)
  const toggleSidebar = useAdminStore((s) => s.toggleSidebar)

  const initial = (admin?.username && admin.username[0]?.toUpperCase()) || 'A'

  return (
    <header className="flex items-center justify-between p-3 bg-white/70 backdrop-blur-sm border-b border-orange-100 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-md mr-2 sm:hidden text-orange-600 hover:bg-orange-50"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <span className="inline-block px-2 py-0.5 text-xs bg-orange-50 text-orange-600 rounded">Beta</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
            {initial}
          </div>
          <div className="hidden sm:block text-sm">
            <div className="font-semibold">{admin?.username || 'Admin'}</div>
            <div className="text-xs text-slate-500">Administrator</div>
          </div>
        </div>

        <button
          className="px-3 py-1 rounded-md border border-orange-300 text-orange-600 bg-white hover:bg-orange-50"
          onClick={async () => {
            await logout()
            navigate('/')
          }}
        >
          Logout
        </button>
      </div>
    </header>
  )
}
