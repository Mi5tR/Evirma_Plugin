"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsMiniProps {
  tabs: Tab[]
}

export function TabsMini({ tabs }: TabsMiniProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id)

  return (
    <div>
      <div className="flex border-b border-slate-600 mb-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-none border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  )
}
