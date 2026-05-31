import { useState, useRef } from 'react'
import { Camera, Upload, X, CheckCircle, Loader2, AlertCircle, Plus } from 'lucide-react'
import { formatCOPFull } from '../../data/financialData'

const WORKER_URL = import.meta.env.VITE_WORKER_URL

export default function ReceiptUploader({ onNewExpense }) {
  const [dragging, setDragging] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Por favor sube una imagen válida (JPG, PNG, etc.)')
      return
    }
    setError(null)
    setResult(null)
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const analyzeReceipt = async () => {
    if (!imageFile) return
    if (!WORKER_URL) {
      setError('Configura VITE_WORKER_URL en tu archivo .env para usar esta función.')
      return
    }
    setLoading(true)
    setError(null)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1]
        const mediaType = imageFile.type

        const response = await fetch(`${WORKER_URL}/v1/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5',
            max_tokens: 1024,
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'image',
                    source: { type: 'base64', media_type: mediaType, data: base64 },
                  },
                  {
                    type: 'text',
                    text: `Analiza este recibo o factura y extrae la información. Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "descripcion": "descripción breve del gasto",
  "proveedor": "nombre del proveedor o establecimiento",
  "monto": número_sin_puntos_ni_comas (solo el número),
  "categoria": "una de: Materia Prima, Energía, Nómina, Mantenimiento, Arriendo, Otros Gastos",
  "fecha": "YYYY-MM-DD",
  "metodo": "una de: Efectivo, Tarjeta, Transferencia, Cheque"
}
Si no puedes leer algún campo, usa null. El monto debe ser en COP (pesos colombianos).`,
                  },
                ],
              },
            ],
          }),
        })

        if (!response.ok) throw new Error(`Error ${response.status}`)
        const data = await response.json()
        const text = data.content[0].text
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (!jsonMatch) throw new Error('No se pudo extraer la información del recibo.')
        const parsed = JSON.parse(jsonMatch[0])
        setResult(parsed)
        setLoading(false)
      }
    } catch (err) {
      setError('Error al analizar el recibo: ' + err.message)
      setLoading(false)
    }
  }

  const saveExpense = () => {
    if (!result) return
    onNewExpense?.({
      id: Date.now(),
      fecha: result.fecha || new Date().toISOString().split('T')[0],
      descripcion: result.descripcion || 'Sin descripción',
      categoria: result.categoria || 'Otros Gastos',
      proveedor: result.proveedor || 'Desconocido',
      monto: result.monto || 0,
      metodo: result.metodo || 'Efectivo',
    })
    setImageFile(null)
    setImagePreview(null)
    setResult(null)
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Registrar Egreso por Foto</h3>
          <p className="text-xs text-gray-400 mt-0.5">Claude Vision extrae los datos automáticamente</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-cadeli-blue/10 flex items-center justify-center">
          <Camera size={18} className="text-cadeli-blue" />
        </div>
      </div>

      {!imagePreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors ${
            dragging ? 'border-cadeli-blue bg-cadeli-blue/5' : 'border-cadeli-border hover:border-cadeli-mid hover:bg-cadeli-gray'
          }`}
        >
          <Upload size={32} className="text-gray-300" />
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600">Arrastra una foto o haz clic</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP · Recibos, facturas, comprobantes</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img src={imagePreview} alt="Recibo" className="w-full max-h-48 object-contain rounded-xl border border-cadeli-border bg-gray-50" />
            <button
              onClick={() => { setImagePreview(null); setImageFile(null); setResult(null); setError(null) }}
              className="absolute top-2 right-2 w-7 h-7 bg-gray-900/60 hover:bg-gray-900 text-white rounded-full flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </div>

          {!result && (
            <button
              onClick={analyzeReceipt}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
              {loading ? 'Analizando con Claude Vision...' : 'Analizar Recibo'}
            </button>
          )}

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                <CheckCircle size={16} />
                Datos extraídos correctamente
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  ['Descripción', result.descripcion],
                  ['Proveedor', result.proveedor],
                  ['Monto', result.monto ? formatCOPFull(result.monto) : null],
                  ['Categoría', result.categoria],
                  ['Fecha', result.fecha],
                  ['Método', result.metodo],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="text-gray-400 text-xs">{label}</span>
                    <p className="font-semibold text-gray-800">{value ?? <span className="text-gray-300">—</span>}</p>
                  </div>
                ))}
              </div>
              <button onClick={saveExpense} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
                <Plus size={16} />
                Guardar Egreso
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
