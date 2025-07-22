interface CompactStatsProps {
  stats: Array<{
    label: string
    value: string | number
    color: string
    trend?: string
  }>
}

export function CompactStats({ stats }: CompactStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.color} rounded-lg p-4`}>
          <div className="text-white/80 text-sm font-medium">{stat.label}</div>
          <div className="text-white text-xl font-bold">{stat.value}</div>
          {stat.trend && <div className="text-white/70 text-sm">{stat.trend}</div>}
        </div>
      ))}
    </div>
  )
}
