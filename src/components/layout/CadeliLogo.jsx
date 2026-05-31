export default function CadeliLogo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-3">
      {/* Círculo con iniciales */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <div className="flex flex-col items-center leading-none">
          <span className="text-[10px] font-black text-cadeli-blue tracking-tighter">CAD</span>
          <span className="text-[10px] font-black text-cadeli-blue tracking-tighter">ELI</span>
        </div>
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-black text-white tracking-wide">CADELI</span>
          <span className="text-[10px] text-blue-200 font-medium leading-none">
            Cauchos y Derivados S.A.S.
          </span>
        </div>
      )}
    </div>
  )
}
