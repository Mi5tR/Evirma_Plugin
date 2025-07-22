"use client"
import {
  BarChart3,
  TrendingUp,
  Package,
  Settings,
  ExternalLink,
  Target,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: BarChart3, label: "Обзор", active: true },
  { icon: Target, label: "Реклама", active: false },
  { icon: TrendingUp, label: "Аналитика", active: false },
  { icon: Package, label: "Склады", active: false },
  { icon: ExternalLink, label: "Переходы", active: false },
  { icon: Settings, label: "Настройки", active: false },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <div className={`bg-slate-800 h-screen transition-all duration-300 ${collapsed ? "w-16" : "w-64"} flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold text-white">WB Analytics</h1>}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full justify-start text-left ${
              item.active
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-slate-300 hover:text-white hover:bg-slate-700"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </Button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Выход</span>}
        </Button>
      </div>
    </div>
  )
}
