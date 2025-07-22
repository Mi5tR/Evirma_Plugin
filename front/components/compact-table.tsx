import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react"

interface CompactProduct {
  article: string
  name: string
  type: "AUKC" | "APK"
  position: number
  change: number
  cpm: number
}

interface CompactTableProps {
  products: CompactProduct[]
}

export function CompactTable({ products }: CompactTableProps) {
  return (
    <div className="space-y-3">
      {products.map((product, index) => (
        <div key={index} className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Badge
                variant={product.type === "AUKC" ? "default" : "destructive"}
                className={product.type === "AUKC" ? "bg-blue-600 text-white text-sm" : "bg-red-600 text-white text-sm"}
              >
                {product.type}
              </Badge>
              <span className="text-blue-400 font-mono text-sm">{product.article}</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-slate-200 text-base font-medium mb-2 truncate">{product.name}</div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Позиция:</span>
              <span className="text-white font-medium">{product.position}</span>
              {product.change !== 0 && (
                <div className={`flex items-center gap-1 ${product.change > 0 ? "text-red-400" : "text-green-400"}`}>
                  {product.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{Math.abs(product.change)}</span>
                </div>
              )}
            </div>
            <div className="text-slate-300 font-medium">{product.cpm} ₽</div>
          </div>
        </div>
      ))}
    </div>
  )
}
