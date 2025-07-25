import fetch from 'node-fetch';
import { Sidebar } from "./components/sidebar"
import { DashboardCard } from "./components/dashboard-card"
import { StatsCard } from "./components/stats-card"
import { ProgressIndicator } from "./components/progress-indicator"
import { ProductTable } from "./components/product-table"
import { ChartPlaceholder } from "./components/chart-placeholder"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, User, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from 'react';

interface Ad {
    article: number;
    brand: string | null;
    name: string;
    orgPos: number;
    rekPos: number;
    cpm: number;
    delivery: number;
    promo: string | null;
    id: string;
    type: string;
    image: string | null;
}

async function fetchAds(keyword: string): Promise<Ad[]> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // Таймаут 10 секунд

    try {
        const response = await fetch('http://127.0.0.1:8000/ad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword }),
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
        }

        const data = await response.json() as Ad[];
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}

// AdssComponent removed to avoid duplicate default export.
// If you need to use AdssComponent, export it as a named export instead:

export function AdsComponent() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const loadAds = async (keyword: string) => {
        setLoading(true);
        try {
            const data = await fetchAds(keyword);
            setAds(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            setAds([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAds('компьютер'); // Тестовое ключевое слово
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            <h1>Объявления</h1>
            {ads.length === 0 ? (
                <p>Нет данных для отображения</p>
            ) : (
                <ul>
                    {ads.map(ad => (
                        <li key={ad.id}>
                            {ad.name} - {ad.brand || 'Без бренда'} (CPM: {ad.cpm} ₽)
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const mockProducts = [
  {
    id: "1",
    article: "148023951",
    brand: "ГрадусОК.рф",
    name: "Автоклав ГлавАвтоклав для консервирования",
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
    name: "Автоклав Кулинар, 36 литров",
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
    name: "Автоклав Fansel 3 электрический",
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
    name: "Автоклав Заготовщик 2 поколения",
    type: "APK" as const,
    orgPos: 83,
    rekPos: 7,
    cpm: 600,
    delivery: 18,
    promo: "ЖАРКИЕ СКИДКИ",
    image: "/placeholder.svg?height=32&width=32",
  },
]

export default function WildberriesDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-semibold text-white">Аналитика товаров</h1>
              <nav className="flex gap-6">
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Обзор
                </Button>
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Отчеты
                </Button>
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Настройки
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Общий оборот"
              value="2.4M ₽"
              subtitle="за месяц"
              trend={{ value: "12%", positive: true }}
              color="blue"
            />
            <StatsCard
              title="Активные товары"
              value="156"
              subtitle="в продаже"
              trend={{ value: "8%", positive: true }}
              color="green"
            />
            <StatsCard
              title="Средний CPM"
              value="850 ₽"
              subtitle="по рекламе"
              trend={{ value: "3%", positive: false }}
              color="purple"
            />
            <StatsCard
              title="Конверсия"
              value="4.2%"
              subtitle="средняя"
              trend={{ value: "15%", positive: true }}
              color="orange"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardCard title="Статистика продаж">
              <ChartPlaceholder title="График продаж за период" height="h-64" />
            </DashboardCard>

            <DashboardCard
              title="Топ товары"
              headerActions={
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              }
            >
              <div className="space-y-4">
                {[
                  { name: "Автоклав ГлавАвтоклав", price: "15,990 ₽", sales: "45 продаж" },
                  { name: "Автоклав Кулинар 36л", price: "12,500 ₽", sales: "32 продажи" },
                  { name: "Автоклав Fansel 3", price: "18,900 ₽", sales: "28 продаж" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="text-white font-medium text-sm">{item.name}</div>
                      <div className="text-slate-400 text-xs">{item.sales}</div>
                    </div>
                    <div className="text-green-400 font-semibold">{item.price}</div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          {/* Advertising Analysis */}
          <DashboardCard title="Анализ рекламы">
            <div className="space-y-6">
              <ProgressIndicator
                segments={[
                  { label: "AUKC", value: 29, color: "bg-blue-500" },
                  { label: "APK", value: 44, color: "bg-red-500" },
                  { label: "Органика", value: 27, color: "bg-slate-500" },
                ]}
              />

              <div className="flex items-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                  Всего: 100
                </Badge>
                <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                  Авто: 44
                </Badge>
                <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                  Аукцион: 29
                </Badge>
                <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                  Органика: 27
                </Badge>
              </div>
            </div>
          </DashboardCard>

          {/* Products Table */}
          <DashboardCard
            title="Товары в рекламе"
            headerActions={
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Экспорт
              </Button>
            }
          >
            <ProductTable products={mockProducts} />
          </DashboardCard>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DashboardCard title="Склады">
              <div className="space-y-3">
                {[
                  { name: "Котовск", time: "18 ч", percent: "13%" },
                  { name: "Алексин", time: "24 ч", percent: "6%" },
                  { name: "Коледино", time: "25 ч", percent: "7%" },
                  { name: "Электросталь", time: "32 ч", percent: "3%" },
                ].map((warehouse, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-700/20 rounded">
                    <div className="text-slate-200 text-sm">{warehouse.name}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">{warehouse.time}</span>
                      <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                        {warehouse.percent}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Частота запросов">
              <ChartPlaceholder title="График запросов" height="h-32" />
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-400">Макс:</div>
                  <div className="text-blue-400">41,285</div>
                </div>
                <div>
                  <div className="text-slate-400">Мин:</div>
                  <div className="text-blue-400">20,080</div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Внешние переходы">
              <div className="text-center py-8">
                <div className="text-slate-400 text-sm">Нет данных</div>
                <div className="text-slate-500 text-xs mt-1">Данные появятся после настройки</div>
              </div>
            </DashboardCard>
          </div>
        </main>
      </div>
    </div>
  )
}
