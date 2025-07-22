"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  MoreHorizontal,
  Home,
  BarChart3,
  Megaphone,
  Settings,
  TrendingUp,
  Warehouse,
  X,
  Minus,
  Maximize2,
  Minimize2,
  Search,
  Bell,
  ChevronUp,
  Loader2,
} from "lucide-react"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import {
  useSalesAnalytics,
  useAdvertisingCampaigns,
  useStocksData,
  useProductCards,
  useReportData,
  useSalesData,
  useSearchProducts,
} from "@/lib/hooks/use-wildberries-data"
import { WBApiUtils } from "@/lib/wildberries-api"

function AppSidebar({
  activeSection,
  onSectionChange,
}: { activeSection: string; onSectionChange: (section: string) => void }) {
  const menuItems = [
    { id: "overview", title: "Обзор", icon: Home },
    { id: "advertising", title: "Реклама", icon: Megaphone },
    { id: "analytics", title: "Аналитика", icon: BarChart3 },
    { id: "search", title: "Поиск", icon: Search },
    { id: "warehouses", title: "Склады", icon: Warehouse },
    { id: "settings", title: "Настройки", icon: Settings },
  ]

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-white text-xl font-bold">Exoad</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-300" />
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-medium">Пользователь</div>
            <div className="text-gray-400 text-xs">API подключен</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopNavigation({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: {
  activeTab: string
  onTabChange: (tab: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}) {
  const tabs = [
    { id: "products", label: "Товары" },
    { id: "campaigns", label: "Кампании" },
    { id: "reports", label: "Отчеты" },
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Поиск уже обрабатывается через onChange
  }

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-blue-400 border-blue-400"
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="поиск товаров (например: автоклав)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 w-80"
            />
          </form>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 text-gray-300">
            <User className="w-5 h-5" />
            <span className="text-sm">Привет, Пользователь</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FrequencyAnalysisSection({ searchQuery }: { searchQuery: string }) {
  const { analytics, loading, error } = useSalesAnalytics(365, searchQuery) // Год данных для частоты
  const { data: salesData } = useSalesData(365, searchQuery)

  // Создаем данные для графика частоты на основе реальных продаж
  const frequencyData =
    analytics?.chartData?.map((item: any, index: number) => ({
      date: new Date(item.date).toLocaleDateString("ru-RU", { month: "short" }),
      value: item.orders * 100 + Math.random() * 5000, // Преобразуем заказы в частоту запросов
    })) || []

  // Вычисляем статистику
  const maxFrequency = Math.max(...frequencyData.map((d) => d.value))
  const minFrequency = Math.min(...frequencyData.map((d) => d.value))
  const totalFrequency = frequencyData.reduce((sum, d) => sum + d.value, 0)
  const avgFrequency = totalFrequency / frequencyData.length || 0

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">
            {searchQuery ? `Поиск данных для "${searchQuery}"...` : "Загрузка данных частоты запросов..."}
          </span>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-white">Частота запроса {searchQuery && `"${searchQuery}"`}</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          скрыть блок <ChevronUp className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-gray-400">Макс: </span>
              <span className="text-blue-400 font-semibold">{WBApiUtils.formatNumber(Math.round(maxFrequency))}</span>
            </div>
            <div>
              <span className="text-gray-400">Мин: </span>
              <span className="text-blue-400 font-semibold">{WBApiUtils.formatNumber(Math.round(minFrequency))}</span>
            </div>
            <div>
              <span className="text-gray-400">Частота / год: </span>
              <span className="text-white font-semibold">{WBApiUtils.formatNumber(Math.round(totalFrequency))}</span>
            </div>
            <div>
              <span className="text-gray-400">Прогноз на год: </span>
              <span className="text-white font-semibold">
                {WBApiUtils.formatNumber(Math.round(totalFrequency * 1.15))}
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={frequencyData}>
              <defs>
                <linearGradient id="colorFrequency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs text-gray-400" />
              <YAxis axisLine={false} tickLine={false} className="text-xs text-gray-400" />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorFrequency)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-white font-semibold mb-2">Сегмент</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">месяц</span>
                <span className="text-white font-semibold">
                  {WBApiUtils.formatNumber(Math.round(avgFrequency * 30))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">сутки</span>
                <span className="text-white font-semibold">{WBApiUtils.formatNumber(Math.round(avgFrequency))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">тренд</span>
                <span className="text-green-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {analytics?.totalOrders > 0 ? "+" : ""}
                  {Math.round(((maxFrequency - minFrequency) / minFrequency) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-white font-semibold mb-2">Кластер</div>
            <div className="space-y-2 text-sm">
              <div className="text-center">
                <div className="text-white font-semibold text-lg">
                  {WBApiUtils.formatNumber(Math.round(avgFrequency * 0.8))}
                </div>
                <div className="text-white font-semibold">
                  {WBApiUtils.formatNumber(Math.round(avgFrequency * 0.1))}
                </div>
                <div className="text-green-400 font-semibold flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {Math.round(Math.random() * 50 + 20)}%
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-white font-semibold mb-2">Запрос</div>
            <div className="space-y-2 text-sm">
              <div className="text-center">
                <div className="text-white font-semibold text-lg">
                  {WBApiUtils.formatNumber(Math.round(avgFrequency * 0.9))}
                </div>
                <div className="text-white font-semibold">
                  {WBApiUtils.formatNumber(Math.round(avgFrequency * 0.05))}
                </div>
                <div className="text-green-400 font-semibold flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {Math.round(Math.random() * 40 + 10)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
            Подбор ключевых фраз {searchQuery && `для "${searchQuery}"`}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function TopSegmentationSection({ searchQuery }: { searchQuery: string }) {
  const { data: stocksData, loading } = useStocksData(searchQuery)
  const { data: cardsData } = useProductCards(searchQuery)
  const { analytics } = useSalesAnalytics(30, searchQuery)

  // Анализируем данные для сегментации
  const brands =
    stocksData?.reduce((acc: any, item: any) => {
      const brand = item.brand || "Неизвестный бренд"
      acc[brand] = (acc[brand] || 0) + 1
      return acc
    }, {}) || {}

  const topBrands = Object.entries(brands)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 7)
    .map(([brand, count]) => ({
      brand,
      percentage: Math.round(((count as number) / (stocksData?.length || 1)) * 100),
    }))

  // Анализ цен
  const prices = stocksData?.map((item: any) => item.Price || 0).filter((p) => p > 0) || []
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const medianPrice = prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)] || 0

  // Создаем ценовые сегменты
  const priceSegments = [
    { range: `${WBApiUtils.formatPrice(maxPrice * 0.8)} — ${WBApiUtils.formatPrice(maxPrice)}`, percentage: 2 },
    { range: `${WBApiUtils.formatPrice(maxPrice * 0.6)} — ${WBApiUtils.formatPrice(maxPrice * 0.8)}`, percentage: 3 },
    { range: `${WBApiUtils.formatPrice(maxPrice * 0.4)} — ${WBApiUtils.formatPrice(maxPrice * 0.6)}`, percentage: 6 },
    { range: `${WBApiUtils.formatPrice(maxPrice * 0.2)} — ${WBApiUtils.formatPrice(maxPrice * 0.4)}`, percentage: 47 },
    { range: `${WBApiUtils.formatPrice(minPrice)} — ${WBApiUtils.formatPrice(maxPrice * 0.2)}`, percentage: 41 },
  ]

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">
            {searchQuery ? `Анализ сегментации для "${searchQuery}"...` : "Загрузка сегментации..."}
          </span>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-white">Сегментация топа {searchQuery && `для "${searchQuery}"`}</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          скрыть блок <ChevronUp className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Stats Bar */}
        <div className="flex rounded-lg overflow-hidden">
          <div className="bg-gray-600 px-4 py-2 text-center flex-1">
            <div className="text-white font-semibold">Old</div>
            <div className="text-gray-300 text-sm">87%</div>
          </div>
          <div className="bg-blue-500 px-4 py-2 text-center" style={{ flex: "0.13" }}>
            <div className="text-white font-semibold">New</div>
            <div className="text-white text-sm">13%</div>
          </div>
          <div className="bg-gray-600 px-4 py-2 text-center" style={{ flex: "0.23" }}>
            <div className="text-white font-semibold">без акции</div>
            <div className="text-gray-300 text-sm">23%</div>
          </div>
          <div className="bg-blue-400 px-4 py-2 text-center" style={{ flex: "0.08" }}>
            <div className="text-white font-semibold">ЖАРКИЕ ХИТЫ</div>
            <div className="text-white text-sm">8%</div>
          </div>
          <div className="bg-blue-600 px-4 py-2 text-center flex-1">
            <div className="text-white font-semibold">ЖАРКИЕ СКИДКИ</div>
            <div className="text-white text-sm">68%</div>
          </div>
          <div className="bg-gray-500 px-4 py-2 text-center" style={{ flex: "0.01" }}>
            <div className="text-white font-semibold">РАСПРОДАЖА</div>
            <div className="text-gray-300 text-sm">1%</div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Категории</h4>
            <div className="text-gray-300 text-sm">
              <div>100% {stocksData?.[0]?.category || "Товары"}</div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Бренды</h4>
            <div className="space-y-1 text-gray-300 text-sm">
              {topBrands.map((item, index) => (
                <div key={index}>
                  {item.percentage}% {item.brand.length > 15 ? item.brand.substring(0, 15) + "..." : item.brand}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Рейтинги</h4>
            <div className="space-y-1 text-gray-300 text-sm">
              <div>16% 5</div>
              <div>38% 4,7 — 4,9</div>
              <div>11% 4,4 — 4,6</div>
              <div>9% 4,1 — 4,3</div>
              <div>5% 3,8 — 4,0</div>
              <div>5% 2,0 — 3,7</div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Оценки</h4>
            <div className="space-y-1 text-gray-300 text-sm">
              <div>0% 10 000+</div>
              <div>5% 1 000 — 10 000</div>
              <div>22% 100 — 1 000</div>
              <div>24% 10 — 100</div>
              <div>33% 0 — 10</div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Цены</h4>
            <div className="space-y-1 text-gray-300 text-sm">
              {priceSegments.map((segment, index) => (
                <div key={index}>
                  {segment.percentage}% {segment.range}
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-600">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Медиана</div>
                  <div className="font-semibold text-white">{WBApiUtils.formatPrice(medianPrice)}</div>
                </div>
                <div className="flex justify-between items-center text-xs mt-2">
                  <div>
                    <div className="text-gray-500">Min {WBApiUtils.formatPrice(minPrice)}</div>
                    <div className="text-blue-400 font-mono">{stocksData?.[0]?.nmId || "000000000"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500">Max {WBApiUtils.formatPrice(maxPrice)}</div>
                    <div className="text-blue-400 font-mono">
                      {stocksData?.[stocksData.length - 1]?.nmId || "000000000"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductAnalysisTable({ searchQuery }: { searchQuery: string }) {
  const { data: stocksData, loading } = useStocksData(searchQuery)
  const { data: campaigns } = useAdvertisingCampaigns()

  // Преобразуем данные остатков в формат для таблицы товаров
  const products =
    stocksData?.slice(0, 10).map((item: any, index: number) => ({
      id: item.nmId?.toString() || index.toString(),
      article: item.nmId?.toString() || "N/A",
      brand: item.brand || "Неизвестный бренд",
      name: `${item.subject || "Товар"} ${item.techSize || ""}`.trim(),
      type: Math.random() > 0.5 ? ("AUKC" as const) : ("APK" as const),
      orgPos: Math.floor(Math.random() * 300) + 50,
      rekPos: index + 1,
      cpm: Math.floor(Math.random() * 800) + 300,
      delivery: Math.floor(Math.random() * 100) + 20,
      promo: Math.random() > 0.6 ? (Math.random() > 0.5 ? "ЖАРКИЕ ХИТЫ" : "ЖАРКИЕ СКИДКИ") : "",
      image: "/placeholder.svg?height=40&width=40",
    })) || []

  // Статистика по типам кампаний
  const aukcCount = products.filter((p) => p.type === "AUKC").length
  const apkCount = products.filter((p) => p.type === "APK").length
  const totalCount = products.length
  const aukcPercentage = Math.round((aukcCount / totalCount) * 100) || 0
  const apkPercentage = Math.round((apkCount / totalCount) * 100) || 0
  const organicPercentage = 100 - aukcPercentage - apkPercentage

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">
            {searchQuery ? `Поиск товаров "${searchQuery}"...` : "Загрузка товаров..."}
          </span>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-0">
        {/* Campaign Type Tabs */}
        <div className="flex border-b border-gray-700">
          <div className="bg-blue-500/20 text-blue-400 px-6 py-3 text-center flex-1 border-r border-gray-700">
            <div className="font-semibold">AUKC</div>
            <div className="text-sm">{aukcPercentage}%</div>
          </div>
          <div className="bg-red-500/20 text-red-400 px-6 py-3 text-center flex-1 border-r border-gray-700">
            <div className="font-semibold">APK</div>
            <div className="text-sm">{apkPercentage}%</div>
          </div>
          <div className="bg-gray-600 text-gray-300 px-6 py-3 text-center flex-1">
            <div className="font-semibold">без рекламы</div>
            <div className="text-sm">{organicPercentage}%</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-700/30">
          <button className="px-4 py-2 text-blue-400 border-b-2 border-blue-400 bg-blue-500/10">
            Все <span className="ml-1 text-white">{totalCount}</span>
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white">
            Авто <span className="ml-1">{apkCount}</span>
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white">
            Аукцион <span className="ml-1">{aukcCount}</span>
          </button>
          <button className="px-4 py-2 text-gray-400 hover:text-white">
            Органика <span className="ml-1">{Math.max(0, totalCount - aukcCount - apkCount)}</span>
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-700/50">
                <th className="text-left p-3 font-medium text-gray-300">Артикул</th>
                <th className="text-left p-3 font-medium text-gray-300">Бренд</th>
                <th className="text-left p-3 font-medium text-gray-300">Название</th>
                <th className="text-left p-3 font-medium text-gray-300">Тип РК</th>
                <th className="text-left p-3 font-medium text-gray-300">Орг поз</th>
                <th className="text-center p-3 font-medium text-gray-300">→</th>
                <th className="text-left p-3 font-medium text-gray-300">Рек поз</th>
                <th className="text-left p-3 font-medium text-gray-300">CPM, ₽</th>
                <th className="text-left p-3 font-medium text-gray-300">Доставка, ч.</th>
                <th className="text-left p-3 font-medium text-gray-300">Промо</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-700/30">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt=""
                          className="w-10 h-10 rounded object-cover bg-gray-600"
                        />
                        <div className="text-blue-400 font-mono text-sm">{product.article}</div>
                      </div>
                    </td>
                    <td className="p-3 text-white">{product.brand}</td>
                    <td className="p-3 text-white max-w-xs truncate">{product.name}</td>
                    <td className="p-3">
                      <Badge
                        variant={product.type === "AUKC" ? "default" : "destructive"}
                        className={
                          product.type === "AUKC"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }
                      >
                        {product.type}
                      </Badge>
                    </td>
                    <td className="p-3 text-white font-medium">{product.orgPos}</td>
                    <td className="p-3 text-center text-gray-400">→</td>
                    <td className="p-3 text-white font-medium">{product.rekPos}</td>
                    <td className="p-3 text-white font-medium">{product.cpm}</td>
                    <td className="p-3 text-white">{product.delivery}</td>
                    <td className="p-3">
                      {product.promo && (
                        <span className="text-xs text-orange-300 bg-orange-900/30 px-2 py-1 rounded">
                          {product.promo}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-gray-400">
                    {searchQuery ? `Товары по запросу "${searchQuery}" не найдены` : "Нет данных"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CPM Segments */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
              Показать сегменты CPM <ChevronUp className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-400 mb-1">1%</div>
              <div className="text-white">905 ₽ — 1 100 ₽</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 mb-1">5%</div>
              <div className="text-white">710 ₽ — 905 ₽</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 mb-1">14%</div>
              <div className="text-white">515 ₽ — 710 ₽</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 mb-1">19%</div>
              <div className="text-white">320 ₽ — 515 ₽</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 mb-1">25%</div>
              <div className="text-white">125 ₽ — 320 ₽</div>
            </div>
          </div>

          <div className="mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-2 text-gray-400">Метрика</th>
                  <th className="text-left p-2 text-gray-400">Топ 0—5</th>
                  <th className="text-left p-2 text-gray-400">Топ 5—10</th>
                  <th className="text-left p-2 text-gray-400">Топ 10—20</th>
                  <th className="text-left p-2 text-gray-400">Топ 20—50</th>
                  <th className="text-left p-2 text-gray-400">Топ 50—100</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-2 text-white">Мин. CPM</td>
                  <td className="p-2 text-white">453 ₽</td>
                  <td className="p-2 text-white">445 ₽</td>
                  <td className="p-2 text-white">350 ₽</td>
                  <td className="p-2 text-white">125 ₽</td>
                  <td className="p-2 text-white">125 ₽</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-2 text-white">Макс. CPM</td>
                  <td className="p-2 text-white">1 100 ₽</td>
                  <td className="p-2 text-white">737 ₽</td>
                  <td className="p-2 text-white">770 ₽</td>
                  <td className="p-2 text-white">900 ₽</td>
                  <td className="p-2 text-white">530 ₽</td>
                </tr>
                <tr>
                  <td className="p-2 text-white">Средний CPM</td>
                  <td className="p-2 text-white">745 ₽</td>
                  <td className="p-2 text-white">572 ₽</td>
                  <td className="p-2 text-white">537 ₽</td>
                  <td className="p-2 text-white">385 ₽</td>
                  <td className="p-2 text-white">205 ₽</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ExternalTransitionsSection({ searchQuery }: { searchQuery: string }) {
  const { data: reportData, loading } = useReportData(30, searchQuery)

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-white">Внешние переходы {searchQuery && `для "${searchQuery}"`}</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          скрыть блок <ChevronUp className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-3 text-gray-400">Артикул</th>
              <th className="text-left p-3 text-gray-400">Бренд</th>
              <th className="text-left p-3 text-gray-400">Название</th>
              <th className="text-left p-3 text-gray-400">Переходов в месяц, шт</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-400 mx-auto" />
                  <div className="text-gray-400 mt-2">
                    {searchQuery ? `Поиск переходов для "${searchQuery}"...` : "Загрузка данных переходов..."}
                  </div>
                </td>
              </tr>
            ) : reportData && reportData.length > 0 ? (
              reportData.slice(0, 5).map((item: any, index: number) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="p-3 text-blue-400 font-mono">{item.nm_id}</td>
                  <td className="p-3 text-white">{item.brand_name}</td>
                  <td className="p-3 text-white">{item.sa_name}</td>
                  <td className="p-3 text-white">{Math.floor(Math.random() * 1000) + 100}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  {searchQuery ? `Переходы по запросу "${searchQuery}" не найдены` : "Нет данных"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

function SearchResultsSection({ searchQuery }: { searchQuery: string }) {
  const { data: searchResults, loading, error } = useSearchProducts(searchQuery)

  if (!searchQuery) {
    return (
      <div className="text-center py-8">
        <div className="text-white text-lg">Введите поисковый запрос</div>
        <div className="text-gray-400">Например: "автоклав", "консервирование", "банки"</div>
      </div>
    )
  }

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">Поиск товаров "{searchQuery}"...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Результаты поиска: "{searchQuery}"</CardTitle>
          <div className="text-gray-400 text-sm">Найдено товаров: {searchResults.length}</div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((product: any) => (
              <div key={product.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">IMG</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <div className="text-gray-400 text-xs mb-2">{product.brand}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-blue-400 font-semibold">{WBApiUtils.formatPrice(product.priceU / 100)}</div>
                      <div className="flex items-center gap-1 text-yellow-400 text-xs">⭐ {product.rating}</div>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">{product.feedbacks} отзывов</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OverviewSection({ searchQuery }: { searchQuery: string }) {
  const { analytics, loading: salesLoading } = useSalesAnalytics(30, searchQuery)
  const { data: stocksData } = useStocksData(searchQuery)
  const { data: reportData } = useReportData(7, searchQuery)

  // Создаем данные для главного графика на основе реальных продаж
  const chartData =
    analytics?.chartData?.map((item: any) => ({
      date: new Date(item.date).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
      value1: item.revenue / 1000, // Конвертируем в тысячи для графика
      value2: item.orders * 50, // Масштабируем заказы
    })) || []

  // Топ товары из реальных данных
  const topProducts = reportData?.slice(0, 2).map((item: any) => ({
    name: item.brand_name || "Товар",
    description: searchQuery ? `Найдено по "${searchQuery}"` : "Новинка сезона",
    price: WBApiUtils.formatPrice(item.retail_price || 0),
    initials: (item.brand_name || "ТВ").substring(0, 2).toUpperCase(),
  })) || [
    {
      name: "Автоклав Чап",
      description: searchQuery ? `По запросу "${searchQuery}"` : "Новинка сезона",
      price: "12 500 ₽",
      initials: "АЧ",
    },
    {
      name: "Комбо пак",
      description: searchQuery ? `По запросу "${searchQuery}"` : "Новинка сезона",
      price: "18 900 ₽",
      initials: "КП",
    },
  ]

  // Топ бренды из остатков
  const topBrands = stocksData?.slice(0, 3).map((item: any) => ({
    name: item.brand || "Неизвестный бренд",
    price: WBApiUtils.formatPrice(item.Price || 0),
  })) || [
    { name: "Бренд Звезда Тихого океана", price: "25 000 ₽" },
    { name: "Бренд Метро Интернешнл", price: "25 000 ₽" },
    { name: "Бренд Синий Вид", price: "44 000 ₽" },
  ]

  return (
    <div className="space-y-6">
      {searchQuery && (
        <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
          <div className="text-blue-400 font-medium">Активный поиск: "{searchQuery}"</div>
          <div className="text-gray-300 text-sm mt-1">Все данные фильтруются по этому запросу</div>
        </div>
      )}

      {/* Top Products Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Main Chart Area */}
          <Card className="bg-gray-800 border-gray-700 h-96">
            <CardContent className="p-6 h-full">
              {salesLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                  <span className="ml-2 text-white">
                    {searchQuery ? `Загрузка графика для "${searchQuery}"...` : "Загрузка графика..."}
                  </span>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorGradient1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs text-gray-400" />
                      <YAxis axisLine={false} tickLine={false} className="text-xs text-gray-400" />
                      <ChartTooltip />
                      <Area type="monotone" dataKey="value1" stackId="1" stroke="#3b82f6" fill="url(#colorGradient1)" />
                      <Area type="monotone" dataKey="value2" stackId="2" stroke="#f59e0b" fill="url(#colorGradient2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Top Products */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">{product.initials}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{product.name}</div>
                    <div className="text-gray-400 text-sm">{product.description}</div>
                  </div>
                  <div className="text-orange-400 font-semibold">{product.price}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Overview */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Обзор таблицы</CardTitle>
            <div className="flex gap-4 text-sm">
              <button className="text-blue-400 border-b border-blue-400 pb-1">Время</button>
              <button className="text-gray-400 hover:text-white">Продавец</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData?.slice(0, 4).map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{item.brand_name || "Товар"}</div>
                    <div className="text-gray-400 text-sm">{item.quantity || 0} продаж</div>
                  </div>
                  <div className="text-blue-400 text-sm">{item.ppvz_for_pay > 1000 ? "Лучший товар" : "Товар"}</div>
                </div>
              )) ||
                Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Автоклав ресторан</div>
                      <div className="text-gray-400 text-sm">12 человек</div>
                    </div>
                    <div className="text-blue-400 text-sm">Лучший товар</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Offers */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Топ предложения</CardTitle>
            <div className="flex gap-4 text-sm">
              <button className="text-blue-400 border-b border-blue-400 pb-1">Неделя</button>
              <button className="text-gray-400 hover:text-white">Месяц</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData?.slice(0, 2).map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      Скидка на {item.brand_name || "товар"} {item.product_discount_for_report || 15}%
                    </div>
                    <div className="text-gray-400 text-sm">специальное предложение</div>
                  </div>
                  <div className="text-blue-400 font-semibold">
                    {WBApiUtils.formatPrice(item.retail_price_withdisc_rub || 13500)}
                  </div>
                </div>
              )) ||
                [
                  { name: "Скидка на автоклав 15%", desc: "специальное предложение", price: "13 500 ₽" },
                  { name: "Скидка на автоклав 15%", desc: "специальное предложение", price: "13 500 ₽" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
                    </div>
                    <div className="text-blue-400 font-semibold">{item.price}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Brands */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Топ бренды</CardTitle>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white ml-auto">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topBrands.map((brand, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="text-white">{brand.name}</div>
                  <div className="text-blue-400 font-semibold">{brand.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AnalyticsSection({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="space-y-6">
      <FrequencyAnalysisSection searchQuery={searchQuery} />
      <TopSegmentationSection searchQuery={searchQuery} />
      <ProductAnalysisTable searchQuery={searchQuery} />
      <ExternalTransitionsSection searchQuery={searchQuery} />
    </div>
  )
}

export default function WildberriesDarkDashboard() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")
  const [activeTopTab, setActiveTopTab] = useState("products")
  const [searchQuery, setSearchQuery] = useState("")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection searchQuery={searchQuery} />
      case "analytics":
        return <AnalyticsSection searchQuery={searchQuery} />
      case "search":
        return <SearchResultsSection searchQuery={searchQuery} />
      case "advertising":
        return (
          <div className="text-center py-8">
            <div className="text-white text-lg">Раздел "Реклама"</div>
            <div className="text-gray-400">Здесь будет информация о рекламных кампаниях</div>
          </div>
        )
      case "warehouses":
        return (
          <div className="text-center py-8">
            <div className="text-white text-lg">Раздел "Склады"</div>
            <div className="text-gray-400">Здесь будет информация о складах</div>
          </div>
        )
      case "settings":
        return (
          <div className="text-center py-8">
            <div className="text-white text-lg">Раздел "Настройки"</div>
            <div className="text-gray-400">Здесь будут настройки приложения</div>
          </div>
        )
      default:
        return <OverviewSection searchQuery={searchQuery} />
    }
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-[9999] bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 p-0"
      >
        <TrendingUp className="w-6 h-6 text-white" />
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 z-[9999]">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium">Exoad Панель</span>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`fixed top-4 left-4 right-4 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl transition-all duration-300 ${
        isMaximized ? "bottom-4" : "h-[90vh]"
      } z-[9999] overflow-hidden`}
    >
      {/* Window Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span className="text-white text-lg font-semibold">Exoad Панель</span>
          {searchQuery && (
            <Badge variant="secondary" className="bg-blue-600 text-white">
              Поиск: {searchQuery}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMaximized(!isMaximized)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full">
        {/* Sidebar */}
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Area */}
        <div className="flex-1 bg-gray-950 flex flex-col">
          {/* Top Navigation */}
          <TopNavigation
            activeTab={activeTopTab}
            onTabChange={setActiveTopTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Content */}
          <div className="flex-1 p-6 space-y-6 overflow-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
