"use client"

import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TopNavigation({ activeTab, onTabChange }: TopNavigationProps) {
  const tabs = [
    { id: "products", label: "Товары" },
    { id: "campaigns", label: "Кампании" },
    { id: "reports", label: "Отчеты" },
  ]

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-blue-400 border-blue-400"
                  : "text-gray-400 border-transparent hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="поиск здесь"
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 text-gray-300">
            <User className="w-5 h-5" />
            <span className="text-sm">Привет, Пользователь</span>
          </div>
        </div>
      </div>
    </div>
  )
}
