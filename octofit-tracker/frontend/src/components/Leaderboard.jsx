import CollectionPage from './CollectionPage.jsx'

export default function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      description="Celebrate consistency and friendly competition."
      endpoint="/api/leaderboard/"
      emptyMessage="Leaderboard entries will appear as points are earned."
      columns={[
        { label: 'Athlete', render: (item) => item.user?.displayName ?? item.user?.username ?? 'Athlete' },
        { label: 'Team', render: (item) => item.team?.name ?? 'Individual' },
        { label: 'Period', render: (item) => item.period ?? '—' },
        { label: 'Points', render: (item) => item.points ?? 0 },
      ]}
    />
  )
}
