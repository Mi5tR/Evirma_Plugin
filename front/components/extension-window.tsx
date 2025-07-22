"use client"

import type React from "react"

import { useState } from "react"
import { X, Minus, Maximize2, Minimize2, GripHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExtensionWindowProps {
  children: React.ReactNode
  title: string
  onClose?: () => void
  onMinimize?: () => void
}

export function ExtensionWindow({ children, title, onClose, onMinimize }: ExtensionWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return (
    <div
      className={`fixed top-4 right-4 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl transition-all duration-300 ${
        isMaximized ? "w-[95vw] h-[95vh]" : "w-[420px] h-[600px]"
      } z-[9999] overflow-hidden`}
      style={{ resize: isMaximized ? "none" : "both" }}
    >
      {/* Window Header */}
      <div
        className={`bg-slate-700 border-b border-slate-600 px-4 py-2 flex items-center justify-between cursor-move ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-white text-sm font-medium">{title}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-slate-600 rounded"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMaximize}
            className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-slate-600 rounded"
          >
            {isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-auto">{children}</div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize">
          <GripHorizontal className="w-3 h-3 text-slate-500 rotate-45 absolute bottom-1 right-1" />
        </div>
      )}
    </div>
  )
}
