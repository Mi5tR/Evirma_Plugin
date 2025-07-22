import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface Product {
  id: string
  article: string
  brand: string
  name: string
  type: "AUKC" | "APK"
  orgPos: number
  rekPos: number
  cpm: number
  delivery: number
  promo: string
  image?: string
}

interface DataTableProps {
  products: Product[]
}

export function DataTable({ products }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-2 font-medium text-gray-600">Артикул</th>
            <th className="text-left p-2 font-medium text-gray-600">Бренд</th>
            <th className="text-left p-2 font-medium text-gray-600">Название</th>
            <th className="text-left p-2 font-medium text-gray-600">Тип РК</th>
            <th className="text-left p-2 font-medium text-gray-600">Орг поз</th>
            <th className="text-left p-2 font-medium text-gray-600">→</th>
            <th className="text-left p-2 font-medium text-gray-600">Рек поз</th>
            <th className="text-left p-2 font-medium text-gray-600">СРМ, ₽</th>
            <th className="text-left p-2 font-medium text-gray-600">Доставка, ч.</th>
            <th className="text-left p-2 font-medium text-gray-600">Промо</th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-2">
                <div className="flex items-center gap-2">
                  {product.image && (
                    <img src={product.image || "/placeholder.svg"} alt="" className="w-8 h-8 rounded object-cover" />
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-mono">{product.article}</span>
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </td>
              <td className="p-2 text-gray-900">{product.brand}</td>
              <td className="p-2 text-gray-900 max-w-xs truncate">{product.name}</td>
              <td className="p-2">
                <Badge
                  variant={product.type === "AUKC" ? "default" : "destructive"}
                  className={product.type === "AUKC" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}
                >
                  {product.type}
                </Badge>
              </td>
              <td className="p-2 text-gray-900">{product.orgPos}</td>
              <td className="p-2 text-gray-400">→</td>
              <td className="p-2 text-gray-900">{product.rekPos}</td>
              <td className="p-2 text-gray-900">{product.cpm}</td>
              <td className="p-2 text-gray-900">{product.delivery}</td>
              <td className="p-2">
                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">{product.promo}</span>
              </td>
              <td className="p-2">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Copy className="w-3 h-3" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
