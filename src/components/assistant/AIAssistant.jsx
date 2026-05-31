import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, AlertCircle, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MONTHLY_DATA, TOTALS, formatCOPFull } from '../../data/financialData'
import { INITIAL_MACHINES } from '../../data/machinesData'
import { OPERATORS } from '../../data/operatorsData'

const WORKER_URL = import.meta.env.VITE_WORKER_URL

const buildSystemPrompt = () => {
  const financialSummary = MONTHLY_DATA.map(
    (m) =>
      `- ${m.month} 2026: Ingresos ${formatCOPFull(m.ingresos)}, Egresos ${formatCOPFull(m.egresos)}, Utilidad ${formatCOPFull(m.ingresos - m.egresos)}`
  ).join('\n')

  const machineSummary = INITIAL_MACHINES.map(
    (m) =>
      `- ${m.nombre} (${m.id}): Estado ${m.estado}, próximo mantenimiento ${m.proximoMantenimiento} (${m.diasRestantes} días)`
  ).join('\n')

  const alertMachines = INITIAL_MACHINES.filter((m) => m.diasRestantes <= 7)
    .map((m) => `${m.nombre} (${m.diasRestantes} días)`)
    .join(', ')

  return `Eres el asistente inteligente de CADELI — Cauchos y Derivados S.A.S., una empresa colombiana productora de cauchos mediante procesos de moldeado y vulcanizado, ubicada en Colombia.

Responde SIEMPRE en español colombiano, de manera profesional pero cercana y amigable. Usa el tuteo si el contexto lo permite.

## DATOS FINANCIEROS ACTUALES (Acumulado 2026)
- Ingresos totales: ${formatCOPFull(TOTALS.ingresos)}
- Egresos totales: ${formatCOPFull(TOTALS.egresos)}
- Utilidad neta: ${formatCOPFull(TOTALS.utilidad)}
- Margen neto: ${TOTALS.margen}%

### Detalle mensual (Ene–Jun 2026):
${financialSummary}

### Líneas de negocio:
- Cauchos moldeados (45% de ingresos)
- Perfiles vulcanizados (30%)
- Sellos y empaques industriales (15%)
- Servicios y otros (10%)

### Principales categorías de gasto:
- Materia prima (caucho natural, negro de humo, azufre): ~35%
- Nómina y prestaciones: ~28%
- Energía eléctrica industrial: ~12%
- Mantenimiento de equipos: ~7%
- Arriendo planta: ~5%
- Otros gastos operativos: ~13%

## ESTADO DE MÁQUINAS
${machineSummary}

${alertMachines ? `### ⚠ ALERTAS ACTIVAS: ${alertMachines}` : ''}

## EQUIPO HUMANO
14 operarios: ${OPERATORS.map((o) => o.name).join(', ')}

## TU ROL
Puedes ayudar con:
- Análisis financiero y comparativas
- Estado del mantenimiento de máquinas
- Recomendaciones de producción
- Cálculos de costos y márgenes
- Consultas sobre los operarios
- Preguntas generales sobre la industria del caucho

Cuando presentes cifras, usa el formato de pesos colombianos (COP). Usa Markdown para estructurar bien tus respuestas.`
}

const WELCOME = {
  role: 'assistant',
  content: `¡Hola! Soy el asistente de **CADELI** 🏭

Tengo acceso a los datos financieros del primer semestre de 2026 y al estado actual de las 10 máquinas de producción.

¿En qué te puedo ayudar hoy? Por ejemplo:
- *¿Cuál fue la utilidad en mayo?*
- *¿Qué máquinas tienen mantenimiento próximo?*
- *¿Cuál es el margen neto del semestre?*
- *¿Cómo están los costos de materia prima?*`,
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    if (!WORKER_URL) {
      setError('Configura VITE_WORKER_URL en tu archivo .env para usar el asistente.')
      return
    }

    setError(null)
    setInput('')
    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const history = [...messages, userMsg]
        .filter((m) => m.role !== 'assistant' || m !== WELCOME)
        .map((m) => ({ role: m.role, content: m.content }))

      const response = await fetch(`${WORKER_URL}/v1/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 2048,
          system: buildSystemPrompt(),
          messages: history,
        }),
      })

      if (!response.ok) throw new Error(`Error ${response.status}`)
      const data = await response.json()
      const assistantMsg = { role: 'assistant', content: data.content[0].text }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      setError('No se pudo conectar con el asistente: ' + err.message)
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-0px)] max-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-cadeli-border bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cadeli-blue flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-black text-gray-900 text-base">Asistente CADELI</h1>
            <p className="text-xs text-gray-400">Con datos financieros y de mantenimiento</p>
          </div>
        </div>
        <button
          onClick={() => setMessages([WELCOME])}
          title="Limpiar conversación"
          className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-cadeli-gray transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-cadeli-mid text-white'
                  : 'bg-cadeli-blue text-white'
              }`}
            >
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-cadeli-blue text-white rounded-tr-sm'
                  : 'bg-white border border-cadeli-border text-gray-800 rounded-tl-sm shadow-sm'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-li:text-gray-700 prose-a:text-cadeli-blue">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-cadeli-blue flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-white border border-cadeli-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Loader2 size={14} className="animate-spin" />
                <span>Pensando...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Sugerencias rápidas */}
      {messages.length <= 1 && (
        <div className="px-4 md:px-6 pb-2 flex gap-2 flex-wrap">
          {[
            '¿Cuál fue la utilidad en junio?',
            '¿Qué máquinas tienen alerta?',
            '¿Cómo va el margen neto?',
          ].map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); inputRef.current?.focus() }}
              className="text-xs font-medium text-cadeli-blue border border-cadeli-border bg-white hover:bg-cadeli-gray rounded-full px-3 py-1.5 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 md:px-6 py-4 border-t border-cadeli-border bg-white flex-shrink-0">
        <div className="flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder="Escribe tu pregunta... (Enter para enviar)"
            className="flex-1 resize-none border border-cadeli-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cadeli-blue bg-cadeli-gray placeholder:text-gray-400 max-h-32"
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-xl bg-cadeli-blue hover:bg-navy-dark disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Shift+Enter para nueva línea · Responde en español colombiano
        </p>
      </div>
    </div>
  )
}
