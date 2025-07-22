"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Key, ExternalLink } from "lucide-react"
import { WBApiUtils } from "@/lib/wildberries-api"

interface ApiKeySetupProps {
  onApiKeySet?: (apiKey: string) => void
}

export function ApiKeySetup({ onApiKeySet }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentApiKey, setCurrentApiKey] = useState("")

  useEffect(() => {
    // Загружаем текущий API ключ
    WBApiUtils.getApiKey().then((key) => {
      setCurrentApiKey(key)
      setApiKey(key)
    })
  }, [])

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) return

    setIsLoading(true)
    try {
      await WBApiUtils.setApiKey(apiKey.trim())
      setCurrentApiKey(apiKey.trim())
      onApiKeySet?.(apiKey.trim())
    } catch (error) {
      console.error("Ошибка сохранения API ключа:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearApiKey = async () => {
    setIsLoading(true)
    try {
      await WBApiUtils.setApiKey("")
      setCurrentApiKey("")
      setApiKey("")
      onApiKeySet?.("")
    } catch (error) {
      console.error("Ошибка очистки API ключа:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Настройка API Wildberries
        </CardTitle>
        <CardDescription>
          Для получения реальных данных аналитики необходимо указать API ключ от Wildberries
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p>Для получения API ключа:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Войдите в личный кабинет поставщика Wildberries</li>
                <li>Перейдите в раздел "Настройки" → "Доступ к API"</li>
                <li>Создайте новый токен с правами на чтение аналитики</li>
                <li>Скопируйте полученный токен и вставьте его ниже</li>
              </ol>
              <a
                href="https://seller.wildberries.ru/supplier-settings/access-to-api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
              >
                Открыть настройки API <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="apiKey">API ключ Wildberries</Label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Вставьте ваш API ключ здесь..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {currentApiKey && (
          <Alert>
            <AlertDescription>✅ API ключ сохранен и готов к использованию</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button onClick={handleSaveApiKey} disabled={!apiKey.trim() || isLoading} className="flex-1">
            {isLoading ? "Сохранение..." : "Сохранить API ключ"}
          </Button>

          {currentApiKey && (
            <Button variant="outline" onClick={handleClearApiKey} disabled={isLoading}>
              Очистить
            </Button>
          )}
        </div>

        <Alert>
          <AlertDescription className="text-sm">
            <strong>Безопасность:</strong> API ключ сохраняется локально в вашем браузере и не передается третьим лицам.
            Расширение использует его только для прямых запросов к API Wildberries.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
