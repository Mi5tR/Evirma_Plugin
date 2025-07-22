"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  Filter,
  Download,
} from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useSalesAnalytics, useReportData } from "@/lib/hooks/use-wildberries-data"
import { WBApiUtils } from "@/lib/wildberries-api"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export function AnalyticsSectionContent() {
  const { analytics, loading: analyticsLoading, error: analyticsError } = useSalesAnalytics(30)
  const { data: reportData, loading: reportLoading, error: reportError } = useReportData(30)
  const [selectedPeriod, setSelectedPeriod] = useState("30")

  const loading = analyticsLoading || reportLoading
  const error = analyticsError || reportError

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-8 bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="h-64 bg-gray-700 rounded animate-pulse" />
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="h-64 bg-gray-700 rounded animate-pulse" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-500" />
        <p className="text-red-400 mb-2">Ошибка загрузки аналитических данных</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    )
  }

  // Prepare chart data
  const chartData = analytics?.chartData || []
  const categoryData = [
    { name: "Автоклавы", value: 45, fill: COLORS[0] },
    { name: "Консервирование", value: 30, fill: COLORS[1] },
    { name: "Аксессуары", value: 15, fill: COLORS[2] },
    { name: "Прочее", value: 10, fill: COLORS[3] },
  ]

  const topProducts = reportData?.slice(0, 10) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Детальная аналитика</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Фильтры
          </Button>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {[
          { value: "7", label: "7 дней" },
          { value: "30", label: "30 дней" },
          { value: "90", label: "90 дней" },
        ].map((period) => (
          <Button
            key={period.value}
            variant={selectedPeriod === period.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod(period.value)}
            className={
              selectedPeriod === period.value
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border-gray-600 text-gray-300 hover:text-white bg-transparent"
            }
          >
            {period.label}
          </Button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Выручка за период</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">
                    {analytics ? WBApiUtils.formatPrice(analytics.totalRevenue) : "0 ₽"}
                  </h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    12%
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">последние {selectedPeriod} дней</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Количество заказов</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">{analytics?.totalOrders || 0}</h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    8%
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">всего заказов</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Средний чек</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">
                    {analytics ? WBApiUtils.formatPrice(analytics.averageOrderValue) : "0 ₽"}
                  </h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    5%
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">на заказ</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Конверсия</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">3.2%</h3>
                  <span className="flex items-center text-sm text-red-400">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    2%
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">средняя</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Динамика продаж</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    className="text-xs text-gray-400"
                  />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs text-gray-400" />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Line
                    dataKey="revenue"
                    type="monotone"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Распределение по категориям</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Топ товары по выручке</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product: any, index: number) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{product.brand_name}</div>
                  <div className="text-gray-400 text-sm">
                    {product.subject_name} • {product.sa_name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">
                    {WBApiUtils.formatPrice(product.ppvz_for_pay || 0)}
                  </div>
                  <div className="text-gray-400 text-sm">{product.quantity} продаж</div>
                </div>
                <Progress
                  value={(product.ppvz_for_pay / Math.max(...topProducts.map((p: any) => p.ppvz_for_pay || 0))) * 100}
                  className="w-20"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Детальный отчет по товарам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-700/50">
                  <th className="text-left p-3 font-medium text-gray-300">Артикул</th>
                  <th className="text-left p-3 font-medium text-gray-300">Бренд</th>
                  <th className="text-left p-3 font-medium text-gray-300">Продажи</th>
                  <th className="text-left p-3 font-medium text-gray-300">Выручка</th>
                  <th className="text-left p-3 font-medium text-gray-300">Комиссия</th>
                  <th className="text-left p-3 font-medium text-gray-300">К доплате</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.slice(0, 10).map((item: any, index: number) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-700/30">
                    <td className="p-3 text-gray-300">{item.sa_name || item.barcode}</td>
                    <td className="p-3 text-white">{item.brand_name}</td>
                    <td className="p-3 text-blue-400">{item.quantity}</td>
                    <td className="p-3 text-green-400">{WBApiUtils.formatPrice(item.retail_amount || 0)}</td>
                    <td className="p-3 text-red-400">{WBApiUtils.formatPrice(item.ppvz_sales_commission || 0)}</td>
                    <td className="p-3 text-green-400 font-semibold">
                      {WBApiUtils.formatPrice(item.ppvz_for_pay || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
