import { Badge } from "@/components/ui/badge"

interface AdvertisingProgressProps {
  segments: Array<{
    label: string
    value: number
    color: string
    textColor: string
  }>
}

export function AdvertisingProgress({ segments }: AdvertisingProgressProps) {
  return (
    <div className="space-y-4">
      <div className="flex rounded-lg overflow-hidden h-12">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`flex items-center justify-center text-white font-medium ${segment.color}`}
            style={{ width: `${segment.value}%` }}
          >
            <div className="text-center">
              <div className="text-sm font-semibold">{segment.label}</div>
              <div className="text-xs">{segment.value}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Все</span>
          <Badge variant="secondary" className="bg-gray-100">
            100
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Авто</span>
          <Badge variant="secondary" className="bg-gray-100">
            44
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Аукцион</span>
          <Badge variant="secondary" className="bg-gray-100">
            29
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Органика</span>
          <Badge variant="secondary" className="bg-gray-100">
            27
          </Badge>
        </div>
      </div>
    </div>
  )
}
