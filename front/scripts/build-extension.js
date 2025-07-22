const fs = require("fs")
const path = require("path")
const archiver = require("archiver")

// Создание ZIP архива расширения
function createExtensionZip() {
  const output = fs.createWriteStream("extension.zip")
  const archive = archiver("zip", {
    zlib: { level: 9 },
  })

  output.on("close", () => {
    console.log("✅ Расширение упаковано: extension.zip (" + archive.pointer() + " bytes)")
    console.log("📦 Готово к загрузке в Chrome Web Store или локальной установке")
  })

  archive.on("error", (err) => {
    throw err
  })

  archive.pipe(output)

  // Добавляем файлы из папки public
  archive.directory("public/", false)

  archive.finalize()
}

// Создание иконок расширения
function createIcons() {
  const iconsDir = path.join(__dirname, "../public/icons")

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true })
  }

  // Создаем простые SVG иконки и конвертируем в PNG
  const svgIcon = `
        <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="128" height="128" rx="24" fill="url(#grad)"/>
            <text x="64" y="80" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle">📊</text>
        </svg>
    `

  // Сохраняем SVG (для разработки)
  fs.writeFileSync(path.join(iconsDir, "icon.svg"), svgIcon)

  console.log("🎨 Иконки созданы в папке public/icons/")
  console.log("💡 Для продакшена замените SVG на PNG файлы размером 16x16, 48x48, 128x128")
}

// Проверка структуры расширения
function validateExtension() {
  const requiredFiles = [
    "public/manifest.json",
    "public/popup.html",
    "public/popup.js",
    "public/content-script.js",
    "public/background.js",
  ]

  let isValid = true

  requiredFiles.forEach((file) => {
    if (!fs.existsSync(file)) {
      console.error(`❌ Отсутствует файл: ${file}`)
      isValid = false
    }
  })

  if (isValid) {
    console.log("✅ Все необходимые файлы расширения присутствуют")
  }

  return isValid
}

// Основная функция сборки
function buildExtension() {
  console.log("🚀 Начинаем сборку расширения Exoad WB Analytics...\n")

  // Проверяем структуру
  if (!validateExtension()) {
    console.error("❌ Сборка прервана из-за отсутствующих файлов")
    return
  }

  // Создаем иконки
  createIcons()

  // Создаем ZIP архив
  createExtensionZip()

  console.log("\n📋 Инструкции по установке:")
  console.log("1. Откройте Chrome и перейдите в chrome://extensions/")
  console.log('2. Включите "Режим разработчика"')
  console.log('3. Нажмите "Загрузить распакованное расширение"')
  console.log('4. Выберите папку "public" из проекта')
  console.log("\n🌐 Для публикации в Chrome Web Store используйте extension.zip")
}

// Запуск сборки
if (require.main === module) {
  buildExtension()
}

module.exports = { buildExtension, validateExtension, createIcons }
