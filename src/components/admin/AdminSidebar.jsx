import React from 'react'
import { NavLink } from 'react-router-dom'
import useAdminStore from '../../store/adminStore'
import { FiX } from 'react-icons/fi'

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-colors duration-150 ${
      isActive
        ? 'bg-orange-500 text-white shadow-md'
        : 'text-slate-700 hover:bg-orange-50 hover:text-orange-600'
    }`

  const sidebarOpen = useAdminStore((s) => s.sidebarOpen)
  const toggleSidebar = useAdminStore((s) => s.toggleSidebar)

  const mobileVisible = sidebarOpen

  return (
    <aside className={`${mobileVisible ? 'fixed inset-0 z-40' : 'hidden sm:block'} sm:relative`}>
      {mobileVisible && <div className="absolute inset-0 bg-black/40" onClick={toggleSidebar} />}

      <div className={`absolute left-0 top-0 h-full w-64 p-4 bg-white/60 backdrop-blur rounded-r-lg shadow-md border-l-4 border-orange-500 sm:relative sm:translate-x-0`}> 
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-orange-500/10 text-orange-600 flex items-center justify-center font-semibold">
              JB
            </div>
            <div>
              <div className="text-sm font-semibold">Admin</div>
              <div className="text-xs text-slate-500">Dashboard</div>
            </div>
          </div>
          <button className="p-2 rounded-md sm:hidden text-slate-600 hover:bg-slate-100" onClick={toggleSidebar} aria-label="Close sidebar">
            <FiX />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" end className={linkClass} onClick={() => sidebarOpen && toggleSidebar()}>
            Overview
          </NavLink>
          <NavLink to="/admin/products" className={linkClass} onClick={() => sidebarOpen && toggleSidebar()}>
            Products
          </NavLink>
        </nav>
      </div>
    </aside>
  )
}
