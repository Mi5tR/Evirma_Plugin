"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchResult {
  id: number
  title: string
  body: string
}

export default function SearchPopup() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setResults([])
      setError("Пожалуйста, введите поисковый запрос.")
      return
    }

    setIsLoading(true)
    setError(null)
    setResults([])

    try {
      // IMPORTANT: This is a placeholder API endpoint.
      // For a real browser extension, you would replace this with your actual backend API.
      // Example: https://api.example.com/search?q=${encodeURIComponent(searchTerm)}
      // For demonstration, we'll use JSONPlaceholder and filter client-side.
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const allPosts: SearchResult[] = await response.json()

      // Simulate search by filtering posts based on title or body
      const filteredResults = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      setResults(filteredResults)
    } catch (e: any) {
      setError(`Не удалось получить данные: ${e.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-[350px] min-h-[200px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-center">Поиск по статьям</h2>

      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Введите запрос..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400"
        />
        <Button onClick={handleSearch} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {isLoading ? "Поиск..." : <Search className="w-4 h-4" />}
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {isLoading && <div className="text-center text-gray-500 dark:text-gray-400">Загрузка результатов...</div>}

      {!isLoading && results.length === 0 && !error && searchTerm.trim() && (
        <div className="text-center text-gray-500 dark:text-gray-400">Ничего не найдено.</div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="flex-1 overflow-y-auto max-h-[300px] pr-2">
          <ul className="space-y-3">
            {results.map((result) => (
              <li
                key={result.id}
                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <h3 className="font-medium text-base mb-1">{result.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{result.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
