import { AnalyticsSection } from "./components/analytics-section"
import { ProgressBar } from "./components/progress-bar"
import { DataTable } from "./components/data-table"
import { StatsGrid } from "./components/stats-grid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Package, ExternalLink, Settings } from "lucide-react"

const mockProducts = [
  {
    id: "1",
    article: "148023951",
    brand: "ГрадусОК.рф",
    name: "Автоклав ГлавАвтоклав ...",
    type: "AUKC" as const,
    orgPos: 124,
    rekPos: 4,
    cpm: 770,
    delivery: 89,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    article: "365286181",
    brand: "Автоклав До...",
    name: "Автоклав Кулинар, 36 л...",
    type: "AUKC" as const,
    orgPos: 120,
    rekPos: 5,
    cpm: 737,
    delivery: 66,
    promo: "",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    article: "423181497",
    brand: "Русская дым...",
    name: "Автоклав Fansel 3 элект...",
    type: "AUKC" as const,
    orgPos: 274,
    rekPos: 6,
    cpm: 1150,
    delivery: 85,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    article: "137633496",
    brand: "Фабрика Заг...",
    name: "Автоклав Заготовщик 2...",
    type: "APK" as const,
    orgPos: 83,
    rekPos: 7,
    cpm: 600,
    delivery: 18,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    article: "133994108",
    brand: "Фабрика Заг...",
    name: "Автоклав Заготовщик 1...",
    type: "APK" as const,
    orgPos: 97,
    rekPos: 8,
    cpm: 600,
    delivery: 90,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=32&width=32",
  },
]

