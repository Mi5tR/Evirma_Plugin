"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Warehouse, MapPin, Clock, Package, TrendingUp, Plus } from "lucide-react"
import { useWarehouses, useStocksData } from "@/lib/hooks/use-wildberries-data"

export function WarehousesSection() {
  const { data: warehouses, loading: warehousesLoading, error: warehousesError } = useWarehouses()
  const { data: stocksData, loading: stocksLoading, error: stocksError } = useStocksData()

  const loading = warehousesLoading || stocksLoading
  const error = warehousesError || stocksError

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

        {/* Warehouse List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg animate-pulse">
                  <div className="w-12 h-12 bg-gray-600 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-600 rounded" />
                    <div className="h-3 bg-gray-600 rounded w-32" />
                  </div>
                  <div className="w-20 h-4 bg-gray-600 rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Warehouse className="w-12 h-12 mx-auto mb-4 text-gray-500" />
        <p className="text-red-400 mb-2">Ошибка загрузки данных о складах</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    )
  }

  // Calculate warehouse stats
  const totalWarehouses = warehouses?.length || 0
  const activeWarehouses = warehouses?.filter((w: any) => w.acceptsGoods).length || 0
  const totalStock = stocksData?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0
  const averageDeliveryTime = "24 ч" // Mock data

  // Group stocks by warehouse
  const warehouseStocks =
    stocksData?.reduce((acc: any, stock: any) => {
      const warehouseName = stock.warehouseName || "Неизвестно"
      if (!acc[warehouseName]) {
        acc[warehouseName] = []
      }
      acc[warehouseName].push(stock)
      return acc
    }, {}) || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Склады и логистика</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Добавить склад
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Всего складов</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">{totalWarehouses}</h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +1
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">подключено</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Warehouse className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Активные</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">{activeWarehouses}</h3>
                  <span className="flex items-center text-sm text-green-400">100%</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">принимают товары</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Общий остаток</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">{totalStock.toLocaleString()}</h3>
                  <span className="flex items-center text-sm text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    5%
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-1">единиц товара</p>
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
                <p className="text-gray-400 text-sm font-medium">Среднее время</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-2xl font-bold text-white">{averageDeliveryTime}</h3>
                  <span className="flex items-center text-sm text-red-400">+2ч</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">доставки</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warehouses List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Список складов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {warehouses?.map((warehouse: any, index: number) => {
              const warehouseStock = warehouseStocks[warehouse.name] || []
              const stockCount = warehouseStock.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
              const loadPercentage = Math.min(100, (stockCount / 1000) * 100) // Mock calculation

              return (
                <div
                  key={warehouse.ID || index}
                  className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Warehouse className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium">{warehouse.name}</h4>
                      <Badge variant={warehouse.acceptsGoods ? "default" : "secondary"} className="text-xs">
                        {warehouse.acceptsGoods ? "Активен" : "Неактивен"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {warehouse.address}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {warehouse.workTime}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-white font-medium">{stockCount.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">единиц товара</div>
                  </div>

                  <div className="flex flex-col items-end gap-2 min-w-[100px]">
                    <div className="text-sm text-gray-400">Загрузка</div>
                    <div className="flex items-center gap-2 w-full">
                      <Progress value={loadPercentage} className="flex-1 h-2" />
                      <span className="text-xs text-gray-300 min-w-[35px]">{Math.round(loadPercentage)}%</span>
                    </div>
                  </div>
                </div>
              )
            }) || (
              <div className="text-center py-8">
                <Warehouse className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400">Нет данных о складах</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Warehouse Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Производительность складов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {warehouses?.slice(0, 5).map((warehouse: any, index: number) => {
                const warehouseStock = warehouseStocks[warehouse.name] || []
                const stockValue = warehouseStock.reduce(
                  (sum: number, item: any) => sum + (item.Price || 0) * (item.quantity || 0),
                  0,
                )

                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-white font-medium">{warehouse.name}</div>
                        <div className="text-gray-400 text-sm">{warehouseStock.length} товаров</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">{(stockValue / 1000).toFixed(0)}K ₽</div>
                      <div className="text-gray-400 text-sm">стоимость</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Распределение товаров</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(warehouseStocks)
                .slice(0, 5)
                .map(([warehouseName, stocks]: [string, any]) => {
                  const stockCount = stocks.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
                  const percentage = totalStock > 0 ? (stockCount / totalStock) * 100 : 0

                  return (
                    <div key={warehouseName} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">{warehouseName}</span>
                        <span className="text-gray-400 text-sm">
                          {stockCount} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
