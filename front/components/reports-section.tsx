"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

export function ReportsSection() {
  const reports = [
    { name: "Продажи за декабрь 2024", date: "15.12.2024", size: "2.3 MB" },
    { name: "Реклама за ноябрь 2024", date: "01.12.2024", size: "1.8 MB" },
    { name: "Остатки на складах", date: "10.12.2024", size: "0.9 MB" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Отчеты и экспорт</h2>
        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white bg-transparent">
          <FileText className="w-4 h-4 mr-2" />
          Создать отчет
        </Button>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Отчет по продажам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">Детальная информация о продажах за выбранный период</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Скачать Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Отчет по рекламе</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">Статистика по всем рекламным кампаниям</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Скачать Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Отчет по остаткам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">Текущие остатки товаров на всех складах</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Скачать Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Последние отчеты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-white font-medium text-sm">{report.name}</div>
                    <div className="text-gray-400 text-xs">
                      {report.date} • {report.size}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
