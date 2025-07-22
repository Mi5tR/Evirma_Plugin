// Content script for Wildberries pages
;(() => {
  console.log("Exoad WB Analytics: Content script loaded")

  // Declare chrome variable
  const chrome = window.chrome

  // Check if we're on a product page
  const isProductPage = window.location.pathname.includes("/detail/")
  const isCatalogPage = window.location.pathname.includes("/catalog/")

  if (isProductPage) {
    initProductAnalytics()
  } else if (isCatalogPage) {
    initCatalogAnalytics()
  }

  function initProductAnalytics() {
    console.log("Initializing product analytics")

    // Add analytics overlay button
    addAnalyticsButton()

    // Extract and analyze product data
    const productData = extractProductData()
    console.log("Product data:", productData)

    // Send data to background script
    chrome.runtime.sendMessage({
      type: "PRODUCT_DATA",
      data: productData,
    })
  }

  function initCatalogAnalytics() {
    console.log("Initializing catalog analytics")

    // Add analytics for catalog items
    addCatalogAnalytics()
  }

  function addAnalyticsButton() {
    // Create floating analytics button
    const button = document.createElement("div")
    button.id = "exoad-analytics-btn"
    button.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                cursor: pointer;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                font-weight: 600;
                user-select: none;
                transition: all 0.2s ease;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(59, 130, 246, 0.4)'"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'">
                📊 Аналитика Exoad
            </div>
        `

    button.addEventListener("click", showAnalyticsOverlay)
    document.body.appendChild(button)
  }

  function showAnalyticsOverlay() {
    // Remove existing overlay
    const existing = document.getElementById("exoad-overlay")
    if (existing) {
      existing.remove()
      return
    }

    // Create analytics overlay
    const overlay = document.createElement("div")
    overlay.id = "exoad-overlay"
    overlay.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div style="
                    background: #1e293b;
                    border-radius: 12px;
                    padding: 24px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                    border: 1px solid #334155;
                ">
                    <button onclick="document.getElementById('exoad-overlay').remove()" style="
                        position: absolute;
                        top: 16px;
                        right: 16px;
                        background: none;
                        border: none;
                        color: #94a3b8;
                        font-size: 20px;
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 4px;
                    ">×</button>
                    
                    <h2 style="color: white; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">
                        Аналитика товара
                    </h2>
                    
                    <div id="analytics-content">
                        ${generateAnalyticsContent()}
                    </div>
                </div>
            </div>
        `

    document.body.appendChild(overlay)
  }

  function generateAnalyticsContent() {
    const productData = extractProductData()

    return `
            <div style="color: white;">
                <!-- Product Info -->
                <div style="background: #0f172a; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #334155;">
                    <h3 style="margin: 0 0 12px 0; color: #3b82f6; font-size: 16px;">Информация о товаре</h3>
                    <div style="display: grid; gap: 8px; font-size: 14px;">
                        <div><span style="color: #94a3b8;">Артикул:</span> <span style="color: white;">${productData.article || "Не найден"}</span></div>
                        <div><span style="color: #94a3b8;">Цена:</span> <span style="color: #10b981;">${productData.price || "Не найдена"}</span></div>
                        <div><span style="color: #94a3b8;">Рейтинг:</span> <span style="color: #f59e0b;">${productData.rating || "Не найден"}</span></div>
                    </div>
                </div>
                
                <!-- Position Analysis -->
                <div style="background: #0f172a; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #334155;">
                    <h3 style="margin: 0 0 12px 0; color: #10b981; font-size: 16px;">Анализ позиций</h3>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; justify-between; align-items: center;">
                            <span style="color: #94a3b8; font-size: 14px;">Позиция в поиске:</span>
                            <span style="color: white; font-weight: 600;">${Math.floor(Math.random() * 50) + 1}</span>
                        </div>
                        <div style="display: flex; justify-between; align-items: center;">
                            <span style="color: #94a3b8; font-size: 14px;">Изменение за неделю:</span>
                            <span style="color: #10b981; font-weight: 600;">↑ ${Math.floor(Math.random() * 10) + 1}</span>
                        </div>
                        <div style="height: 6px; background: #334155; border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; width: ${Math.floor(Math.random() * 60) + 20}%; background: linear-gradient(90deg, #10b981, #059669); border-radius: 3px;"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Competition -->
                <div style="background: #0f172a; padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #334155;">
                    <h3 style="margin: 0 0 12px 0; color: #f59e0b; font-size: 16px;">Конкурентный анализ</h3>
                    <div style="display: grid; gap: 8px; font-size: 14px;">
                        <div style="display: flex; justify-between;">
                            <span style="color: #94a3b8;">Товаров в категории:</span>
                            <span style="color: white;">${(Math.floor(Math.random() * 2000) + 500).toLocaleString()}</span>
                        </div>
                        <div style="display: flex; justify-between;">
                            <span style="color: #94a3b8;">Средняя цена:</span>
                            <span style="color: white;">${(Math.floor(Math.random() * 10000) + 5000).toLocaleString()} ₽</span>
                        </div>
                        <div style="display: flex; justify-between;">
                            <span style="color: #94a3b8;">Уровень конкуренции:</span>
                            <span style="color: #ef4444;">Высокий</span>
                        </div>
                    </div>
                </div>
                
                <!-- Keywords -->
                <div style="background: #0f172a; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #334155;">
                    <h3 style="margin: 0 0 12px 0; color: #8b5cf6; font-size: 16px;">Ключевые слова</h3>
                    <div style="display: flex; flex-wrap: gap: 8px;">
                        <span style="background: #3b82f6; color: white; padding: 6px 12px; border-radius: 16px; font-size: 12px;">автоклав</span>
                        <span style="background: #6366f1; color: white; padding: 6px 12px; border-radius: 16px; font-size: 12px;">консервирование</span>
                        <span style="background: #8b5cf6; color: white; padding: 6px 12px; border-radius: 16px; font-size: 12px;">домашний</span>
                        <span style="background: #06b6d4; color: white; padding: 6px 12px; border-radius: 16px; font-size: 12px;">тушенка</span>
                        <span style="background: #10b981; color: white; padding: 6px 12px; border-radius: 16px; font-size: 12px;">заготовки</span>
                    </div>
                </div>
                
                <!-- Actions -->
                <div style="display: flex; gap: 12px;">
                    <button onclick="exportAnalytics()" style="
                        flex: 1;
                        background: #3b82f6;
                        color: white;
                        border: none;
                        padding: 12px 16px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
                        Экспорт данных
                    </button>
                    <button onclick="window.open('https://exoad.com/analytics', '_blank')" style="
                        flex: 1;
                        background: transparent;
                        color: #94a3b8;
                        border: 1px solid #334155;
                        padding: 12px 16px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    " onmouseover="this.style.borderColor='#64748b'; this.style.color='white'" onmouseout="this.style.borderColor='#334155'; this.style.color='#94a3b8'">
                        Подробнее
                    </button>
                </div>
            </div>
        `
  }

  function addCatalogAnalytics() {
    // Add analytics badges to catalog items
    const items = document.querySelectorAll("[data-popup-nm-id]")

    items.forEach((item, index) => {
      if (item.querySelector(".exoad-badge")) return // Already processed

      const badge = document.createElement("div")
      badge.className = "exoad-badge"
      badge.innerHTML = `
                <div style="
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 10px;
                    font-weight: 600;
                    z-index: 100;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                ">
                    #${Math.floor(Math.random() * 100) + 1}
                </div>
            `

      item.style.position = "relative"
      item.appendChild(badge)
    })
  }

  function extractProductData() {
    // Extract product data from Wildberries page
    const article =
      document
        .querySelector('[data-link*="detail"]')
        ?.getAttribute("data-link")
        ?.match(/\/(\d+)\//)?.[1] || window.location.pathname.match(/\/detail\/(\d+)\//)?.[1]

    const price = document.querySelector(".price-block__final-price, .price__lower-price")?.textContent?.trim()
    const oldPrice = document.querySelector(".price-block__old-price, .price__old-price")?.textContent?.trim()
    const rating = document.querySelector(".product-review__rating, .rating__value")?.textContent?.trim()
    const reviewCount = document.querySelector(".product-review__count-review, .rating__count")?.textContent?.trim()
    const title = document.querySelector("h1, .goods-name")?.textContent?.trim()
    const brand = document.querySelector(".product-page__header-brand, .brand-name")?.textContent?.trim()
    const seller = document.querySelector(".seller-info__name, .product-page__seller")?.textContent?.trim()

    return {
      article: article || null,
      price: price || null,
      oldPrice: oldPrice || null,
      rating: rating || null,
      reviewCount: reviewCount || null,
      title: title || null,
      brand: brand || null,
      seller: seller || null,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    }
  }

  // Global function for export
  window.exportAnalytics = () => {
    const data = {
      product: extractProductData(),
      analytics: {
        position: Math.floor(Math.random() * 50) + 1,
        competition: Math.floor(Math.random() * 2000) + 500,
        keywords: ["автоклав", "консервирование", "домашний", "тушенка", "заготовки"],
        priceAnalysis: {
          current: extractProductData().price,
          average: (Math.floor(Math.random() * 10000) + 5000).toLocaleString() + " ₽",
          percentile: Math.floor(Math.random() * 60) + 20,
        },
      },
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `wb-analytics-${data.product.article || "product"}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
})()
