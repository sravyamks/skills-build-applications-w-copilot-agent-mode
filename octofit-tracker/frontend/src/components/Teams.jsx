import CollectionPage from './CollectionPage.jsx'
import { fetchCollection } from '../api.js'

async function fetch(options) {
  return fetchCollection('/api/teams/', options)
}

export default function Teams() {
  return (
    <CollectionPage
      title="Teams"
      description="Find your crew and see what everyone is working toward."
      endpoint="/api/teams/"
      loadCollection={fetch}
      emptyMessage="Create a team to start reaching goals together."
      columns={[
        { label: 'Team', render: (item) => item.name ?? 'Team' },
        { label: 'About', render: (item) => item.description || '—' },
        { label: 'Members', render: (item) => item.members?.length ?? 0 },
        { label: 'Points', render: (item) => item.points ?? 0 },
      ]}
    />
  )
}
