"use client"

import type React from "react"

import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SectionCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}

export function SectionCard({ title, icon, children, defaultExpanded = true, className = "" }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-500">{icon}</div>}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          скрыть блок
          <ChevronUp className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? "" : "rotate-180"}`} />
        </Button>
      </div>
      {isExpanded && <div className="p-4">{children}</div>}
    </div>
  )
}
