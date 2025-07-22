export function CPMSegments() {
  const segments = [
    { range: "945 ₽ — 1150 ₽", percent: "6%" },
    { range: "740 ₽ — 945 ₽", percent: "5%" },
    { range: "535 ₽ — 740 ₽", percent: "11%" },
    { range: "330 ₽ — 535 ₽", percent: "21%" },
    { range: "125 ₽ — 330 ₽", percent: "24%" },
  ]

  const cpmData = [
    { metric: "Мин. CPM", top0_5: "737 ₽", top5_10: "360 ₽", top10_20: "250 ₽", top20_50: "125 ₽", top50_100: "125 ₽" },
    {
      metric: "Макс. CPM",
      top0_5: "1100 ₽",
      top5_10: "1150 ₽",
      top10_20: "600 ₽",
      top20_50: "1100 ₽",
      top50_100: "1000 ₽",
    },
    {
      metric: "Средний CPM",
      top0_5: "873 ₽",
      top5_10: "665 ₽",
      top10_20: "400 ₽",
      top20_50: "464 ₽",
      top50_100: "307 ₽",
    },
  ]

  return (
    <div className="space-y-6">
      {/* CPM Distribution */}
      <div className="space-y-3">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-8 text-right text-sm text-gray-600">{segment.percent}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 flex items-center px-3">
              <span className="text-sm text-gray-700">{segment.range}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CPM Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-medium text-gray-700">Метрика</th>
              <th className="text-center p-3 font-medium text-gray-700">Топ 0—5</th>
              <th className="text-center p-3 font-medium text-gray-700">Топ 5—10</th>
              <th className="text-center p-3 font-medium text-gray-700">Топ 10—20</th>
              <th className="text-center p-3 font-medium text-gray-700">Топ 20—50</th>
              <th className="text-center p-3 font-medium text-gray-700">Топ 50—100</th>
            </tr>
          </thead>
          <tbody>
            {cpmData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="p-3 font-medium text-gray-800">{row.metric}</td>
                <td className="p-3 text-center text-gray-700">{row.top0_5}</td>
                <td className="p-3 text-center text-gray-700">{row.top5_10}</td>
                <td className="p-3 text-center text-gray-700">{row.top10_20}</td>
                <td className="p-3 text-center text-gray-700">{row.top20_50}</td>
                <td className="p-3 text-center text-gray-700">{row.top50_100}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
