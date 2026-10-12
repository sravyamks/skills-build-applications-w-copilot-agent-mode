import { useCollection } from '../hooks/useCollection.js'

export default function CollectionPage({
  title,
  description,
  endpoint,
  loadCollection,
  columns,
  emptyMessage,
}) {
  const { items, loading, error } = useCollection(loadCollection)

  return (
    <section aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Octofit Tracker</p>
          <h1 id="page-title">{title}</h1>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        <span className="badge rounded-pill text-bg-light border">
          {loading ? 'Loading' : `${items.length} ${items.length === 1 ? 'record' : 'records'}`}
        </span>
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2 py-5" role="status">
          <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true" />
          Loading {title.toLowerCase()}...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Could not load {title.toLowerCase()}.</strong> {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="empty-state">
          <h2>Nothing here yet</h2>
          <p className="text-secondary mb-0">{emptyMessage}</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive data-table-wrap">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column.label}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? `${endpoint}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.label}>{column.render(item)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
