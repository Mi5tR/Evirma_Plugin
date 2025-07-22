"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown, Filter } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SearchTrendDataItem {
  month: string
  searches: number
}

interface PopularQuery {
  query: string
  frequency: string
  competition: string
  trend: string
  change: number
}

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock data for demonstration
  const searchTrendData: SearchTrendDataItem[] = [
    { month: "Янв", searches: 12000 },
    { month: "Фев", searches: 15000 },
    { month: "Мар", searches: 18000 },
    { month: "Апр", searches: 22000 },
    { month: "Май", searches: 19000 },
    { month: "Июн", searches: 25000 },
    { month: "Июл", searches: 28000 },
  ]

  const popularQueries: PopularQuery[] = [
    { query: "автоклав для консервирования", frequency: "45,000", competition: "Высокая", trend: "Растет", change: 12 },
    { query: "автоклав 36 литров", frequency: "32,000", competition: "Средняя", trend: "Растет", change: 8 },
    { query: "автоклав электрический", frequency: "28,000", competition: "Высокая", trend: "Падает", change: -5 },
    { query: "банки для консервирования", frequency: "25,000", competition: "Низкая", trend: "Стабильно", change: 2 },
    { query: "крышки для банок", frequency: "22,000", competition: "Средняя", trend: "Растет", change: 15 },
  ]

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Here you would normally make an API call to search
      console.log("Searching for:", searchQuery)
    }, 1000)
  }

  const chartConfig = {
    searches: {
      label: "Количество запросов",
      color: "#3b82f6",
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Анализ поисковых запросов</h2>
        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          Фильтры
        </Button>
      </div>

      {/* Search Input */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Поиск по ключевым словам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Введите поисковый запрос..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="bg-gray-700 border-gray-600 pl-10 text-white placeholder-gray-400 focus:border-blue-500"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Поиск..." : "Найти"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Queries */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Популярные запросы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-700/50">
                  <th className="text-left p-3 font-medium text-gray-300">Запрос</th>
                  <th className="text-left p-3 font-medium text-gray-300">Частота (мес)</th>
                  <th className="text-left p-3 font-medium text-gray-300">Конкуренция</th>
                  <th className="text-left p-3 font-medium text-gray-300">Тренд</th>
                  <th className="text-left p-3 font-medium text-gray-300">Изменение</th>
                </tr>
              </thead>
              <tbody>
                {popularQueries.map((query, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-700/30">
                    <td className="p-3 text-white font-medium">{query.query}</td>
                    <td className="p-3 text-blue-400">{query.frequency}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          query.competition === "Высокая"
                            ? "destructive"
                            : query.competition === "Средняя"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {query.competition}
                      </Badge>
                    </td>
                    <td className="p-3 text-gray-300">{query.trend}</td>
                    <td className="p-3">
                      <div
                        className={`flex items-center gap-1 ${query.change > 0 ? "text-green-400" : query.change < 0 ? "text-red-400" : "text-gray-400"}`}
                      >
                        {query.change > 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : query.change < 0 ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : null}
                        {query.change > 0 ? "+" : ""}
                        {query.change}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Search Trends Chart */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Динамика поисковых запросов</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={searchTrendData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs text-gray-400"
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs text-gray-400" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="searches"
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

      {/* Search Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-base">Рекомендации</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-600/30">
                <div className="text-blue-400 font-medium text-sm">Высокий потенциал</div>
                <div className="text-gray-300 text-xs mt-1">
                  "автоклав 24 литра" - низкая конкуренция, растущий тренд
                </div>
              </div>
              <div className="p-3 bg-green-600/20 rounded-lg border border-green-600/30">
                <div className="text-green-400 font-medium text-sm">Стабильный рост</div>
                <div className="text-gray-300 text-xs mt-1">"банки для консервирования" показывают устойчивый рост</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-base">Сезонность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Весна</span>
                <Badge variant="secondary" className="bg-green-600 text-white">
                  +25%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Лето</span>
                <Badge variant="secondary" className="bg-green-600 text-white">
                  +40%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Осень</span>
                <Badge variant="secondary" className="bg-yellow-600 text-white">
                  +15%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Зима</span>
                <Badge variant="secondary" className="bg-red-600 text-white">
                  -10%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-base">Конкуренты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">ГрадусОК.рф</span>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  Лидер
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Автоклав Дом</span>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  Сильный
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Русская Дымка</span>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  Средний
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
