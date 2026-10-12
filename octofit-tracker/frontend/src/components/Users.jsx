import CollectionPage from './CollectionPage.jsx'

export default function Users() {
  return (
    <CollectionPage
      title="Athletes"
      description="Meet the people showing up and moving forward."
      endpoint="/api/users/"
      emptyMessage="Athlete profiles will appear here."
      columns={[
        { label: 'Name', render: (item) => item.displayName ?? item.username ?? 'Athlete' },
        { label: 'Username', render: (item) => item.username ? `@${item.username}` : '—' },
        { label: 'Email', render: (item) => item.email ?? '—' },
        { label: 'Team', render: (item) => item.team?.name ?? 'Not on a team' },
      ]}
    />
  )
}
