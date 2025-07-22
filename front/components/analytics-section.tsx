"use client"

import type React from "react"

import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface AnalyticsSectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultExpanded?: boolean
  headerActions?: React.ReactNode
}

export function AnalyticsSection({
  title,
  icon,
  children,
  defaultExpanded = true,
  headerActions,
}: AnalyticsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {icon && <div className="text-blue-500">{icon}</div>}
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {headerActions}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-600"
          >
            скрыть блок
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </div>
      {isExpanded && <div className="p-4">{children}</div>}
    </div>
  )
}
