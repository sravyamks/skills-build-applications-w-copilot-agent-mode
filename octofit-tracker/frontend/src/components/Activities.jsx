import CollectionPage from './CollectionPage.jsx'
import { fetchCollection } from '../api.js'

const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '—')
const formatNumber = (value, suffix = '') => (Number.isFinite(value) ? `${value}${suffix}` : '—')

async function fetch(options) {
  return fetchCollection('/api/activities/', options)
}

export default function Activities() {
  return (
    <CollectionPage
      title="Activities"
      description="Recent movement from across your teams."
      endpoint="/api/activities/"
      loadCollection={fetch}
      emptyMessage="Log an activity to start building your history."
      columns={[
        { label: 'Athlete', render: (item) => item.user?.displayName ?? item.user?.username ?? 'Athlete' },
        { label: 'Activity', render: (item) => item.type ?? 'Activity' },
        { label: 'Duration', render: (item) => formatNumber(item.durationMinutes, ' min') },
        { label: 'Distance', render: (item) => formatNumber(item.distanceKilometers, ' km') },
        { label: 'Calories', render: (item) => formatNumber(item.calories) },
        { label: 'Completed', render: (item) => formatDate(item.completedAt) },
      ]}
    />
  )
}
