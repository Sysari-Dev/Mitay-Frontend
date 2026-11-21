const swatches = [
  { token: 'primary', className: 'bg-primary text-primary-foreground' },
  { token: 'secondary', className: 'bg-secondary text-secondary-foreground' },
  { token: 'tertiary', className: 'bg-tertiary text-tertiary-foreground' },
  { token: 'accent', className: 'bg-accent text-accent-foreground' },
  { token: 'muted', className: 'bg-muted text-muted-foreground' },
  { token: 'card', className: 'bg-card text-card-foreground border' },
  { token: 'background', className: 'bg-background text-foreground border' },
  { token: 'success', className: 'bg-success text-success-foreground' },
  { token: 'warning', className: 'bg-warning text-warning-foreground' },
  { token: 'info', className: 'bg-info text-info-foreground' },
  { token: 'destructive', className: 'bg-destructive text-destructive-foreground' },
  { token: 'sidebar', className: 'bg-sidebar text-sidebar-foreground border' },
]

function ThemePreview() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {swatches.map(({ token, className }) => (
        <div
          key={token}
          className={`flex h-20 items-end rounded-lg p-3 font-mono text-sm font-medium ${className}`}
        >
          {token}
        </div>
      ))}
    </div>
  )
}

export { ThemePreview }
