import CollectionPage from './CollectionPage.jsx'
import { fetchCollection } from '../api.js'

async function fetch(options) {
  return fetchCollection('/api/workouts/', options)
}

export default function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      description="Explore sessions selected to keep your momentum going."
      endpoint="/api/workouts/"
      loadCollection={fetch}
      emptyMessage="Workout suggestions will show up here."
      columns={[
        { label: 'Workout', render: (item) => item.name ?? 'Workout' },
        { label: 'Focus', render: (item) => item.activityType ?? '—' },
        { label: 'Difficulty', render: (item) => item.difficulty ?? '—' },
        { label: 'Duration', render: (item) => Number.isFinite(item.durationMinutes) ? `${item.durationMinutes} min` : '—' },
        { label: 'Details', render: (item) => item.description ?? '—' },
      ]}
    />
  )
}
