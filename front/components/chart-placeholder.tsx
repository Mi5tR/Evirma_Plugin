interface ChartPlaceholderProps {
  title: string
  height?: string
}

export function ChartPlaceholder({ title, height = "h-48" }: ChartPlaceholderProps) {
  return (
    <div className={`bg-slate-700/30 rounded-lg ${height} flex items-center justify-center border border-slate-600`}>
      <div className="text-center">
        <div className="text-slate-400 mb-2">📊</div>
        <div className="text-slate-300 text-sm">{title}</div>
        <div className="text-slate-500 text-xs mt-1">График будет здесь</div>
      </div>
    </div>
  )
}
