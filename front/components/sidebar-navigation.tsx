"use client"

import { Home, BarChart3, Megaphone, Settings, Search, Warehouse } from "lucide-react"

interface SidebarNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SidebarNavigation({ activeSection, onSectionChange }: SidebarNavigationProps) {
  const menuItems = [
    { id: "overview", title: "Обзор", icon: Home },
    { id: "advertising", title: "Реклама", icon: Megaphone },
    { id: "analytics", title: "Аналитика", icon: BarChart3 },
    { id: "search", title: "Поиск", icon: Search },
    { id: "warehouses", title: "Склады", icon: Warehouse },
    { id: "settings", title: "Настройки", icon: Settings },
  ]

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-white text-xl font-bold">Exoad</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-gray-300 text-sm">П</span>
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-medium">Пользователь</div>
            <div className="text-gray-400 text-xs">API подключен</div>
          </div>
        </div>
      </div>
    </div>
  )
}
