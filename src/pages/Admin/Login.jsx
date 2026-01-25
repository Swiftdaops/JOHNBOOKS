import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import useAdminStore from '../../store/adminStore'
import { motion } from 'framer-motion'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const login = useAdminStore((s) => s.login)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin'

  const onSubmit = async (vals) => {
    setError('')
    const ok = await login(vals.username, vals.password)
    if (ok) return navigate(from, { replace: true })
    setError('Invalid username or password')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-orange-600 grid place-items-center text-white font-bold">J</div>
          <div>
            <h2 className="text-2xl font-semibold">Admin Sign In</h2>
            <p className="text-sm text-slate-500">Secure admin area — enter your credentials</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

          <label className="block text-sm text-slate-700">Username</label>
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-orange-200 outline-none"
            placeholder="admin username"
            {...register('username', { required: true })}
          />

          <label className="block text-sm text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="password"
              {...register('password', { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">Keep me signed in</div>
            <button className="px-4 py-2 rounded-md bg-orange-600 text-white font-medium">Sign In</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
