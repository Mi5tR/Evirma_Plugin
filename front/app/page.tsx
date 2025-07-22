"use client"

import { useState, useEffect } from "react"
import { ApiKeySetup } from "@/components/api-key-setup"
import { WBApiUtils } from "@/lib/wildberries-api"
import { Button } from "@/components/ui/button"
import { BarChart3, Package, Megaphone, Warehouse } from "lucide-react"
import WildberriesDarkDashboard from "../wildberries-dark-dashboard"

export default function Dashboard() {
  const [apiKey, setApiKey] = useState("")
  const [showSetup, setShowSetup] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Проверяем наличие API ключа при загрузке
    WBApiUtils.getApiKey().then((key) => {
      setApiKey(key)
      if (!key) {
        setShowSetup(true)
      }
    })
  }, [])

  const handleApiKeySet = (newApiKey: string) => {
    setApiKey(newApiKey)
    setShowSetup(false)
  }

  const tabs = [
    { id: "overview", label: "Обзор", icon: BarChart3 },
    { id: "products", label: "Товары", icon: Package },
    { id: "advertising", label: "Реклама", icon: Megaphone },
    { id: "warehouses", label: "Склады", icon: Warehouse },
  ]

  if (showSetup || !apiKey) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Exoad WB Analytics</h1>
            <p className="text-muted-foreground">Профессиональная аналитика для продавцов Wildberries</p>
          </div>

          <ApiKeySetup onApiKeySet={handleApiKeySet} />

          {apiKey && (
            <div className="mt-6 text-center">
              <Button onClick={() => setShowSetup(false)}>Перейти к дашборду</Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <WildberriesDarkDashboard />
    </div>
  )
}
