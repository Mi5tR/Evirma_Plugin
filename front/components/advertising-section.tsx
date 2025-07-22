"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Megaphone, Download, TrendingUp } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { useAdvertisingCampaigns, useAdvertisingStats } from "@/lib/hooks/use-wildberries-data"
import { WBApiUtils } from "@/lib/wildberries-api"

export function AdvertisingSection() {
  const { data: campaigns, loading: campaignsLoading } = useAdvertisingCampaigns()
  const { data: stats, loading: statsLoading } = useAdvertisingStats([1, 2])

  const chartData = [
    { name: "Автоклавы - Весна", clicks: 1250, views: 45230, ctr: 2.76 },
    { name: "Консервирование", clicks: 890, views: 32100, ctr: 2.77 },
    { name: "Аксессуары", clicks: 650, views: 28900, ctr: 2.25 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Рекламные кампании</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
            <Megaphone className="w-4 h-4 mr-2" />
            Создать кампанию
          </Button>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Отчет
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Активные кампании</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">
                    {campaigns?.filter((c: any) => c.status === 9).length || "2"}
                  </h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">запущено</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Дневной бюджет</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">8 000 ₽</h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    15%
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">всего</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Показы</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">{WBApiUtils.formatNumber(stats?.views || 45230)}</h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    8%
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">за сегодня</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">CTR</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">{(stats?.ctr || 2.76).toFixed(2)}%</h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    0.3%
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">кликабельность</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Chart */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Эффективность кампаний</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ChartContainer config={{}} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs text-gray-400" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs text-gray-400" />
                  <ChartTooltip />
                  <Bar dataKey="clicks" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
