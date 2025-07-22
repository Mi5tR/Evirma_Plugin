"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useSalesAnalytics } from "@/lib/hooks/use-wildberries-data"

const chartData = [
  { date: "01.12", earning: 12000, user: 45, review: 8 },
  { date: "02.12", earning: 15000, user: 52, review: 12 },
  { date: "03.12", earning: 18000, user: 48, review: 15 },
  { date: "04.12", earning: 22000, user: 61, review: 18 },
  { date: "05.12", earning: 19000, user: 55, review: 14 },
  { date: "06.12", earning: 25000, user: 68, review: 22 },
  { date: "07.12", earning: 28000, user: 72, review: 25 },
]

export function StatisticsChart() {
  const [activeFilter, setActiveFilter] = useState("earning")
  const { analytics, loading, error } = useSalesAnalytics(30)

  const filterButtons = [
    { id: "earning", label: "Доходы" },
    { id: "user", label: "Пользователи" },
    { id: "review", label: "Отзывы" },
  ]

  const currentData = analytics?.chartData || chartData
  const chartConfig = {
    value: {
      label: filterButtons.find((btn) => btn.id === activeFilter)?.label || "",
      color: "hsl(var(--chart-1))",
    },
  }

  if (loading) return <div className="text-white text-center py-8">Загрузка данных...</div>
  if (error) return <div className="text-red-400 text-center py-8">Ошибка: {error}</div>

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        {filterButtons.map((button) => (
          <Button
            key={button.id}
            variant={activeFilter === button.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(button.id)}
            className={
              activeFilter === button.id
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-transparent"
            }
          >
            {button.label}
          </Button>
        ))}
      </div>

      {/* Chart Area */}
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--slate-700))" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              className="text-xs text-slate-400"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs text-slate-400" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={activeFilter === "earning" ? "earning" : activeFilter === "user" ? "user" : "review"}
              type="monotone"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
