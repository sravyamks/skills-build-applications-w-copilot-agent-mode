import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function useCollection(path) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        const collection = await fetchCollection(path, { signal: controller.signal })
        setItems(collection)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadItems()
    return () => controller.abort()
  }, [path])

  return { items, loading, error }
}
