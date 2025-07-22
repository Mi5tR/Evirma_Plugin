"use client"

import { useState } from "react"
import { X, Minus, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionCard } from "./components/section-card"
import { AdvertisingProgress } from "./components/advertising-progress"
import { ProductsTable } from "./components/products-table"
import { SegmentationGrid } from "./components/segmentation-grid"
import { FrequencyChart } from "./components/frequency-chart"
import { CPMSegments } from "./components/cpm-segments"
import { Badge } from "@/components/ui/badge"

const mockProducts = [
  {
    id: "1",
    article: "148023951",
    brand: "ГрадусОК.рф",
    name: "Автоклав ГлавАвтоклав для консервирования",
    type: "AUKC" as const,
    orgPos: 124,
    rekPos: 4,
    cpm: 770,
    delivery: 89,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    article: "365286181",
    brand: "Автоклав До...",
    name: "Автоклав Кулинар, 36 литров стальной",
    type: "AUKC" as const,
    orgPos: 120,
    rekPos: 5,
    cpm: 737,
    delivery: 66,
    promo: "",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    article: "423181497",
    brand: "Русская дым...",
    name: "Автоклав Fansel 3 электрический",
    type: "AUKC" as const,
    orgPos: 274,
    rekPos: 6,
    cpm: 1150,
    delivery: 85,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    article: "137633496",
    brand: "Фабрика Заг...",
    name: "Автоклав Заготовщик 2 поколения",
    type: "APK" as const,
    orgPos: 83,
    rekPos: 7,
    cpm: 600,
    delivery: 18,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    article: "133994108",
    brand: "Фабрика Заг...",
    name: "Автоклав Заготовщик 1 поколения",
    type: "APK" as const,
    orgPos: 97,
    rekPos: 8,
    cpm: 600,
    delivery: 90,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function WildberriesEvirma() {
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
          className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">EVIRMA 2</span>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`fixed top-4 left-4 right-4 bg-gray-50 border border-gray-300 rounded-lg shadow-2xl transition-all duration-300 ${
        isMaximized ? "bottom-4" : "h-[90vh]"
      } z-[9999] overflow-hidden`}
    >
      {/* Window Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-gray-800 text-lg font-semibold">EVIRMA 2</span>
          <span className="text-gray-500 text-sm">при поддержке банка точка</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMaximized(!isMaximized)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-full overflow-auto p-6 space-y-6">
        {/* Реклама на странице */}
        <SectionCard title="Реклама на странице" icon={<div className="w-5 h-5 bg-blue-500 rounded"></div>}>
          <div className="space-y-6">
            <AdvertisingProgress
              segments={[
                { label: "AUKC", value: 29, color: "bg-blue-500", textColor: "text-white" },
                { label: "APK", value: 44, color: "bg-red-400", textColor: "text-white" },
                { label: "без рекламы", value: 27, color: "bg-gray-400", textColor: "text-white" },
              ]}
            />

            <ProductsTable products={mockProducts} />

            <Button variant="link" className="text-blue-600 p-0 hover:text-blue-700">
              Показать сегменты CPM →
            </Button>
          </div>
        </SectionCard>

        {/* Сегментация топа */}
        <SectionCard title="Сегментация топа" icon={<div className="w-5 h-5 bg-green-500 rounded"></div>}>
          <SegmentationGrid />
        </SectionCard>

        {/* EVIRMA 2 Склады */}
        <SectionCard title="EVIRMA 2" icon={<div className="w-5 h-5 bg-purple-500 rounded"></div>}>
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 font-medium text-gray-700">📦 Склады:</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">18 ч. Котовск</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  13%
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">24 ч. Алексин</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  6%
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">25 ч. Коледино</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  7%
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">32 ч. Электросталь</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  3%
                </Badge>
              </div>
              <Button variant="link" className="text-blue-600 text-sm p-0">
                показать все
              </Button>
              <Button className="ml-auto bg-blue-600 hover:bg-blue-700">Приоритеты складов в регионах</Button>
            </div>
          </div>
        </SectionCard>

        {/* Частота запроса */}
        <SectionCard title="Частота запроса" icon={<div className="w-5 h-5 bg-orange-500 rounded"></div>}>
          <FrequencyChart />
        </SectionCard>

        {/* Анализ позиций */}
        <SectionCard title="Анализ позиций ваших товаров" icon={<div className="w-5 h-5 bg-indigo-500 rounded"></div>}>
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm text-orange-800">
                <div className="font-medium mb-2">Для получения данных необходимо:</div>
                <div>
                  перейти на{" "}
                  <a href="#" className="text-blue-600 underline hover:text-blue-700">
                    страницу сервиса WB Partners
                  </a>
                </div>
                <div>вернуться на текущую страницу и повторить запрос</div>
              </div>
            </div>

            <Button variant="link" className="text-blue-600 p-0 hover:text-blue-700">
              Проверка позиций артикула по запросу ↓
            </Button>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-800">
                  Для отображения позиций плагин анализирует данные с поисковой выдачи WILDBERRIES для Android
                </span>
                <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                  закрыть ✕
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* CPM Сегменты */}
        <SectionCard title="Показать сегменты CPM" icon={<div className="w-5 h-5 bg-teal-500 rounded"></div>}>
          <CPMSegments />
        </SectionCard>

        {/* Внешние переходы */}
        <SectionCard title="Внешние переходы" icon={<div className="w-5 h-5 bg-gray-500 rounded"></div>}>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left p-3 font-medium text-gray-700">Артикул</th>
                    <th className="text-left p-3 font-medium text-gray-700">Бренд</th>
                    <th className="text-left p-3 font-medium text-gray-700">Название</th>
                    <th className="text-right p-3 font-medium text-gray-700">Переходов в месяц, шт</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Нет данных
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
