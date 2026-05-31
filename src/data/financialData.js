// Datos financieros en COP (pesos colombianos)
export const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
export const MONTHS_FULL = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']

export const MONTHLY_DATA = [
  {
    month: 'Ene',
    ingresos: 85_500_000,
    egresos: 72_300_000,
    // Desglose ingresos
    cauchosMoldeados: 38_475_000,
    perfilesVulcanizados: 25_650_000,
    sellosEmpaques: 12_825_000,
    servicios: 8_550_000,
    // Desglose egresos
    materiaPrima: 27_474_000,
    nomina: 21_690_000,
    energia: 8_676_000,
    mantenimiento: 5_061_000,
    arriendo: 3_615_000,
    otrosGastos: 5_784_000,
  },
  {
    month: 'Feb',
    ingresos: 88_200_000,
    egresos: 74_850_000,
    cauchosMoldeados: 39_690_000,
    perfilesVulcanizados: 26_460_000,
    sellosEmpaques: 13_230_000,
    servicios: 8_820_000,
    materiaPrima: 28_443_000,
    nomina: 22_050_000,
    energia: 8_982_000,
    mantenimiento: 5_239_500,
    arriendo: 3_615_000,
    otrosGastos: 6_520_500,
  },
  {
    month: 'Mar',
    ingresos: 95_300_000,
    egresos: 79_450_000,
    cauchosMoldeados: 42_885_000,
    perfilesVulcanizados: 28_590_000,
    sellosEmpaques: 14_295_000,
    servicios: 9_530_000,
    materiaPrima: 30_196_000,
    nomina: 22_050_000,
    energia: 9_530_000,
    mantenimiento: 6_665_000,
    arriendo: 3_615_000,
    otrosGastos: 7_394_000,
  },
  {
    month: 'Abr',
    ingresos: 78_400_000,
    egresos: 67_200_000,
    cauchosMoldeados: 35_280_000,
    perfilesVulcanizados: 23_520_000,
    sellosEmpaques: 11_760_000,
    servicios: 7_840_000,
    materiaPrima: 25_536_000,
    nomina: 22_050_000,
    energia: 7_840_000,
    mantenimiento: 4_704_000,
    arriendo: 3_615_000,
    otrosGastos: 3_455_000,
  },
  {
    month: 'May',
    ingresos: 108_600_000,
    egresos: 88_400_000,
    cauchosMoldeados: 48_870_000,
    perfilesVulcanizados: 32_580_000,
    sellosEmpaques: 16_290_000,
    servicios: 10_860_000,
    materiaPrima: 35_598_000,
    nomina: 23_100_000,
    energia: 10_860_000,
    mantenimiento: 7_602_000,
    arriendo: 3_615_000,
    otrosGastos: 7_625_000,
  },
  {
    month: 'Jun',
    ingresos: 115_800_000,
    egresos: 93_750_000,
    cauchosMoldeados: 52_110_000,
    perfilesVulcanizados: 34_740_000,
    sellosEmpaques: 17_370_000,
    servicios: 11_580_000,
    materiaPrima: 37_959_000,
    nomina: 24_150_000,
    energia: 11_580_000,
    mantenimiento: 8_106_000,
    arriendo: 3_615_000,
    otrosGastos: 8_340_000,
  },
]

export const EXPENSE_CATEGORIES = [
  { key: 'materiaPrima', label: 'Materia Prima', color: '#1A2B6D' },
  { key: 'nomina', label: 'Nómina', color: '#2E4098' },
  { key: 'energia', label: 'Energía', color: '#4A6FD4' },
  { key: 'mantenimiento', label: 'Mantenimiento', color: '#6B8DE0' },
  { key: 'arriendo', label: 'Arriendo', color: '#8FAAEC' },
  { key: 'otrosGastos', label: 'Otros Gastos', color: '#B4C5F5' },
]

export const INCOME_CATEGORIES = [
  { key: 'cauchosMoldeados', label: 'Cauchos Moldeados', color: '#1A2B6D' },
  { key: 'perfilesVulcanizados', label: 'Perfiles Vulcanizados', color: '#2E4098' },
  { key: 'sellosEmpaques', label: 'Sellos y Empaques', color: '#4A6FD4' },
  { key: 'servicios', label: 'Servicios', color: '#6B8DE0' },
]

// Registros de egresos individuales (recibos)
export const EXPENSE_RECORDS = [
  {
    id: 1,
    fecha: '2026-06-15',
    descripcion: 'Compra caucho natural RSS-3',
    categoria: 'Materia Prima',
    proveedor: 'Inversiones Cauchos del Pacífico',
    monto: 8_450_000,
    metodo: 'Transferencia',
  },
  {
    id: 2,
    fecha: '2026-06-10',
    descripcion: 'Factura energía eléctrica industrial',
    categoria: 'Energía',
    proveedor: 'EPM S.A. E.S.P.',
    monto: 3_820_000,
    metodo: 'Débito automático',
  },
  {
    id: 3,
    fecha: '2026-06-05',
    descripcion: 'Negro de humo N330',
    categoria: 'Materia Prima',
    proveedor: 'Química Industrial Ltda.',
    monto: 2_750_000,
    metodo: 'Cheque',
  },
  {
    id: 4,
    fecha: '2026-06-01',
    descripcion: 'Mantenimiento prensa hidráulica #1',
    categoria: 'Mantenimiento',
    proveedor: 'Tecnipress S.A.S.',
    monto: 1_200_000,
    metodo: 'Efectivo',
  },
  {
    id: 5,
    fecha: '2026-05-28',
    descripcion: 'Azufre y aceleradores vulcanización',
    categoria: 'Materia Prima',
    proveedor: 'Químicos Andinos S.A.',
    monto: 1_890_000,
    metodo: 'Transferencia',
  },
]

export const formatCOP = (value) => {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatCOPFull = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

// Totales acumulados
export const TOTALS = MONTHLY_DATA.reduce(
  (acc, m) => ({
    ingresos: acc.ingresos + m.ingresos,
    egresos: acc.egresos + m.egresos,
  }),
  { ingresos: 0, egresos: 0 }
)
TOTALS.utilidad = TOTALS.ingresos - TOTALS.egresos
TOTALS.margen = ((TOTALS.utilidad / TOTALS.ingresos) * 100).toFixed(1)
