interface MiniChartProps {
  title: string
  data?: number[]
  color?: string
}

export function MiniChart({ title, data = [30, 40, 35, 50, 49, 60, 70, 91, 125], color = "blue" }: MiniChartProps) {
  const max = Math.max(...data)
  const min = Math.min(...data)

  return (
    <div className="bg-slate-700/50 rounded-lg p-4">
      <h4 className="text-slate-300 text-sm font-medium mb-3">{title}</h4>
      <div className="flex items-end gap-1 h-24">
        {data.map((value, index) => {
          const height = ((value - min) / (max - min)) * 100
          return (
            <div
              key={index}
              className={`bg-${color}-500 rounded-sm flex-1 transition-all hover:bg-${color}-400`}
              style={{ height: `${height}%` }}
            />
          )
        })}
      </div>
    </div>
  )
}
