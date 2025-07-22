export function SegmentationGrid() {
  return (
    <div className="space-y-6">
      {/* Progress bars */}
      <div className="space-y-4">
        <div className="flex rounded-lg overflow-hidden h-10">
          <div className="bg-gray-400 flex items-center justify-center text-white font-medium" style={{ width: "97%" }}>
            <span className="text-sm">Old 97%</span>
          </div>
          <div className="bg-blue-500 flex items-center justify-center text-white font-medium" style={{ width: "3%" }}>
            <span className="text-xs">New 3%</span>
          </div>
        </div>

        <div className="flex rounded-lg overflow-hidden h-10">
          <div
            className="bg-gray-300 flex items-center justify-center text-gray-700 font-medium"
            style={{ width: "17%" }}
          >
            <span className="text-sm">без акции 17%</span>
          </div>
          <div className="bg-blue-500 flex items-center justify-center text-white font-medium" style={{ width: "83%" }}>
            <span className="text-sm">ЖАРКИЕ СКИДКИ 83%</span>
          </div>
        </div>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-6 gap-6 text-sm">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Категории</h4>
          <div className="space-y-1 text-gray-600">
            <div>100% Автоклавы для конс</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Бренды</h4>
          <div className="space-y-1 text-gray-600">
            <div>21% Геликон Пром</div>
            <div>15% Фабрика Заготов...</div>
            <div>11% Novogas</div>
            <div>9% Настойчивый хозя...</div>
            <div>9% Малиновка</div>
            <div>7% Автоклав Добрый ...</div>
            <div>6% Русская дымка</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Рейтинги</h4>
          <div className="space-y-1 text-gray-600">
            <div>28% 4,9 — 5,0</div>
            <div>34% 4,6 — 4,8</div>
            <div>17% 4,3 — 4,5</div>
            <div>7% 4,0 — 4,2</div>
            <div>4% 3,3 — 3,8</div>
            <div>4% 2,0 — 3,0</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Оценки</h4>
          <div className="space-y-1 text-gray-600">
            <div>0% 10 000+</div>
            <div>4% 1 000 — 10 000</div>
            <div>25% 100 — 1 000</div>
            <div>33% 10 — 100</div>
            <div>32% 0 — 10</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Цвета</h4>
          <div className="space-y-1 text-gray-600">
            <div>3% 34 115 ₽ — 40 989 ₽</div>
            <div>2% 27 241 ₽ — 34 115 ₽</div>
            <div>3% 20 366 ₽ — 27 241 ₽</div>
            <div>48% 13 492 ₽ — 20 366 ₽</div>
            <div>43% 6 617 ₽ — 13 492 ₽</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Цены</h4>
          <div className="space-y-2 text-gray-600">
            <div className="text-right">
              <div className="text-xs text-gray-500">Медиана</div>
              <div className="font-semibold text-gray-800">14 048 ₽</div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div>
                <div className="text-gray-500">Min 6 617 ₽</div>
                <div className="text-blue-600 font-mono">189726307</div>
              </div>
              <div className="text-right">
                <div className="text-gray-500">Max 40 989 ₽</div>
                <div className="text-blue-600 font-mono">293846029</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
