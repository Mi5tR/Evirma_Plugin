interface ProgressIndicatorProps {
  segments: Array<{
    label: string
    value: number
    color: string
  }>
}

export function ProgressIndicator({ segments }: ProgressIndicatorProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className="space-y-3">
      <div className="flex rounded-lg overflow-hidden h-3">
        {segments.map((segment, index) => (
          <div key={index} className={`${segment.color}`} style={{ width: `${(segment.value / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${segment.color}`} />
            <span className="text-sm text-slate-300">
              {segment.label} <span className="text-white font-medium">{segment.value}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
