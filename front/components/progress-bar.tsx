interface ProgressBarProps {
  segments: Array<{
    label: string
    value: number
    color: string
  }>
}

export function ProgressBar({ segments }: ProgressBarProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className="space-y-2">
      <div className="flex rounded-lg overflow-hidden h-8">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`flex items-center justify-center text-white text-sm font-medium ${segment.color}`}
            style={{ width: `${(segment.value / total) * 100}%` }}
          >
            <span className="text-xs">{segment.label}</span>
            <span className="ml-1 text-xs">{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
