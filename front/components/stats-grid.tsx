interface StatsGridProps {
  stats: Array<{
    label: string
    value: string | number
    color?: string
  }>
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
          <div className={`text-lg font-semibold ${stat.color || "text-gray-900"}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  )
}
