import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { api as http } from '../../api/httpClient'
import Modal from '../../components/ui/modal'

export default function Dashboard() {
  const [top, setTop] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    loadTop()
  }, [])

  const loadTop = async () => {
    try {
      setLoading(true)
      const { data } = await http.get('/api/ebooks/top?limit=6')
      setTop(data)
    } catch (err) {
      console.error('Failed to load top liked ebooks', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" bg-slate-50">
      <AdminHeader />
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
        <AdminSidebar />
        <main className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 p-6 rounded-xl bg-white shadow-sm border border-orange-50">
              <h3 className="text-sm text-slate-500">Total Books</h3>
              <div className="text-3xl font-bold">—</div>
              <p className="mt-2 text-sm text-slate-500">Quick overview and stats will appear here.</p>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Top Liked Books</h2>
                <button className="text-sm text-orange-600" onClick={loadTop}>
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading && <div>Loading...</div>}
                {!loading && top.length === 0 && <div className="text-sm text-slate-500">No likes yet.</div>}
                {top.map((b) => (
                  <div key={b._id} className="bg-white rounded-lg shadow p-3 border">
                    <div className="flex gap-3">
                      <img src={b.coverImage?.url} alt="cover" className="w-20 h-28 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{b.title}</div>
                        <div className="text-xs text-slate-500">{b.author}</div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-sm text-orange-600 font-semibold">♥ {b.likes || 0}</div>
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 text-sm rounded bg-orange-50 text-orange-600 border border-orange-100"
                              onClick={() => setSelected(b)}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title || 'Book'}>
        {selected && (
          <div className="flex gap-4">
            <img src={selected.coverImage?.url} alt="cover" className="w-28 h-40 object-cover rounded" />
            <div>
              <h3 className="text-lg font-semibold">{selected.title}</h3>
              <p className="text-sm text-slate-600">By {selected.author}</p>
              <p className="mt-2 text-sm text-slate-700">{selected.description}</p>
              <div className="mt-4">
                <div className="text-sm text-orange-600 font-semibold">Likes: {selected.likes || 0}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