export default function WildberriesExtension() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Реклама на странице */}
        <AnalyticsSection title="Реклама на странице" icon={<BarChart3 className="w-5 h-5" />}>
          <div className="space-y-4">
            <ProgressBar
              segments={[
                { label: "AUKC", value: 29, color: "bg-blue-500" },
                { label: "APK", value: 44, color: "bg-red-400" },
                { label: "без рекламы", value: 27, color: "bg-gray-300" },
              ]}
            />

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>
                  Все <Badge variant="secondary">100</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  Авто <Badge variant="secondary">44</Badge>
                </span>
              {/* </div> }
              <div className="flex items-center gap-2">
                <span>
                  Аукцион <Badge variant="secondary">29</Badge>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  Органика <Badge variant="secondary">27</Badge>
                </span>
              </div>
            </div>

            <DataTable products={mockProducts} />

            <Button variant="link" className="text-blue-600 p-0">
              Показать сегменты CPM →
            </Button>
          </div>
        </AnalyticsSection>

        {/* Сегментация топа */}
        <AnalyticsSection title="Сегментация топа" icon={<TrendingUp className="w-5 h-5" />}>
          <div className="space-y-6">
            <ProgressBar
              segments={[
                { label: "Old", value: 97, color: "bg-gray-400" },
                { label: "New", value: 3, color: "bg-blue-500" },
              ]}
            />

            <ProgressBar
              segments={[
                { label: "без акции", value: 17, color: "bg-gray-300" },
                { label: "ЖАРКИЕ СКИДКИ", value: 83, color: "bg-blue-500" },
              ]}
            />

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Категории</h4>
                <div className="space-y-1">
                  <div>100% Автоклавы для конс</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Бренды</h4>
                <div className="space-y-1">
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
                <h4 className="font-medium mb-2">Рейтинги</h4>
                <div className="space-y-1">
                  <div>28% 4,9 — 5,0</div>
                  <div>34% 4,6 — 4,8</div>
                  <div>17% 4,3 — 4,5</div>
                  <div>7% 4,0 — 4,2</div>
                  <div>4% 3,3 — 3,8</div>
                  <div>4% 2,0 — 3,0</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Оценки</h4>
                <div className="space-y-1">
                  <div>0% 10 000+</div>
                  <div>4% 1 000 — 10 000</div>
                  <div>25% 100 — 1 000</div>
                  <div>33% 10 — 100</div>
                  <div>32% 0 — 10</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Цвета</h4>
                <div className="space-y-1">
                  <div>3% 34 115 ₽ — 40 989 ₽</div>
                  <div>2% 27 241 ₽ — 34 115 ₽</div>
                  <div>3% 20 366 ₽ — 27 241 ₽</div>
                  <div>48% 13 492 ₽ — 20 366 ₽</div>
                  <div>43% 6 617 ₽ — 13 492 ₽</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Цены</h4>
                <div className="space-y-1">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Медиана</div>
                    <div className="font-medium">14 048 ₽</div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <div className="text-gray-500">Min 6 617 ₽</div>
                      <div className="text-blue-600">189726307</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Max 40 989 ₽</div>
                      <div className="text-blue-600">293846029</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnalyticsSection>

        {/* EVIRMA 2 */}
        <AnalyticsSection
          title="EVIRMA 2"
          icon={<Package className="w-5 h-5" />}
          headerActions={
            <span className="text-sm text-gray-600">
              при поддержке банка <strong>точка</strong>
            </span>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Package className="w-4 h-4" />
                Склады:
              </span>
              <span>
                18 ч. Котовск <Badge variant="secondary">13%</Badge>
              </span>
              <span>
                24 ч. Алексин <Badge variant="secondary">6%</Badge>
              </span>
              <span>
                25 ч. Коледино <Badge variant="secondary">7%</Badge>
              </span>
              <span>
                32 ч. Электросталь <Badge variant="secondary">3%</Badge>
              </span>
              <Button variant="link" className="text-blue-600 text-sm p-0">
                показать все
              </Button>
              <Button className="ml-auto">Приоритеты складов в регионах</Button>
            </div>
          </div>
        </AnalyticsSection>

        {/* Частота запроса */}
        <AnalyticsSection title="Частота запроса" icon={<TrendingUp className="w-5 h-5" />}>
          <div className="space-y-4">
            <StatsGrid
              stats={[
                { label: "Макс:", value: "февраль — 41 285", color: "text-blue-600" },
                { label: "Мин:", value: "май — 20 080", color: "text-blue-600" },
                { label: "Частота / год:", value: "454 545", color: "text-blue-600" },
                { label: "Прогноз на год:", value: "514 545", color: "text-blue-600" },
              ]}
            />

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="h-64 flex items-center justify-center text-gray-500">
                График частоты запросов (здесь будет интерактивный график)
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium mb-2">Сегмент</div>
                <div>месяц 115 110</div>
                <div>сутки 6 211</div>
                <div>тренд ▲ 160%</div>
              </div>
              <div>
                <div className="font-medium mb-2">Кластер</div>
                <div>23 170</div>
                <div>934</div>
                <div>▲ 69%</div>
              </div>
              <div>
                <div className="font-medium mb-2">Запрос</div>
                <div>23 245</div>
                <div>744</div>
                <div>▲ 24%</div>
              </div>
            </div>

            <Button className="bg-purple-600 hover:bg-purple-700">Подбор ключевых фраз</Button>
          </div>
        </AnalyticsSection>

        {/* Анализ позиций */}
        <AnalyticsSection title="Анализ позиций ваших товаров" icon={<Settings className="w-5 h-5" />}>
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm text-orange-800">
                <div className="font-medium mb-2">Для получения данных необходимо:</div>
                <div>
                  перейти на{" "}
                  <a href="#" className="text-blue-600 underline">
                    страницу сервиса WB Partners
                  </a>
                </div>
                <div>вернуться на текущую страницу и повторить запрос</div>
              </div>
            </div>

            <Button variant="link" className="text-blue-600 p-0">
              Проверка позиций артикула по запросу ↓
            </Button>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-800">
                  Для отображения позиций плагин анализирует данные с поисковой выдачи WILDBERRIES для Android
                </span>
                <Button variant="ghost" size="sm" className="text-orange-600">
                  закрыть ✕
                </Button>
              </div>
            </div>
          </div>
        </AnalyticsSection>

        {/* Внешние переходы */}
        <AnalyticsSection title="Внешние переходы" icon={<ExternalLink className="w-5 h-5" />}>
          <div className="text-center py-8 text-gray-500">
            <div className="text-lg mb-2">Нет данных</div>
            <div className="text-sm">Данные о внешних переходах будут отображаться здесь</div>
          </div>
        </AnalyticsSection>
      </div>
    </div>
  )
}
