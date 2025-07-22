"use client"

import { useState, useEffect } from "react"
import { wbAPI, WBApiUtils } from "../wildberries-api"

// Хук для получения данных о продажах с поиском
export function useSalesData(days = 30, searchQuery?: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const { dateFrom, dateTo } = WBApiUtils.getDateRange(days)
        const salesData = await wbAPI.getSalesData(dateFrom, dateTo, searchQuery)
        setData(salesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки продаж")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [days, searchQuery])

  return { data, loading, error }
}

// Хук для получения данных о заказах с поиском
export function useOrdersData(days = 30, searchQuery?: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const { dateFrom, dateTo } = WBApiUtils.getDateRange(days)
        const ordersData = await wbAPI.getOrdersData(dateFrom, dateTo, searchQuery)
        setData(ordersData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки заказов")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [days, searchQuery])

  return { data, loading, error }
}

// Хук для получения остатков на складах с поиском
export function useStocksData(searchQuery?: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const stocksData = await wbAPI.getStocksData(searchQuery)
        setData(stocksData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки остатков")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchQuery])

  return { data, loading, error }
}

// Хук для получения данных о складах
export function useWarehouses() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const warehousesData = await wbAPI.getWarehouses()
        setData(warehousesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки складов")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

// Хук для получения рекламных кампаний
export function useAdvertisingCampaigns() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const campaignsData = await wbAPI.getAdvertisingCampaigns()
        setData(campaignsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки кампаний")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

// Хук для получения статистики рекламы
export function useAdvertisingStats(campaignIds: number[] = []) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (campaignIds.length === 0) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const statsData = await wbAPI.getAdvertisingStats(campaignIds)
        setData(statsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки статистики")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [campaignIds])

  return { data, loading, error }
}

// Хук для получения карточек товаров с поиском
export function useProductCards(searchQuery?: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const cardsData = await wbAPI.getCardsList(100, "", 0, searchQuery)
        setData(cardsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки карточек")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchQuery])

  return { data, loading, error }
}

// Хук для получения отчета по товарам с поиском
export function useReportData(days = 30, searchQuery?: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const { dateFrom, dateTo } = WBApiUtils.getDateRange(days)
        const reportData = await wbAPI.getReportDetailByPeriod(dateFrom, dateTo, 100000, 0, searchQuery)
        setData(Array.isArray(reportData) ? reportData : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки отчета")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [days, searchQuery])

  return { data, loading, error }
}

// Хук для поиска товаров
export function useSearchProducts(query: string) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!query.trim()) {
        setData([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const apiKey = await WBApiUtils.getApiKey()
        if (apiKey) {
          wbAPI["apiKey"] = apiKey
        }

        const searchResults = await wbAPI.searchProducts(query)
        setData(searchResults)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка поиска товаров")
      } finally {
        setLoading(false)
      }
    }

    // Добавляем задержку для избежания слишком частых запросов
    const timeoutId = setTimeout(fetchData, 500)
    return () => clearTimeout(timeoutId)
  }, [query])

  return { data, loading, error }
}

// Хук для аналитики продаж с группировкой по дням и поиском
export function useSalesAnalytics(days = 30, searchQuery?: string) {
  const { data: salesData, loading, error } = useSalesData(days, searchQuery)
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    if (salesData.length > 0) {
      const groupedByDate = WBApiUtils.groupByDate(salesData, "date")
      const totalRevenue = WBApiUtils.calculateTotal(salesData, "finishedPrice")
      const totalOrders = salesData.length
      const averageOrderValue = totalRevenue / totalOrders || 0

      // Создаем данные для графика
      const chartData = Object.entries(groupedByDate)
        .map(([date, items]) => ({
          date,
          revenue: WBApiUtils.calculateTotal(items as any[], "finishedPrice"),
          orders: (items as any[]).length,
          averageOrderValue: WBApiUtils.calculateTotal(items as any[], "finishedPrice") / (items as any[]).length || 0,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      setAnalytics({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        chartData,
        topProducts: salesData.slice(0, 5), // Топ 5 товаров
      })
    } else {
      setAnalytics(null)
    }
  }, [salesData])

  return { analytics, loading, error }
}
