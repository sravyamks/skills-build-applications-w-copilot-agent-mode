function resolveApiBaseUrl(hostname, codespaceName) {
  const configuredName = codespaceName?.trim()
  if (configuredName) {
    return `https://${configuredName}-8000.app.github.dev`
  }

  const codespaceSuffix = '-5173.app.github.dev'
  if (hostname?.endsWith(codespaceSuffix)) {
    return `https://${hostname.slice(0, -codespaceSuffix.length)}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

export const apiBaseUrl = import.meta.env.DEV
  ? ''
  : resolveApiBaseUrl(
      typeof window === 'undefined' ? undefined : window.location.hostname,
      import.meta.env.VITE_CODESPACE_NAME,
    )

function getCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return null
  }

  for (const key of ['results', 'items', 'docs', 'content', 'data']) {
    if (payload[key] !== undefined) {
      const collection = getCollection(payload[key])
      if (collection) {
        return collection
      }
    }
  }

  return null
}

export async function fetchCollection(path, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  const collection = getCollection(payload)

  if (!Array.isArray(collection)) {
    throw new Error('The API response did not contain a collection')
  }

  return collection
}
