"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

interface FrequencyDataItem {
  month: string
  frequency: number
}

interface FrequencyStats {
  max: { value: number; month: string }
  min: { value: number; month: string }
  yearlyFrequency: number
  yearlyForecast: number
}

interface SegmentStats {
  month: number
  day: number
  trend: number
}

interface ClusterStats {
  value1: number
  value2: number
  trend: number
}

interface QueryStats {
  value1: number
  value2: number
  trend: number
}

interface FrequencyData {
  frequencyData: FrequencyDataItem[]
  stats: FrequencyStats
  segmentStats: SegmentStats
  clusterStats: ClusterStats
  queryStats: QueryStats
}

export function FrequencyChart() {
  const [data, setData] = useState<FrequencyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/analytics/frequency")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const chartConfig = {
    frequency: {
      label: "Частота запроса",
      color: "hsl(var(--chart-1))",
    },
  }

  if (isLoading) return <div className="text-white text-center py-8">Загрузка данных...</div>
  if (error) return <div className="text-red-400 text-center py-8">Ошибка: {error}</div>
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-gray-400">Макс:</div>
          <div className="text-blue-400 font-semibold text-lg">{data.stats.max.value.toLocaleString()}</div>
          <div className="text-gray-500 text-xs">{data.stats.max.month}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-gray-400">Мин:</div>
          <div className="text-blue-400 font-semibold text-lg">{data.stats.min.value.toLocaleString()}</div>
          <div className="text-gray-500 text-xs">{data.stats.min.month}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-gray-400">Частота / год:</div>
          <div className="text-blue-400 font-semibold text-lg">{data.stats.yearlyFrequency.toLocaleString()}</div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-gray-400">Прогноз на год:</div>
          <div className="text-blue-400 font-semibold text-lg">{data.stats.yearlyForecast.toLocaleString()}</div>
        </div>
      </div>

      {/* Chart placeholder */}
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.frequencyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--gray-700))" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-xs text-gray-400" />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs text-gray-400" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="frequency" type="monotone" stroke="var(--color-frequency)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Bottom stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="font-semibold text-white mb-3">Сегмент</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">месяц</span>
              <span className="font-semibold text-white">{data.segmentStats.month.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">сутки</span>
              <span className="font-semibold text-white">{data.segmentStats.day.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">тренд</span>
              <span className="text-green-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> {data.segmentStats.trend}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="font-semibold text-white mb-3">Кластер</div>
          <div className="space-y-2 text-sm">
            <div className="text-center font-semibold text-lg text-white">
              {data.clusterStats.value1.toLocaleString()}
            </div>
            <div className="text-center font-semibold text-white">{data.clusterStats.value2.toLocaleString()}</div>
            <div className="text-center text-green-400 font-semibold flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" /> {data.clusterStats.trend}%
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="font-semibold text-white mb-3">Запрос</div>
          <div className="space-y-2 text-sm">
            <div className="text-center font-semibold text-lg text-white">
              {data.queryStats.value1.toLocaleString()}
            </div>
            <div className="text-center font-semibold text-white">{data.queryStats.value2.toLocaleString()}</div>
            <div className="text-center text-green-400 font-semibold flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4" /> {data.queryStats.trend}%
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2">Подбор ключевых фраз</Button>
      </div>
    </div>
  )
}
