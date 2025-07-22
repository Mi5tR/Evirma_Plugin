"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TopMenuItems() {
  const items = [
    { name: "Автоклав ГлавАвтоклав", sales: "45 продаж", price: "15,990 ₽" },
    { name: "Автоклав Кулинар 36л", sales: "32 продажи", price: "12,500 ₽" },
    { name: "Автоклав Fansel 3", sales: "28 продаж", price: "18,900 ₽" },
  ]

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Топ товары</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div>
                <div className="text-white font-medium text-sm">{item.name}</div>
                <div className="text-gray-400 text-xs">{item.sales}</div>
              </div>
              <div className="text-green-400 font-semibold">{item.price}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
