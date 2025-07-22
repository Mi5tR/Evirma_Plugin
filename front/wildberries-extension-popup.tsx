"use client"

import { useState } from "react"
import { ExtensionWindow } from "./components/extension-window"
import { CompactStats } from "./components/compact-stats"
import { MiniChart } from "./components/mini-chart"
import { CompactTable } from "./components/compact-table"
import { ProgressMini } from "./components/progress-mini"
import { TabsMini } from "./components/tabs-mini"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Settings, Download } from "lucide-react"

const mockProducts = [
  {
    article: "148023951",
    name: "Автоклав ГлавАвтоклав для консервирования",
    type: "AUKC" as const,
    position: 4,
    change: -3,
    cpm: 770,
  },
  {
    article: "365286181",
    name: "Автоклав Кулинар, 36 литров",
    type: "AUKC" as const,
    position: 5,
    change: 2,
    cpm: 737,
  },
  {
    article: "423181497",
    name: "Автоклав Fansel 3 электрический",
    type: "AUKC" as const,
    position: 6,
    change: 0,
    cpm: 1150,
  },
  {
    article: "137633496",
    name: "Автоклав Заготовщик 2 поколения",
    type: "APK" as const,
    position: 7,
    change: -1,
    cpm: 600,
  },
]

export default function WildberriesExtensionPopup() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-[9999] bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 p-0"
      >
        📊
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 z-[9999]">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm">WB Analytics</span>
          </div>
        </Button>
      </div>
    )
  }

  const overviewTab = (
    <div className="space-y-6">
      <CompactStats
        stats={[
          { label: "Оборот", value: "2.4M ₽", color: "bg-gradient-to-r from-blue-500 to-blue-600", trend: "+12%" },
          { label: "Товары", value: "156", color: "bg-gradient-to-r from-green-500 to-green-600", trend: "+8%" },
          { label: "CPM", value: "850 ₽", color: "bg-gradient-to-r from-purple-500 to-purple-600", trend: "-3%" },
          { label: "Конверсия", value: "4.2%", color: "bg-gradient-to-r from-orange-500 to-orange-600", trend: "+15%" },
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <MiniChart title="Продажи за месяц" color="blue" />
        <MiniChart title="Трафик по дням" color="green" />
      </div>

      <div>
        <h4 className="text-slate-300 text-base font-medium mb-4">Распределение рекламы</h4>
        <ProgressMini
          segments={[
            { label: "AUKC", value: 29, color: "bg-blue-500" },
            { label: "APK", value: 44, color: "bg-red-500" },
            { label: "Органика", value: 27, color: "bg-slate-500" },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-slate-300 text-sm font-medium mb-3">Топ категории</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Автоклавы</span>
              <span className="text-white">45%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Консервация</span>
              <span className="text-white">32%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Кухня</span>
              <span className="text-white">23%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-slate-300 text-sm font-medium mb-3">Активность</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Просмотры</span>
              <span className="text-green-400">+15%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Клики</span>
              <span className="text-green-400">+8%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Конверсии</span>
              <span className="text-red-400">-2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const productsTab = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-slate-300 text-sm font-medium">Товары в рекламе</h4>
        <Badge variant="secondary" className="bg-slate-700 text-slate-200 text-xs">
          {mockProducts.length}
        </Badge>
      </div>
      <CompactTable products={mockProducts} />
    </div>
  )

  const analyticsTab = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <MiniChart title="Частота запросов по дням" color="purple" />
        <MiniChart title="Изменение позиций товаров" color="orange" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-slate-300 text-base font-medium mb-4">Склады</h4>
          <div className="space-y-3">
            {[
              { name: "Котовск", time: "18 ч", percent: "13%" },
              { name: "Алексин", time: "24 ч", percent: "6%" },
              { name: "Коледино", time: "25 ч", percent: "7%" },
              { name: "Электросталь", time: "32 ч", percent: "3%" },
            ].map((warehouse, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <span className="text-slate-300 text-sm">{warehouse.name}</span>
                  <div className="text-slate-500 text-xs">{warehouse.time}</div>
                </div>
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  {warehouse.percent}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-slate-300 text-base font-medium mb-4">Ключевые метрики</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-300 text-sm">Средний чек</span>
              <span className="text-white font-medium">2,450 ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300 text-sm">ROAS</span>
              <span className="text-green-400 font-medium">3.2x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300 text-sm">CTR</span>
              <span className="text-white font-medium">2.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300 text-sm">CPC</span>
              <span className="text-white font-medium">45 ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <ExtensionWindow title="WB Analytics" onClose={() => setIsVisible(false)} onMinimize={() => setIsMinimized(true)}>
      <div
        className={`fixed top-4 right-4 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl transition-all duration-300 ${
          isMaximized ? "w-[95vw] h-[95vh]" : "w-[600px] h-[800px]"
        } z-[9999] overflow-hidden`}
        style={{ resize: isMaximized ? "none" : "both" }}
      >
        <div className="p-6 h-full bg-slate-900">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">Аналитика Wildberries</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-400 hover:text-white">
                <RefreshCw className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-400 hover:text-white">
                <Download className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <TabsMini
            tabs={[
              { id: "overview", label: "Обзор", content: overviewTab },
              { id: "products", label: "Товары", content: productsTab },
              { id: "analytics", label: "Аналитика", content: analyticsTab },
            ]}
          />
        </div>
      </div>
    </ExtensionWindow>
  )
}
