"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function DataTables() {
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
      image: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      article: "365286181",
      brand: "Автоклав До...",
      name: "Автоклав Кулинар, 36 литров",
      type: "AUKC" as const,
      orgPos: 120,
      rekPos: 5,
      cpm: 737,
      delivery: 66,
      promo: "",
      image: "/placeholder.svg?height=32&width=32",
    },
  ]

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Товары в рекламе</CardTitle>
        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
          Экспорт
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-700/50">
                <th className="text-left p-3 font-medium text-gray-300">Товар</th>
                <th className="text-left p-3 font-medium text-gray-300">Тип</th>
                <th className="text-left p-3 font-medium text-gray-300">Орг. поз.</th>
                <th className="text-left p-3 font-medium text-gray-300">Рек. поз.</th>
                <th className="text-left p-3 font-medium text-gray-300">CPM</th>
                <th className="text-left p-3 font-medium text-gray-300">Доставка</th>
                <th className="text-left p-3 font-medium text-gray-300">Акция</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-700/30">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image || "/placeholder.svg"} alt="" className="w-8 h-8 rounded bg-gray-600" />
                      <div>
                        <div className="text-white font-medium text-sm">{product.name}</div>
                        <div className="text-gray-400 text-xs">
                          {product.brand} • {product.article}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant={product.type === "AUKC" ? "default" : "secondary"} className="text-xs">
                      {product.type}
                    </Badge>
                  </td>
                  <td className="p-3 text-gray-300">{product.orgPos}</td>
                  <td className="p-3 text-gray-300">{product.rekPos}</td>
                  <td className="p-3 text-gray-300">{product.cpm} ₽</td>
                  <td className="p-3 text-gray-300">{product.delivery} ч</td>
                  <td className="p-3">
                    {product.promo && (
                      <Badge variant="outline" className="text-orange-400 border-orange-400 text-xs">
                        {product.promo}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
