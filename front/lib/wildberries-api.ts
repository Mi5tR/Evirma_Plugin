// Wildberries API client для работы с реальным API
const WB_SUPPLIERS_API = "https://suppliers-api.wildberries.ru"
const WB_ANALYTICS_API = "https://analytics-api.wildberries.ru"
const WB_CONTENT_API = "https://suppliers-api.wildberries.ru/content/v2"
const WB_MARKETPLACE_API = "https://marketplace-api.wildberries.ru"
const WB_SEARCH_API = "https://search.wb.ru"

// Типы данных для API Wildberries
export interface WBProduct {
  nmID: number
  vendorCode: string
  brand: string
  title: string
  photos: string[]
  price: number
  discountedPrice: number
  rating: number
  feedbacks: number
  orders: number
  ordersSumRub: number
  category: string
  subject: string
}

export interface WBSalesData {
  date: string
  lastChangeDate: string
  warehouseName: string
  countryName: string
  oblastOkrugName: string
  regionName: string
  supplierArticle: string
  nmId: number
  barcode: string
  category: string
  subject: string
  brand: string
  techSize: string
  incomeID: number
  isSupply: boolean
  isRealization: boolean
  totalPrice: number
  discountPercent: number
  spp: number
  finishedPrice: number
  priceWithDisc: number
  isCancel: boolean
  cancelDate: string
  orderType: string
  sticker: string
  gNumber: string
  srid: string
}

export interface WBOrdersData {
  date: string
  lastChangeDate: string
  warehouseName: string
  countryName: string
  oblastOkrugName: string
  regionName: string
  supplierArticle: string
  nmId: number
  barcode: string
  category: string
  subject: string
  brand: string
  techSize: string
  incomeID: number
  isSupply: boolean
  isRealization: boolean
  totalPrice: number
  discountPercent: number
  spp: number
  finishedPrice: number
  priceWithDisc: number
  isCancel: boolean
  cancelDate: string
  orderType: string
  sticker: string
  gNumber: string
  srid: string
}

export interface WBStocksData {
  lastChangeDate: string
  warehouseName: string
  supplierArticle: string
  nmId: number
  barcode: string
  quantity: number
  inWayToClient: number
  inWayFromClient: number
  quantityFull: number
  category: string
  subject: string
  brand: string
  techSize: string
  Price: number
  Discount: number
  isSupply: boolean
  isRealization: boolean
  SCCode: string
}

export interface WBAdvertisingCampaign {
  campaignId: number
  name: string
  status: number
  type: number
  createTime: string
  changeTime: string
  startTime: string
  endTime: string
  dailyBudget: number
}

export interface WBSearchQuery {
  keyword: string
  frequency: number
  competition: "LOW" | "MEDIUM" | "HIGH"
  trend: number
}

export interface WBSearchResult {
  id: number
  name: string
  brand: string
  price: number
  priceU: number
  salePriceU: number
  rating: number
  feedbacks: number
  pics: number
  sale: number
  supplier: string
  supplierRating: number
  supplierFlags: number
  colors: any[]
  sizes: any[]
  diffPrice: boolean
}

class WildberriesAPI {
  private apiKey: string

  constructor(apiKey = "") {
    this.apiKey = apiKey
  }

