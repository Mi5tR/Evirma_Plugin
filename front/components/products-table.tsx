import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"

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

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left p-3 font-medium text-gray-700">Артикул</th>
            <th className="text-left p-3 font-medium text-gray-700">Бренд</th>
            <th className="text-left p-3 font-medium text-gray-700">Название</th>
            <th className="text-left p-3 font-medium text-gray-700">Тип РК</th>
            <th className="text-left p-3 font-medium text-gray-700">Орг поз</th>
            <th className="text-center p-3 font-medium text-gray-700">→</th>
            <th className="text-left p-3 font-medium text-gray-700">Рек поз</th>
            <th className="text-left p-3 font-medium text-gray-700">СРМ, ₽</th>
            <th className="text-left p-3 font-medium text-gray-700">Доставка, ч.</th>
            <th className="text-left p-3 font-medium text-gray-700">Промо</th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  {product.image && (
                    <img src={product.image || "/placeholder.svg"} alt="" className="w-10 h-10 rounded object-cover" />
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-mono text-sm">{product.article}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </td>
              <td className="p-3 text-gray-900">{product.brand}</td>
              <td className="p-3 text-gray-900 max-w-xs truncate">{product.name}</td>
              <td className="p-3">
                <Badge
                  variant={product.type === "AUKC" ? "default" : "destructive"}
                  className={
                    product.type === "AUKC"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {product.type}
                </Badge>
              </td>
              <td className="p-3 text-gray-900 font-medium">{product.orgPos}</td>
              <td className="p-3 text-center text-gray-400">→</td>
              <td className="p-3 text-gray-900 font-medium">{product.rekPos}</td>
              <td className="p-3 text-gray-900 font-medium">{product.cpm}</td>
              <td className="p-3 text-gray-900">{product.delivery}</td>
              <td className="p-3">
                {product.promo && (
                  <span className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded-full">{product.promo}</span>
                )}
              </td>
              <td className="p-3">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
