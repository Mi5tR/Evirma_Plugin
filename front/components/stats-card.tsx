interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: string
    positive: boolean
  }
  color?: string
}

export function StatsCard({ title, value, subtitle, trend, color = "blue" }: StatsCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  }

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-lg p-4 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-xs opacity-75">{subtitle}</p>}
        </div>
        {trend && (
          <div className={`text-sm ${trend.positive ? "text-green-200" : "text-red-200"}`}>
            {trend.positive ? "↗" : "↘"} {trend.value}
          </div>
        )}
      </div>
    </div>
  )
}
