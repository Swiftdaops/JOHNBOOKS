import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smile } from 'lucide-react'
import { api as http } from '../api/httpClient'
import { getBookTitle, getCoverImage } from '../api/freebooksApi'
import { buildWhatsAppPaymentConfirmationUrl } from '../lib/utils/whatsapp'
import HomeBookCarousel from '../components/Carousel'

export default function BuyPage() {
  const { id } = useParams()
  const [book, setBook] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [notFound, setNotFound] = React.useState(false)
  const [paidAck, setPaidAck] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await http.get(`/api/ebooks/${id}`)
        if (!cancelled) setBook(res.data)
      } catch (err) {
        // If backend returns 404, show user-friendly message
        if (err && err.response && err.response.status === 404) {
          if (!cancelled) setNotFound(true)
        } else {
          console.error('Failed to load book', err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [id])

  const adminAccount = import.meta.env.VITE_ADMIN_ACCOUNT || '0735508259'
  const adminName = import.meta.env.VITE_ADMIN_NAME || 'Admin Name: Anisiobi Gladys'

  const handlePaid = () => {
    const amt = book?.price
      ? typeof book.price === 'object'
        ? book.price.amount ?? book.price.value ?? book.price.price
        : book.price
      : ''
    // Pass empty payer name to avoid including a placeholder name in the message
    const url = buildWhatsAppPaymentConfirmationUrl(book || { title: id }, '', amt)
    window.open(url, '_blank')
    // show immediate acknowledgement UI
    setPaidAck(true)
    setTimeout(() => setPaidAck(false), 4000)
  }

  const title = book ? getBookTitle(book) : 'Book'
  const cover = book ? getCoverImage(book) : null

  const location = useLocation()

  React.useEffect(() => {
    if (location?.state?.scrollToBuy) {
      const tryScroll = () => {
        const el = document.getElementById('buy-card')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          // retry shortly until element is mounted
          setTimeout(tryScroll, 50)
        }
      }
      tryScroll()
    }
  }, [location])

  return (
    <div className="w-full px-0 py-10 space-y-14 light text-stone-950">
      {/* Buy Card */}
      <motion.div
        id="buy-card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-6 sm:p-8 card"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <div className="h-[340px] w-[220px] rounded-xl bg-gray-200 animate-pulse" />
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
            <div className="w-36 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="mt-4 text-sm text-stone-950">Loading book…</div>
          </div>
        ) : notFound ? (
          <div className="text-center p-8 text-stone-950">
            <h3 className="text-lg font-semibold">Book not found</h3>
            <p className="text-sm mt-2">The requested book does not exist or has been removed.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-[240px_1fr]">
            {/* Book */}
            <div className="flex justify-center">
              {cover && (
                <img
                  src={cover}
                  alt={title}
                  className="h-[340px] w-[220px] object-cover rounded-xl shadow-2xl"
                />
              )}
            </div>

            {/* Details */}
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-semibold text-stone-950">
                  Buy: {title}
                </h2>
                <p className="text-sm text-stone-950 mt-1">
                  Complete payment and confirm via WhatsApp
                </p>
              </div>

              {/* Payment Info */}
              <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-4 space-y-3">
                  <div>
                    <div className="text-xs text-stone-950">Account name</div>
                    <div className="font-medium text-stone-950">{adminName}</div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-950">Banking institution</div>
                    <div className="font-medium text-stone-950">{import.meta.env.VITE_ADMIN_BANK || 'Access Bank'}</div>
                  </div>

                  <div>
                    <div className="text-xs text-stone-950">Account number</div>
                    <div className="font-medium text-stone-950">{adminAccount}</div>
                  </div>

                <div>
                  <div className="text-xs text-stone-950">Amount</div>
                  <div className="font-medium text-stone-950">
                    {book?.price
                      ? typeof book.price === 'object'
                        ? book.price.amount ??
                          book.price.value ??
                          book.price.price
                        : book.price
                      : 'Contact admin'}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={handlePaid}
                  className="inline-flex items-center gap-2 rounded-full  hover:bg-emerald-500 px-6 py-3 font-medium text- shadow-lg transition"
                >
                  I have paid
                </button>
              </div>

              {/* Paid acknowledgement */}
              {paidAck && (
                <div className="mt-4">
                  <div className="mx-auto w-full max-w-xs rounded-lg bg-white text-black p-4 shadow-lg flex items-center gap-3 justify-center">
                    <Smile className="h-6 w-6" />
                    <div className="text-sm font-medium">Thank you 😊</div>
                  </div>
                </div>
              )}

              <p className="text-xs text-stone-950 max-w-md">
                After tapping “I have paid”, WhatsApp will open with a prepared
                payment confirmation message to send to the admin.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* More Books */}
      <div>
        <h3 className="mb-6 text-center text-lg font-semibold text-white">
          Discover more books
        </h3>
        <HomeBookCarousel limit={6} />
      </div>
    </div>
  )
}
