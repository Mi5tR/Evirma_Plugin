// Background service worker for Wildberries extension
console.log("Exoad WB Analytics: Background script loaded")

// Declare chrome variable
const chrome = window.chrome

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details.reason)

  if (details.reason === "install") {
    // Set default settings
    chrome.storage.sync.set({
      extensionEnabled: true,
      autoAnalytics: true,
      notificationsEnabled: true,
    })

    // Open welcome page
    chrome.tabs.create({
      url: chrome.runtime.getURL("dashboard.html"),
    })
  }
})

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message)

  switch (message.type) {
    case "PRODUCT_DATA":
      handleProductData(message.data, sender.tab)
      break

    case "GET_API_KEY":
      getApiKey().then(sendResponse)
      return true // Keep message channel open for async response

    case "SET_API_KEY":
      setApiKey(message.apiKey).then(sendResponse)
      return true

    case "ANALYZE_PAGE":
      analyzePage(sender.tab).then(sendResponse)
      return true

    default:
      console.log("Unknown message type:", message.type)
  }
})

// Handle product data from content script
async function handleProductData(productData, tab) {
  console.log("Processing product data:", productData)

  try {
    // Store product data
    const storageKey = `product_${productData.article || Date.now()}`
    await chrome.storage.local.set({
      [storageKey]: {
        ...productData,
        timestamp: new Date().toISOString(),
        tabId: tab.id,
        url: tab.url,
      },
    })

    // Update badge with position if available
    if (productData.position) {
      chrome.action.setBadgeText({
        text: `#${productData.position}`,
        tabId: tab.id,
      })
      chrome.action.setBadgeBackgroundColor({
        color: "#3b82f6",
        tabId: tab.id,
      })
    }

    // Send notification if enabled
    const settings = await chrome.storage.sync.get(["notificationsEnabled"])
    if (settings.notificationsEnabled) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Exoad WB Analytics",
        message: `Товар проанализирован: позиция #${productData.position || "неизвестна"}`,
      })
    }
  } catch (error) {
    console.error("Error handling product data:", error)
  }
}

// Get API key from storage
async function getApiKey() {
  try {
    const result = await chrome.storage.sync.get(["wbApiKey"])
    return result.wbApiKey || ""
  } catch (error) {
    console.error("Error getting API key:", error)
    return ""
  }
}

// Set API key in storage
async function setApiKey(apiKey) {
  try {
    await chrome.storage.sync.set({ wbApiKey: apiKey })
    return { success: true }
  } catch (error) {
    console.error("Error setting API key:", error)
    return { success: false, error: error.message }
  }
}

// Analyze current page
async function analyzePage(tab) {
  try {
    // Check if it's a Wildberries page
    if (!tab.url.includes("wildberries.ru") && !tab.url.includes("wb.ru")) {
      return { error: "Not a Wildberries page" }
    }

    // Execute content script to extract data
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractPageData,
    })

    const pageData = results[0]?.result
    if (pageData) {
      await handleProductData(pageData, tab)
      return { success: true, data: pageData }
    }

    return { error: "No data extracted" }
  } catch (error) {
    console.error("Error analyzing page:", error)
    return { error: error.message }
  }
}

// Function to inject for page data extraction
function extractPageData() {
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
    position: Math.floor(Math.random() * 50) + 1, // Mock position data
  }
}

// Handle tab updates to clear badges when leaving WB
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    // Clear badge if not on Wildberries
    if (!tab.url.includes("wildberries.ru") && !tab.url.includes("wb.ru")) {
      chrome.action.setBadgeText({
        text: "",
        tabId: tabId,
      })
    }
  }
})

// Handle context menu (right-click) actions
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyze-product") {
    analyzePage(tab)
  }
})

// Create context menu on startup
chrome.runtime.onStartup.addListener(() => {
  createContextMenu()
})

chrome.runtime.onInstalled.addListener(() => {
  createContextMenu()
})

function createContextMenu() {
  chrome.contextMenus.create({
    id: "analyze-product",
    title: "Анализировать товар Exoad",
    contexts: ["page"],
    documentUrlPatterns: ["*://*.wildberries.ru/*", "*://*.wb.ru/*"],
  })
}

// Periodic cleanup of old data
setInterval(
  async () => {
    try {
      const data = await chrome.storage.local.get()
      const now = Date.now()
      const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000

      const keysToRemove = []

      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith("product_") && value.timestamp) {
          const timestamp = new Date(value.timestamp).getTime()
          if (timestamp < oneWeekAgo) {
            keysToRemove.push(key)
          }
        }
      }

      if (keysToRemove.length > 0) {
        await chrome.storage.local.remove(keysToRemove)
        console.log(`Cleaned up ${keysToRemove.length} old product records`)
      }
    } catch (error) {
      console.error("Error during cleanup:", error)
    }
  },
  24 * 60 * 60 * 1000,
) // Run daily
