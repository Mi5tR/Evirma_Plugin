import type React from "react"

interface DashboardCardProps {
  title: string
  children: React.ReactNode
  className?: string
  headerActions?: React.ReactNode
}

export function DashboardCard({ title, children, className = "", headerActions }: DashboardCardProps) {
  return (
    <div className={`bg-slate-800 rounded-lg border border-slate-700 ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {headerActions}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
