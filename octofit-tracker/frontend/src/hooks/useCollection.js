import { useEffect, useState } from 'react'

export function useCollection(loadCollection) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        const collection = await loadCollection({ signal: controller.signal })
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
  }, [loadCollection])

  return { items, loading, error }
}
