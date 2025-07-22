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

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left p-3 text-sm font-medium text-slate-300">Артикул</th>
            <th className="text-left p-3 text-sm font-medium text-slate-300">Бренд</th>
            <th className="text-left p-3 text-sm font-medium text-slate-300">Название</th>
            <th className="text-left p-3 text-sm font-medium text-slate-300">Тип</th>
            <th className="text-left p-3 text-sm font-medium text-slate-300">Позиция</th>
            <th className="text-left p-3 text-sm font-medium text-slate-300">СРМ</th>
            <th className="text-left p-3 text-sm font-medium text-slate-300">Доставка</th>
            <th className="text-left p-3 text-sm font-medium text-slate-300">Промо</th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  {product.image && (
                    <img
                      src={product.image || "/placeholder.svg?height=32&width=32"}
                      alt=""
                      className="w-8 h-8 rounded object-cover"
                    />
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-blue-400 font-mono text-sm">{product.article}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-white">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </td>
              <td className="p-3 text-slate-200 text-sm">{product.brand}</td>
              <td className="p-3 text-slate-200 text-sm max-w-xs truncate">{product.name}</td>
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
              <td className="p-3 text-slate-200 text-sm">
                {product.orgPos} → {product.rekPos}
              </td>
              <td className="p-3 text-slate-200 text-sm">{product.cpm} ₽</td>
              <td className="p-3 text-slate-200 text-sm">{product.delivery} ч</td>
              <td className="p-3">
                {product.promo && (
                  <span className="text-xs text-orange-300 bg-orange-900/30 px-2 py-1 rounded">{product.promo}</span>
                )}
              </td>
              <td className="p-3">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-white">
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