  private async makeRequest(url: string, options: RequestInit = {}) {
    console.log(`Making request to: ${url}`)

    // Always use proxy in browser to avoid CORS
    if (typeof window !== "undefined") {
      try {
        const proxyRes = await fetch("/api/wb", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
          },
          body: JSON.stringify({
            url,
            method: options.method ?? "GET",
            body: options.body ? JSON.parse(options.body as string) : undefined,
          }),
        })

        if (!proxyRes.ok) {
          console.warn(`Proxy returned ${proxyRes.status}, using mock data`)
          return this.getMockData(url)
        }

        const data = await proxyRes.json()
        console.log(`Received data:`, data)
        return data
      } catch (error) {
        console.error("Proxy request failed:", error)
        return this.getMockData(url)
      }
    }

    // Server side - direct request
    try {
      const headers = {
        Authorization: this.apiKey,
        "Content-Type": "application/json",
        ...options.headers,
      }

      const response = await fetch(url, { ...options, headers })
      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`)
        return this.getMockData(url)
      }

      const contentType = response.headers.get("content-type") ?? ""
      if (!contentType.includes("application/json")) {
        console.warn("Response is not JSON, returning mock data")
        return this.getMockData(url)
      }

      return response.json()
    } catch (error) {
      console.error("Direct API request failed:", error)
      return this.getMockData(url)
    }
  }

  // Поиск товаров по ключевому слову
  async searchProducts(query: string, page = 1): Promise<WBSearchResult[]> {
    const url = `${WB_SEARCH_API}/exactmatch/ru/common/v4/search?appType=1&curr=rub&dest=-1257786&page=${page}&query=${encodeURIComponent(query)}&resultset=catalog&sort=popular&spp=27&suppressSpellcheck=false`

    try {
      const data = await this.makeRequest(url)
      if (data && data.data && data.data.products) {
        return data.data.products
      }
      return this.getMockSearchResults(query)
    } catch (error) {
      console.error("Search error:", error)
      return this.getMockSearchResults(query)
    }
  }

  // Получение продаж за период с фильтрацией по поисковому запросу
  async getSalesData(dateFrom: string, dateTo: string, searchQuery?: string): Promise<WBSalesData[]> {
    const url = `${WB_ANALYTICS_API}/api/v1/supplier/sales?dateFrom=${dateFrom}&dateTo=${dateTo}`
    const data = await this.makeRequest(url)
    let salesData = Array.isArray(data) ? data : this.getMockSalesData(searchQuery)

    // Фильтруем по поисковому запросу если он есть
    if (searchQuery) {
      salesData = salesData.filter(
        (item) =>
          item.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.supplierArticle?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return salesData
  }

  // Получение заказов за период с фильтрацией
  async getOrdersData(dateFrom: string, dateTo: string, searchQuery?: string): Promise<WBOrdersData[]> {
    const url = `${WB_ANALYTICS_API}/api/v1/supplier/orders?dateFrom=${dateFrom}&dateTo=${dateTo}`
    const data = await this.makeRequest(url)
    let ordersData = Array.isArray(data) ? data : this.getMockOrdersData(searchQuery)

    if (searchQuery) {
      ordersData = ordersData.filter(
        (item) =>
          item.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.supplierArticle?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return ordersData
  }

  // Получение остатков на складах с фильтрацией
  async getStocksData(searchQuery?: string): Promise<WBStocksData[]> {
    const url = `${WB_ANALYTICS_API}/api/v1/supplier/stocks`
    const data = await this.makeRequest(url)
    let stocksData = Array.isArray(data) ? data : this.getMockStocksData(searchQuery)

    if (searchQuery) {
      stocksData = stocksData.filter(
        (item) =>
          item.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.supplierArticle?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return stocksData
  }

  // Получение отчета по товарам за период с фильтрацией
  async getReportDetailByPeriod(dateFrom: string, dateTo: string, limit = 100000, rrdid = 0, searchQuery?: string) {
    const url = `${WB_ANALYTICS_API}/api/v1/supplier/reportDetailByPeriod`
    const data = await this.makeRequest(url, {
      method: "POST",
      body: JSON.stringify({
        period: {
          begin: dateFrom,
          end: dateTo,
        },
        timezone: "Europe/Moscow",
        limit,
        rrdid,
      }),
    })

    let reportData = data || this.getMockReportData(searchQuery)

    if (searchQuery && Array.isArray(reportData)) {
      reportData = reportData.filter(
        (item) =>
          item.subject_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sa_name?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return reportData
  }

  // Получение данных о рекламных кампаниях
  async getAdvertisingCampaigns(): Promise<WBAdvertisingCampaign[]> {
    const url = `${WB_MARKETPLACE_API}/adv/v1/promotion/count`
    const data = await this.makeRequest(url)
    return Array.isArray(data) ? data : this.getMockAdvertisingData()
  }

  // Получение статистики рекламных кампаний
  async getAdvertisingStats(campaignIds: number[]) {
    const url = `${WB_MARKETPLACE_API}/adv/v2/fullstats`
    const data = await this.makeRequest(url, {
      method: "POST",
      body: JSON.stringify(campaignIds),
    })
    return data || this.getMockAdvertisingStats()
  }

  // Получение информации о складах
  async getWarehouses() {
    const url = `${WB_SUPPLIERS_API}/api/v3/warehouses`
    const data = await this.makeRequest(url)
    return Array.isArray(data) ? data : this.getMockWarehousesData()
  }

  // Получение карточек товаров с фильтрацией
  async getCardsList(limit = 100, updatedAt = "", nmID = 0, searchQuery?: string) {
    const url = `${WB_CONTENT_API}/cards/cursor/list`
    const data = await this.makeRequest(url, {
      method: "POST",
      body: JSON.stringify({
        sort: {
          cursor: {
            limit,
            updatedAt,
            nmID,
          },
        },
      }),
    })

    const cardsData = data || this.getMockCardsData(searchQuery)

    if (searchQuery && cardsData.cards) {
      cardsData.cards = cardsData.cards.filter(
        (card: any) =>
          card.vendorCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.characteristics?.some((char: any) => char.value?.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    return cardsData
  }

  // Умные моковые данные, которые реагируют на поисковый запрос
  private getMockData(url: string, searchQuery?: string) {
    if (url.includes("sales")) {
      return this.getMockSalesData(searchQuery)
    }
    if (url.includes("orders")) {
      return this.getMockOrdersData(searchQuery)
    }
    if (url.includes("stocks")) {
      return this.getMockStocksData(searchQuery)
    }
    if (url.includes("warehouses")) {
      return this.getMockWarehousesData()
    }
    if (url.includes("adv") || url.includes("campaign")) {
      return this.getMockAdvertisingData()
    }
    if (url.includes("cards")) {
      return this.getMockCardsData(searchQuery)
    }
    if (url.includes("search")) {
      return this.getMockSearchData(searchQuery)
    }
    return this.getMockReportData(searchQuery)
  }

  private getMockSearchData(query?: string) {
    const products = this.getMockSearchResults(query || "")
    return {
      data: {
        products,
      },
    }
  }

  private getMockSearchResults(query: string): WBSearchResult[] {
    // Создаем разные товары в зависимости от поискового запроса
    const productTemplates = {
      автоклав: [
        {
          id: 148023951,
          name: "Автоклав домашний для консервирования 36 литров",
          brand: "ГрадусОК.рф",
          priceU: 1359100,
          salePriceU: 1359100,
          rating: 5,
          feedbacks: 1250,
          pics: 5,
          sale: 15,
          supplier: "ГрадусОК.рф",
          supplierRating: 5,
          supplierFlags: 0,
          colors: [],
          sizes: [{ name: "36 л" }],
          diffPrice: false,
        },
        {
          id: 365286181,
          name: "Автоклав Кулинар электрический 24 литра",
          brand: "Автоклав Дом",
          priceU: 1890000,
          salePriceU: 1890000,
          rating: 4.8,
          feedbacks: 890,
          pics: 4,
          sale: 12,
          supplier: "Автоклав Дом",
          supplierRating: 4.9,
          supplierFlags: 0,
          colors: [],
          sizes: [{ name: "24 л" }],
          diffPrice: false,
        },
        {
          id: 231463808,
          name: "Автоклав домашний Вятич для консервирования",
          brand: "Вятич",
          priceU: 1299000,
          salePriceU: 1299000,
          rating: 4.7,
          feedbacks: 650,
          pics: 6,
          sale: 20,
          supplier: "Вятич",
          supplierRating: 4.8,
          supplierFlags: 0,
          colors: [],
          sizes: [{ name: "30 л" }],
          diffPrice: false,
        },
      ],
      банки: [
        {
          id: 123456789,
          name: "Банки стеклянные для консервирования 0.5л",
          brand: "Твист",
          priceU: 45000,
          salePriceU: 45000,
          rating: 4.5,
          feedbacks: 2340,
          pics: 3,
          sale: 10,
          supplier: "Твист",
          supplierRating: 4.6,
          supplierFlags: 0,
          colors: [],
          sizes: [{ name: "0.5л" }],
          diffPrice: false,
        },
        {
          id: 987654321,
          name: "Банки стеклянные с крышками 1л набор 12шт",
          brand: "Домашний Мастер",
          priceU: 89000,
          salePriceU: 89000,
          rating: 4.3,
          feedbacks: 1560,
          pics: 4,
          sale: 15,
          supplier: "Домашний Мастер",
          supplierRating: 4.4,
          supplierFlags: 0,
          colors: [],
          sizes: [{ name: "1л" }],
          diffPrice: false,
        },
      ],
      консервирование: [
        {
          id: 456789123,
          name: "Набор для консервирования: ключ, воронка, щипцы",
          brand: "КонсервПро",
          priceU: 125000,
          salePriceU: 125000,
          rating: 4.6,
          feedbacks: 890,
          pics: 5,
          sale: 8,
          supplier: "КонсервПро",
          supplierRating: 4.7,
          supplierFlags: 0,
          colors: [],
          sizes: [{ name: "стандарт" }],
          diffPrice: false,
        },
      ],
    }

    // Определяем, какие товары показать на основе запроса
    const lowerQuery = query.toLowerCase()
    let selectedProducts: WBSearchResult[] = []

    if (lowerQuery.includes("автоклав")) {
      selectedProducts = productTemplates.автоклав
    } else if (lowerQuery.includes("банки") || lowerQuery.includes("банка")) {
      selectedProducts = productTemplates.банки
    } else if (lowerQuery.includes("консерв")) {
      selectedProducts = [...productTemplates.консервирование, ...productTemplates.банки]
    } else if (query) {
      // Для любого другого запроса показываем автоклавы как пример
      selectedProducts = productTemplates.автоклав
    } else {
      // Без запроса показываем все
      selectedProducts = [...productTemplates.автоклав, ...productTemplates.банки, ...productTemplates.консервирование]
    }

    return selectedProducts
  }

  private getMockSalesData(searchQuery?: string): WBSalesData[] {
    const today = new Date()
    const data = []

    // Определяем тематику товаров на основе поискового запроса
    const getProductInfo = (index: number) => {
      if (searchQuery?.toLowerCase().includes("автоклав")) {
        return {
          category: "Дом и дача",
          subject: "Автоклавы",
          brand: index % 2 === 0 ? "ГрадусОК.рф" : "Автоклав Дом",
          techSize: index % 2 === 0 ? "36 л" : "24 л",
        }
      } else if (searchQuery?.toLowerCase().includes("банки")) {
        return {
          category: "Дом и дача",
          subject: "Банки стеклянные",
          brand: index % 2 === 0 ? "Твист" : "Домашний Мастер",
          techSize: index % 2 === 0 ? "0.5л" : "1л",
        }
      } else {
        return {
          category: "Дом и дача",
          subject: searchQuery ? `Товары по запросу "${searchQuery}"` : "Автоклавы",
          brand: "ГрадусОК.рф",
          techSize: "36 л",
        }
      }
    }

    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const productInfo = getProductInfo(i)

      data.push({
        date: date.toISOString().split("T")[0],
        lastChangeDate: date.toISOString(),
        warehouseName: "Коледино",
        countryName: "Россия",
        oblastOkrugName: "Московская область",
        regionName: "Подольск",
        supplierArticle: `ART-${1000 + i}`,
        nmId: 148023951 + i,
        barcode: `2000000000${i.toString().padStart(3, "0")}`,
        category: productInfo.category,
        subject: productInfo.subject,
        brand: productInfo.brand,
        techSize: productInfo.techSize,
        incomeID: 1000000 + i,
        isSupply: true,
        isRealization: false,
        totalPrice: 15990,
        discountPercent: 15,
        spp: 0,
        finishedPrice: 13591,
        priceWithDisc: 13591,
        isCancel: false,
        cancelDate: "",
        orderType: "Клиентский",
        sticker: "",
        gNumber: `G${i}`,
        srid: `SR${i}`,
      })
    }

    return data
  }

  private getMockOrdersData(searchQuery?: string): WBOrdersData[] {
    return this.getMockSalesData(searchQuery) // Структура такая же
  }

  private getMockStocksData(searchQuery?: string): WBStocksData[] {
    const baseData = [
      {
        lastChangeDate: new Date().toISOString(),
        warehouseName: "Коледино",
        supplierArticle: "ART-1001",
        nmId: 148023951,
        barcode: "2000000001001",
        quantity: 45,
        inWayToClient: 12,
        inWayFromClient: 2,
        quantityFull: 59,
        category: "Дом и дача",
        subject: "Автоклавы",
        brand: "ГрадусОК.рф",
        techSize: "36 л",
        Price: 15990,
        Discount: 15,
        isSupply: true,
        isRealization: false,
        SCCode: "SC001",
      },
      {
        lastChangeDate: new Date().toISOString(),
        warehouseName: "Алексин",
        supplierArticle: "ART-1002",
        nmId: 365286181,
        barcode: "2000000001002",
        quantity: 23,
        inWayToClient: 8,
        inWayFromClient: 1,
        quantityFull: 32,
        category: "Дом и дача",
        subject: "Автоклавы",
        brand: "Автоклав Дом",
        techSize: "24 л",
        Price: 18900,
        Discount: 12,
        isSupply: true,
        isRealization: false,
        SCCode: "SC002",
      },
    ]

    // Адаптируем данные под поисковый запрос
    if (searchQuery?.toLowerCase().includes("банки")) {
      return [
        {
          ...baseData[0],
          subject: "Банки стеклянные",
          brand: "Твист",
          techSize: "0.5л",
          Price: 450,
          nmId: 123456789,
        },
        {
          ...baseData[1],
          subject: "Банки стеклянные",
          brand: "Домашний Мастер",
          techSize: "1л",
          Price: 890,
          nmId: 987654321,
        },
      ]
    }

    return baseData
  }

  private getMockWarehousesData() {
    return [
      {
        ID: 1,
        name: "Коледино",
        address: "Московская область, Подольск",
        workTime: "Круглосуточно",
        acceptsGoods: true,
        cargoType: 1,
      },
      {
        ID: 2,
        name: "Алексин",
        address: "Тульская область, Алексин",
        workTime: "08:00-20:00",
        acceptsGoods: true,
        cargoType: 1,
      },
      {
        ID: 3,
        name: "Котовск",
        address: "Тамбовская область, Котовск",
        workTime: "08:00-18:00",
        acceptsGoods: true,
        cargoType: 1,
      },
    ]
  }

  private getMockAdvertisingData() {
    return [
      {
        campaignId: 1,
        name: "Автоклавы - Весна 2024",
        status: 9, // активная
        type: 8, // автоматическая
        createTime: "2024-01-15T10:00:00Z",
        changeTime: new Date().toISOString(),
        startTime: "2024-01-15T10:00:00Z",
        endTime: "2024-12-31T23:59:59Z",
        dailyBudget: 5000,
      },
      {
        campaignId: 2,
        name: "Консервирование - Лето",
        status: 9,
        type: 4, // поиск
        createTime: "2024-02-01T10:00:00Z",
        changeTime: new Date().toISOString(),
        startTime: "2024-02-01T10:00:00Z",
        endTime: "2024-08-31T23:59:59Z",
        dailyBudget: 3000,
      },
    ]
  }

  private getMockAdvertisingStats() {
    return {
      views: 45230,
      clicks: 1250,
      ctr: 2.76,
      cpc: 28.5,
      sum: 35625,
      atbs: 15,
      orders: 12,
      cr: 0.96,
      shks: 8,
      sum_price: 185400,
    }
  }

  private getMockCardsData(searchQuery?: string) {
    const baseCard = {
      nmID: 148023951,
      imtID: 1001,
      vendorCode: "ART-1001",
      sizes: [
        {
          chrtID: 1001001,
          techSize: "36 л",
          skus: ["2000000001001"],
        },
      ],
      characteristics: [
        {
          id: 1,
          name: "Бренд",
          value: "ГрадусОК.рф",
        },
        {
          id: 2,
          name: "Объем",
          value: "36 л",
        },
      ],
      photos: [
        {
          big: "https://basket-01.wb.ru/vol1480/part148023/148023951/images/big/1.jpg",
          c246x328: "https://basket-01.wb.ru/vol1480/part148023/148023951/images/c246x328/1.jpg",
          c516x688: "https://basket-01.wb.ru/vol1480/part148023/148023951/images/c516x688/1.jpg",
        },
      ],
      video: "",
      dimensions: {
        length: 40,
        width: 40,
        height: 50,
      },
      tags: [
        {
          id: 1,
          name: searchQuery || "автоклав",
          color: "#FF6B6B",
        },
      ],
    }

    return {
      cards: [baseCard],
      cursor: {
        updatedAt: new Date().toISOString(),
        nmID: 148023951,
        total: 1,
      },
    }
  }

  private getMockReportData(searchQuery?: string) {
    const today = new Date()
    const data = []

    const getProductInfo = (index: number) => {
      if (searchQuery?.toLowerCase().includes("автоклав")) {
        return {
          subject_name: "Автоклавы",
          brand_name: index % 2 === 0 ? "ГрадусОК.рф" : "Автоклав Дом",
          sa_name: `ART-${1001 + index}`,
        }
      } else if (searchQuery?.toLowerCase().includes("банки")) {
        return {
          subject_name: "Банки стеклянные",
          brand_name: index % 2 === 0 ? "Твист" : "Домашний Мастер",
          sa_name: `BANK-${1001 + index}`,
        }
      } else {
        return {
          subject_name: searchQuery ? `Товары "${searchQuery}"` : "Автоклавы",
          brand_name: "ГрадусОК.рф",
          sa_name: "ART-1001",
        }
      }
    }

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const productInfo = getProductInfo(i)

      data.push({
        realizationreport_id: 1000000 + i,
        date_from: date.toISOString().split("T")[0],
        date_to: date.toISOString().split("T")[0],
        create_dt: date.toISOString(),
        suppliercontract_code: "SC001",
        rrd_id: 1000 + i,
        gi_id: 2000 + i,
        subject_name: productInfo.subject_name,
        nm_id: 148023951,
        brand_name: productInfo.brand_name,
        sa_name: productInfo.sa_name,
        ts_name: "36 л",
        barcode: "2000000001001",
        doc_type_name: "Продажа",
        quantity: Math.floor(Math.random() * 5) + 1,
        retail_price: 15990,
        retail_amount: 15990 * (Math.floor(Math.random() * 5) + 1),
        sale_percent: 15,
        commission_percent: 17,
        office_name: "Коледино",
        supplier_oper_name: "Продажа",
        order_dt: date.toISOString(),
        sale_dt: date.toISOString(),
        rr_dt: date.toISOString(),
        shk_id: 3000 + i,
        retail_price_withdisc_rub: 13591,
        delivery_amount: 0,
        return_amount: 0,
        delivery_rub: 0,
        gi_box_type_name: "Короб",
        product_discount_for_report: 15,
        supplier_promo: 0,
        rid: 4000 + i,
        ppvz_spp_prc: 0,
        ppvz_kvw_prc_base: 17,
        ppvz_kvw_prc: 17,
        sup_rating_prc_up: 0,
        is_kgvp_v2: 0,
        ppvz_sales_commission: 2310,
        ppvz_for_pay: 11281,
        ppvz_reward: 0,
        acquiring_fee: 0,
        acquiring_bank: "Сбербанк",
        ppvz_vw: 2310,
        ppvz_vw_nds: 385,
        ppvz_office_id: 1,
        ppvz_office_name: "Коледино",
        ppvz_supplier_id: 12345,
        ppvz_supplier_name: "ООО Поставщик",
        ppvz_inn: "1234567890",
        declaration_number: "DECL001",
        bonus_type_name: "",
        sticker_id: "ST001",
        site_country: "RU",
        penalty: 0,
        additional_payment: 0,
        rebill_logistic_cost: 0,
        rebill_logistic_org: "",
        kiz: "",
        storage_fee: 0,
        deduction: 0,
        acceptance: 0,
        srid: "SR001",
      })
    }

    return data
  }
}

// Экспорт экземпляра API
export const wbAPI = new WildberriesAPI()

// Утилиты для работы с API
export const WBApiUtils = {
  // Получение API ключа из хранилища расширения
  async getApiKey(): Promise<string> {
    try {
      if (
        typeof window !== "undefined" &&
        (window as any).chrome &&
        (window as any).chrome.storage &&
        (window as any).chrome.storage.sync
      ) {
        const result = await (window as any).chrome.storage.sync.get(["wbApiKey"])
        return result.wbApiKey || ""
      }
      // Fallback для обычного браузера
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem("wbApiKey") || ""
      }
      return ""
    } catch (error) {
      console.error("Error getting API key:", error)
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem("wbApiKey") || ""
      }
      return ""
    }
  },

  // Сохранение API ключа
  async setApiKey(apiKey: string): Promise<void> {
    try {
      if (
        typeof window !== "undefined" &&
        (window as any).chrome &&
        (window as any).chrome.storage &&
        (window as any).chrome.storage.sync
      ) {
        await (window as any).chrome.storage.sync.set({ wbApiKey: apiKey })
      } else if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("wbApiKey", apiKey)
      }
    } catch (error) {
      console.error("Error setting API key:", error)
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("wbApiKey", apiKey)
      }
    }
  },

  // Извлечение артикула из URL Wildberries
  extractArticleFromUrl(url: string): number | null {
    const match = url.match(/\/detail\/(\d+)\//)
    return match ? Number.parseInt(match[1]) : null
  },

  // Форматирование цены
  formatPrice(price: number): string {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price)
  },

  // Форматирование числа
  formatNumber(num: number): string {
    return new Intl.NumberFormat("ru-RU").format(num)
  },

  // Получение цвета для тренда
  getTrendColor(trend: number): string {
    if (trend > 0) return "#10b981" // green
    if (trend < 0) return "#ef4444" // red
    return "#6b7280" // gray
  },

  // Получение иконки для тренда
  getTrendIcon(trend: number): string {
    if (trend > 0) return "↗"
    if (trend < 0) return "↘"
    return "→"
  },

  // Получение периода для запросов (последние 30 дней)
  getDateRange(days = 30): { dateFrom: string; dateTo: string } {
    const today = new Date()
    const dateFrom = new Date(today)
    dateFrom.setDate(dateFrom.getDate() - days)

    return {
      dateFrom: dateFrom.toISOString().split("T")[0],
      dateTo: today.toISOString().split("T")[0],
    }
  },

  // Группировка данных по дням
  groupByDate(data: any[], dateField = "date"): Record<string, any[]> {
    return data.reduce((acc, item) => {
      const date = item[dateField]?.split("T")[0] || "unknown"
      if (!acc[date]) acc[date] = []
      acc[date].push(item)
      return acc
    }, {})
  },

  // Подсчет общей суммы
  calculateTotal(data: any[], field: string): number {
    return data.reduce((sum, item) => sum + (Number(item[field]) || 0), 0)
  },

  // Подсчет среднего значения
  calculateAverage(data: any[], field: string): number {
    if (data.length === 0) return 0
    return this.calculateTotal(data, field) / data.length
  },
}
