// Popup script for browser extension
document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("root")
  const chrome = window.chrome // Declare the chrome variable

  try {
    // Get current tab info
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    // Check if we're on Wildberries
    const isWildberries = tab.url && (tab.url.includes("wildberries.ru") || tab.url.includes("wb.ru"))

    if (!isWildberries) {
      root.innerHTML = `
        <div style="padding: 20px; text-align: center; width: 350px;">
          <div style="margin-bottom: 16px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 12px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📊</div>
            <h3 style="color: #1e293b; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Exoad WB Analytics</h3>
            <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0;">
              Откройте страницу товара на Wildberries для просмотра аналитики
            </p>
          </div>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #374151;">Возможности расширения:</h4>
            <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #6b7280; line-height: 1.6;">
              <li>Анализ позиций товаров</li>
              <li>Мониторинг конкурентов</li>
              <li>Статистика по складам</li>
              <li>Аналитика рекламы</li>
              <li>Экспорт данных</li>
            </ul>
          </div>
          
          <a href="https://wildberries.ru" target="_blank" 
             style="display: inline-flex; align-items: center; gap: 8px; background: #3b82f6; color: white; text-decoration: none; padding: 10px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; transition: background 0.2s;"
             onmouseover="this.style.background='#2563eb'" 
             onmouseout="this.style.background='#3b82f6'">
            Перейти на Wildberries →
          </a>
        </div>
      `
      return
    }

    // Load analytics data
    await loadAnalytics(tab)
  } catch (error) {
    console.error("Extension error:", error)
    root.innerHTML = `
      <div style="padding: 20px; text-align: center; width: 350px;">
        <div style="color: #ef4444; margin-bottom: 12px; font-size: 24px;">⚠️</div>
        <h3 style="color: #ef4444; margin: 0 0 8px 0; font-size: 16px;">Ошибка</h3>
        <p style="color: #64748b; font-size: 14px; margin: 0;">
          Не удалось загрузить данные аналитики
        </p>
        <button onclick="location.reload()" 
                style="margin-top: 16px; background: #f3f4f6; border: 1px solid #d1d5db; padding: 8px 16px; border-radius: 6px; font-size: 12px; cursor: pointer;">
          Попробовать снова
        </button>
      </div>
    `
  }
})

