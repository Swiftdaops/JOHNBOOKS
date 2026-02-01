import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { api as http } from '../api/httpClient'
import { getBookTitle, getBookAuthor, getCoverImage } from '../api/freebooksApi'

export default function HomeBookCarousel({ limit = 6, interval = 4500 }) {
  const [items, setItems] = React.useState([])
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await http.get(`/api/ebooks/top?limit=${limit}`)
        if (mounted) setItems(res.data || [])
      } catch (e) {
        console.error(e)
      }
    }
    load()
    return () => (mounted = false)
  }, [limit])

  React.useEffect(() => {
    if (paused || items.length <= 1) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
      setLoaded(false)
    }, interval)
    return () => clearInterval(t)
  }, [paused, items, interval])

  if (!items.length) return null

  const current = items[index]
  const cover = getCoverImage(current)
  const title = getBookTitle(current)

  return (
    <section className="relative mx-auto max-w-5xl px-4 light py-10 text-stone-900">
      {/* Glass Card */}
      <div
        className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current._id || index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -60) {
                setIndex((i) => (i + 1) % items.length)
                setLoaded(false)
              }
              if (info.offset.x > 60) {
                setIndex((i) => (i - 1 + items.length) % items.length)
                setLoaded(false)
              }
            }}
            className="relative flex justify-center py-14"
          >
            {/* Book */}
            <div className="group relative flex flex-col items-center">
              <img
                src={cover}
                alt={title}
                onLoad={() => setLoaded(true)}
                className="h-[420px] w-[280px] object-cover rounded-xl shadow-2xl"
              />

              {/* Details panel below image - keep text off the image */}
              {loaded && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mt-4 w-[320px] text-center"
                >
                  <h3 className="text-lg font-semibold  drop-shadow">{title}</h3>
                  <div className="text-sm text-white/80 mt-1">{getBookAuthor(current) || ''}</div>
                  <p className="text-xs text-white/70 mt-2 line-clamp-3">{current.shortDescription || current.description || ''}</p>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <Link
                      to={`/buy/${current._id || current.id}`}
                      className="px-5 py-2 rounded-full font-medium shadow hover:bg-emerald-600 transition"
                    >
                      Buy Now
                    </Link>

                    <button
                      onClick={() => {
                        setIndex((i) => (i - 1 + items.length) % items.length)
                        setLoaded(false)
                      }}
                      aria-label="Previous"
                      className="px-3 py-2 rounded border border-white/20 "
                    >
                      Prev
                    </button>

                    <button
                      onClick={() => {
                        setIndex((i) => (i + 1) % items.length)
                        setLoaded(false)
                      }}
                      aria-label="Next"
                      className="px-3 py-2 rounded border border-white/20 "
                    >
                      Next
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i)
              setLoaded(false)
            }}
            className={`h-2 w-6 rounded-full transition ${
              i === index ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
