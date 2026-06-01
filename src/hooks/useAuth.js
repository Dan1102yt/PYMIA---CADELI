import { useState } from 'react'
import * as OTPAuth from 'otpauth'

const PASSWORD = 'Cadeli2026!'
const TOTP_SECRET = 'MEZDGNBVGY3TQMBQ'
const SESSION_KEY = 'cadeli_auth'

const totp = new OTPAuth.TOTP({
  issuer: 'CADELI',
  label: 'Panel de Control',
  algorithm: 'SHA1',
  digits: 6,
  period: 30,
  secret: OTPAuth.Secret.fromBase32(TOTP_SECRET),
})

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )

  const login = (password, code) => {
    const validPassword = password === PASSWORD
    const validTotp = totp.validate({ token: code.replace(/\s/g, ''), window: 1 }) !== null
    if (validPassword && validTotp) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthenticated(false)
  }

  return { authenticated, login, logout }
}