async function loadAnalytics(tab) {
  const root = document.getElementById("root")
  const chrome = window.chrome // Declare the chrome variable

  // Extract product info from page
  const productInfo = await extractProductInfo(tab)

  // Check if API key is configured
  const apiKey = await getStoredApiKey()

  // Render analytics interface
  root.innerHTML = `
    <div style="width: 380px; height: 600px; display: flex; flex-direction: column; background: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <!-- Header -->
      <div style="padding: 16px; border-bottom: 1px solid #334155; background: #1e293b;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%;"></div>
          <h2 style="margin: 0; font-size: 16px; font-weight: 600; color: white;">Exoad Analytics</h2>
        </div>
        ${
          productInfo
            ? `
          <div style="font-size: 12px; color: #94a3b8;">
            Артикул: ${productInfo.article || "Не найден"}
          </div>
        `
            : ""
        }
      </div>
      
      <!-- API Key Warning -->
      ${
        !apiKey
          ? `
        <div style="margin: 16px; padding: 12px; background: #fbbf24; color: #92400e; border-radius: 6px; font-size: 12px;">
          <strong>⚠️ API ключ не настроен</strong><br>
          Для получения реальных данных настройте API ключ в полной версии
        </div>
      `
          : ""
      }
      
      <!-- Content -->
      <div style="flex: 1; overflow-y: auto; padding: 16px;">
        <!-- Stats Cards -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: rgba(255,255,255,0.8); margin-bottom: 4px;">Позиция</div>
            <div style="font-size: 18px; font-weight: bold; color: white;">${productInfo?.position || Math.floor(Math.random() * 50) + 1}</div>
            <div style="font-size: 10px; color: rgba(255,255,255,0.7);">в поиске</div>
          </div>
          <div style="background: linear-gradient(135deg, #10b981, #047857); padding: 12px; border-radius: 8px;">
            <div style="font-size: 11px; color: rgba(255,255,255,0.8); margin-bottom: 4px;">Рейтинг</div>
            <div style="font-size: 18px; font-weight: bold; color: white;">${productInfo?.rating || "4.8"}</div>
            <div style="font-size: 10px; color: rgba(255,255,255,0.7);">из 5.0</div>
          </div>
        </div>
        
        <!-- Analytics Sections -->
        <div style="space-y: 16px;">
          <!-- Price Analysis -->
          <div style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: white;">Анализ цены</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 12px; color: #94a3b8;">Текущая цена:</span>
              <span style="font-size: 14px; font-weight: 600; color: #10b981;">${productInfo?.price || "13 500 ₽"}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 12px; color: #94a3b8;">Средняя в категории:</span>
              <span style="font-size: 12px; color: #94a3b8;">15 490 ₽</span>
            </div>
            <div style="height: 4px; background: #334155; border-radius: 2px; overflow: hidden;">
              <div style="height: 100%; width: 65%; background: #10b981; border-radius: 2px;"></div>
            </div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Цена ниже среднего на 35%</div>
          </div>
          
          <!-- Competition -->
          <div style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: white;">Конкуренция</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 12px; color: #94a3b8;">Товаров в категории:</span>
              <span style="font-size: 12px; color: white;">1,247</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 12px; color: #94a3b8;">Ваша позиция:</span>
              <span style="font-size: 12px; color: #f59e0b;">TOP 15%</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #94a3b8;">Уровень конкуренции:</span>
              <span style="font-size: 12px; color: #ef4444;">Высокий</span>
            </div>
          </div>
          
          <!-- Keywords -->
          <div style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: white;">Ключевые слова</h3>
            <div style="display: flex; flex-wrap: gap: 6px;">
              <span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px;">автоклав</span>
              <span style="background: #6366f1; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px;">консервирование</span>
              <span style="background: #8b5cf6; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px;">домашний</span>
              <span style="background: #06b6d4; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px;">тушенка</span>
            </div>
          </div>
          
          <!-- Actions -->
          <div style="display: flex; gap: 8px;">
            <button onclick="openFullAnalytics()" 
                    style="flex: 1; background: #3b82f6; color: white; border: none; padding: 10px; border-radius: 6px; font-size: 12px; cursor: pointer; transition: background 0.2s;"
                    onmouseover="this.style.background='#2563eb'" 
                    onmouseout="this.style.background='#3b82f6'">
              Полная аналитика
            </button>
            <button onclick="exportData()" 
                    style="flex: 1; background: #1e293b; color: #94a3b8; border: 1px solid #334155; padding: 10px; border-radius: 6px; font-size: 12px; cursor: pointer; transition: all 0.2s;"
                    onmouseover="this.style.borderColor='#64748b'; this.style.color='white'" 
                    onmouseout="this.style.borderColor='#334155'; this.style.color='#94a3b8'">
              Экспорт
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

async function extractProductInfo(tab) {
  try {
    // Inject content script to extract product data
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        // Extract product information from Wildberries page
        const article =
          document
            .querySelector('[data-link*="detail"]')
            ?.getAttribute("data-link")
            ?.match(/\/(\d+)\//)?.[1] || window.location.pathname.match(/\/detail\/(\d+)\//)?.[1]

        const price = document.querySelector(".price-block__final-price, .price__lower-price")?.textContent?.trim()
        const rating = document.querySelector(".product-review__rating, .rating__value")?.textContent?.trim()
        const title = document.querySelector("h1, .goods-name")?.textContent?.trim()

        return {
          article: article || null,
          price: price || null,
          rating: rating || null,
          title: title || null,
          position: Math.floor(Math.random() * 50) + 1, // Mock data
          url: window.location.href,
        }
      },
    })

    return results[0]?.result || null
  } catch (error) {
    console.error("Failed to extract product info:", error)
    return null
  }
}

async function getStoredApiKey() {
  try {
    const result = await chrome.storage.sync.get(["wbApiKey"])
    return result.wbApiKey || ""
  } catch (error) {
    console.error("Failed to get API key:", error)
    return ""
  }
}

function openFullAnalytics() {
  // Open full analytics in new tab
  chrome.tabs.create({
    url: chrome.runtime.getURL("dashboard.html"),
  })
}

function exportData() {
  // Export analytics data
  const data = {
    timestamp: new Date().toISOString(),
    source: "Wildberries Extension",
    analytics: {
      position: Math.floor(Math.random() * 50) + 1,
      rating: "4.8",
      price: "13 500 ₽",
      competition: "Высокая",
      keywords: ["автоклав", "консервирование", "домашний", "тушенка"],
    },
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  chrome.downloads.download({
    url: url,
    filename: `wb-analytics-${Date.now()}.json`,
  })
}
