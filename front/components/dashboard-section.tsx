"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

interface DashboardSectionProps {
  title: string
  children: React.ReactNode
  collapsible?: boolean
  icon?: React.ReactNode
}

export function DashboardSection({ title, children, collapsible = false, icon }: DashboardSectionProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">{icon}</div>}
          <CardTitle className="text-white">{title}</CardTitle>
        </div>
        {collapsible && (
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            скрыть блок <ChevronUp className="w-4 h-4 ml-1" />
          </Button>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
