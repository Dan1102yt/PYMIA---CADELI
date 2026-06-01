import { useState, useRef } from 'react'
import { Lock, Smartphone, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react'

export default function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const codeRef = useRef(null)

  const handleCodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(val)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password || code.length !== 6) return
    setError(null)
    setLoading(true)
    setTimeout(() => {
      const ok = onLogin(password, code)
      if (!ok) {
        setError('Contraseña o código incorrecto. Verifica Google Authenticator.')
        setCode('')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-cadeli-blue flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg mb-4">
            <div className="flex flex-col items-center leading-none">
              <span className="text-[15px] font-black text-cadeli-blue tracking-tighter">CAD</span>
              <span className="text-[15px] font-black text-cadeli-blue tracking-tighter">ELI</span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">CADELI</h1>
          <p className="text-blue-200 text-sm mt-1">Panel de Control — Acceso restringido</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-5">

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Contraseña */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  className="w-full pl-9 pr-10 py-3 border border-cadeli-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cadeli-blue bg-cadeli-gray placeholder:text-gray-400"
                  autoFocus
                  onKeyDown={(e) => { if (e.key === 'Enter') codeRef.current?.focus() }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Código TOTP */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Código Google Authenticator
              </label>
              <div className="relative">
                <Smartphone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={codeRef}
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="000 000"
                  className="w-full pl-9 py-3 border border-cadeli-border rounded-xl text-sm tracking-[0.3em] font-mono focus:outline-none focus:ring-2 focus:ring-cadeli-blue bg-cadeli-gray placeholder:text-gray-300 placeholder:tracking-normal"
                  maxLength={6}
                />
                {code.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-gray-400">
                    {code.length}/6
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                <Smartphone size={11} />
                Abre Google Authenticator y escribe el código de 6 dígitos
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={!password || code.length !== 6 || loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? 'Verificando...' : 'Ingresar al Panel'}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400">
            Acceso restringido · Solo personal autorizado
          </p>
        </div>
      </div>
    </div>
  )
}
