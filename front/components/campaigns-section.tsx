"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Megaphone } from "lucide-react"

export function CampaignsSection() {
  const campaigns = [
    {
      id: 1,
      name: "Автоклавы - Весна 2024",
      type: "Авто",
      status: "Активна",
      budget: "5 000 ₽",
      views: "45 230",
      clicks: "1 250",
      ctr: "2.76%",
    },
    {
      id: 2,
      name: "Консервирование - Лето",
      type: "Поиск",
      status: "Активна",
      budget: "3 000 ₽",
      views: "32 100",
      clicks: "890",
      ctr: "2.77%",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Управление кампаниями</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
            <Megaphone className="w-4 h-4 mr-2" />
            Создать кампанию
          </Button>
          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Список кампаний</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-700/50">
                  <th className="text-left p-3 font-medium text-gray-300">Название</th>
                  <th className="text-left p-3 font-medium text-gray-300">Тип</th>
                  <th className="text-left p-3 font-medium text-gray-300">Статус</th>
                  <th className="text-left p-3 font-medium text-gray-300">Бюджет</th>
                  <th className="text-left p-3 font-medium text-gray-300">Показы</th>
                  <th className="text-left p-3 font-medium text-gray-300">Клики</th>
                  <th className="text-left p-3 font-medium text-gray-300">CTR</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-800 hover:bg-gray-700/30">
                    <td className="p-3 text-white font-medium">{campaign.name}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {campaign.type}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="default" className="text-xs">
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-gray-300">{campaign.budget}</td>
                    <td className="p-3 text-gray-300">{campaign.views}</td>
                    <td className="p-3 text-gray-300">{campaign.clicks}</td>
                    <td className="p-3 text-green-400">{campaign.ctr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
