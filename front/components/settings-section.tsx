"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Key, Bell, RefreshCw, Download, Shield, User, Settings } from "lucide-react"
import { WBApiUtils, wbAPI } from "@/lib/wildberries-api"

export function SettingsSection() {
  const [apiKey, setApiKey] = useState("")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    WBApiUtils.getApiKey().then(setApiKey)
  }, [])

  const handleSaveApiKey = async () => {
    setSaving(true)
    try {
      await WBApiUtils.setApiKey(apiKey)
      // Update the API instance
      ;(wbAPI as any).apiKey = apiKey
      alert("API ключ успешно сохранен!")
    } catch (error) {
      alert("Ошибка при сохранении API ключа")
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      alert("Введите API ключ")
      return
    }

    setSaving(true)
    try {
      // Test API connection by trying to fetch warehouses
      const testAPI = new (wbAPI.constructor as any)(apiKey)
      await testAPI.getWarehouses()
      alert("Подключение успешно!")
    } catch (error) {
      alert("Ошибка подключения. Проверьте API ключ.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Настройки</h2>
        <Badge variant="secondary" className="bg-green-600 text-white">
          Подключено
        </Badge>
      </div>

      {/* API Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Key className="w-5 h-5" />
            Настройки API Wildberries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key" className="text-sm font-medium text-gray-300 mb-2 block">
              API ключ поставщика
            </Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Введите ваш API ключ Wildberries"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <p className="text-gray-400 text-xs mt-1">
              Получите API ключ в личном кабинете поставщика Wildberries в разделе "Настройки" → "Доступ к API"
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveApiKey}
              disabled={saving || !apiKey.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Сохранение..." : "Сохранить ключ"}
            </Button>
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={saving || !apiKey.trim()}
              className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
            >
              Тест подключения
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Общие настройки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white font-medium">Автообновление данных</Label>
              <p className="text-gray-400 text-sm">Обновлять данные каждые 15 минут</p>
            </div>
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white font-medium">Уведомления</Label>
              <p className="text-gray-400 text-sm">Получать уведомления о важных событиях</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-white font-medium">Темная тема</Label>
              <p className="text-gray-400 text-sm">Использовать темное оформление интерфейса</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Управление данными
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Обновить все данные
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Экспорт настроек
            </Button>
          </div>

          <Separator className="bg-gray-700" />

          <div className="space-y-2">
            <Label className="text-white font-medium">Очистка кэша</Label>
            <p className="text-gray-400 text-sm mb-3">Удалить все сохраненные данные и начать заново</p>
            <Button variant="destructive" size="sm">
              Очистить кэш
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Информация об аккаунте
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Статус подключения</Label>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white">Подключено</span>
              </div>
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Последнее обновление</Label>
              <div className="text-white mt-1">{new Date().toLocaleString("ru-RU")}</div>
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Версия расширения</Label>
              <div className="text-white mt-1">1.0.0</div>
            </div>
            <div>
              <Label className="text-gray-400 text-sm">Лимиты API</Label>
              <div className="text-white mt-1">1000/1000 запросов</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Настройки уведомлений
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Низкие остатки</Label>
                <p className="text-gray-400 text-sm">Уведомлять когда остаток товара меньше 10 единиц</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Изменения в рекламе</Label>
                <p className="text-gray-400 text-sm">Уведомлять об изменениях в рекламных кампаниях</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Еженедельные отчеты</Label>
                <p className="text-gray-400 text-sm">Получать сводку по продажам каждую неделю</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
