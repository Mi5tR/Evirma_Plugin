interface ProgressMiniProps {
  segments: Array<{
    label: string
    value: number
    color: string
  }>
}

export function ProgressMini({ segments }: ProgressMiniProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className="space-y-2">
      <div className="flex rounded-full overflow-hidden h-2">
        {segments.map((segment, index) => (
          <div key={index} className={segment.color} style={{ width: `${(segment.value / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex justify-between text-xs">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${segment.color}`} />
            <span className="text-slate-300">{segment.label}</span>
            <span className="text-white font-medium">{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
