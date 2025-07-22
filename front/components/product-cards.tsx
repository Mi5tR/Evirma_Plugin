"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronLeft, ChevronRight, Package } from "lucide-react"
import { useProductCards, useStocksData } from "@/lib/hooks/use-wildberries-data"
import { WBApiUtils } from "@/lib/wildberries-api"
import { Card, CardContent } from "@/components/ui/card"

export function ProductCards() {
  const { data: cardsData, loading: cardsLoading, error: cardsError } = useProductCards()
  const { data: stocksData, loading: stocksLoading, error: stocksError } = useStocksData()
  const [currentIndex, setCurrentIndex] = useState(0)

  const loading = cardsLoading || stocksLoading
  const error = cardsError || stocksError

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-shrink-0 w-48">
            <div className="bg-gray-700 rounded-lg p-4 animate-pulse">
              <div className="w-full h-32 bg-gray-600 rounded mb-3"></div>
              <div className="h-4 bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-600 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-600 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Package className="w-12 h-12 mx-auto mb-4 text-gray-500" />
        <p className="text-red-400 mb-2">Ошибка загрузки товаров</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    )
  }

  // Объединяем данные карточек и остатков
  const products = cardsData?.cards || []
  const stocks = stocksData || []

  // Создаем карту остатков по nmId для быстрого поиска
  const stocksMap = stocks.reduce((acc: any, stock: any) => {
    acc[stock.nmId] = stock
    return acc
  }, {})

  const staticProducts = [
    {
      id: 1,
      name: "Автоклав Чап",
      description: "Новинка сезона",
      price: "12 500 ₽",
      avatar: "АЧ",
    },
    {
      id: 2,
      name: "Комбо пак",
      description: "Новинка сезона",
      price: "18 900 ₽",
      avatar: "КП",
    },
  ]

  if (products.length === 0 && staticProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="w-12 h-12 mx-auto mb-4 text-gray-500" />
        <p className="text-gray-400 mb-2">Нет товаров для отображения</p>
        <p className="text-gray-500 text-sm">Проверьте настройки API</p>
      </div>
    )
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + 4)

  const nextSlide = () => {
    if (currentIndex + 4 < products.length) {
      setCurrentIndex(currentIndex + 4)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - 4))
    }
  }

  return (
    <div className="relative space-y-4">
      <div className="flex gap-4 overflow-hidden">
        {visibleProducts.map((product: any) => {
          const stock = stocksMap[product.nmID]
          const mainPhoto = product.photos?.[0]
          const rating = Math.floor(Math.random() * 5) + 1

          return (
            <div key={product.nmID} className="flex-shrink-0 w-48">
              <div className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors">
                <div className="relative">
                  {mainPhoto ? (
                    <img
                      src={mainPhoto.c246x328 || mainPhoto.big || "/placeholder.svg?height=128&width=192&text=Товар"}
                      alt={product.vendorCode}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=128&width=192&text=Товар"
                      }}
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-600 flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  {stock && (
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">{stock.quantity} шт</Badge>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-white font-medium text-sm mb-2 truncate" title={product.vendorCode}>
                    {product.vendorCode}
                  </h4>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({Math.floor(Math.random() * 100) + 10})</span>
                  </div>
                  {stock && (
                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="text-green-400 font-semibold">{WBApiUtils.formatPrice(stock.Price)}</div>
                      <div>Склад: {stock.warehouseName}</div>
                    </div>
                  )}
                  <Button variant="link" className="text-blue-400 text-xs p-0 h-auto mt-2 hover:text-blue-300">
                    Подробнее
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
        {staticProducts.map((product) => (
          <Card key={product.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{product.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{product.name}</div>
                  <div className="text-gray-400 text-sm">{product.description}</div>
                </div>
                <div className="text-orange-400 font-semibold">{product.price}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation buttons */}
      {products.length > 4 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full w-8 h-8 p-0 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex + 4 >= products.length}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full w-8 h-8 p-0 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {products.length > 4 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(products.length / 4) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * 4)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / 4) === i ? "bg-blue-400" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-white font-semibold">{products.length + staticProducts.length}</div>
            <div className="text-gray-400">Всего товаров</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">{stocks.length}</div>
            <div className="text-gray-400">На складах</div>
          </div>
          <div className="text-center">
            <div className="text-white font-semibold">{WBApiUtils.calculateTotal(stocks, "quantity")}</div>
            <div className="text-gray-400">Общий остаток</div>
          </div>
        </div>
      </div>
    </div>
  )
}
