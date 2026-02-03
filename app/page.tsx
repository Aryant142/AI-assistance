export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your content is now clearly visible on a clean white background.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Card Title</h2>
            <p className="text-muted-foreground">
              This is a sample card with proper contrast on a white background.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Another Card</h2>
            <p className="text-muted-foreground">
              All text elements have sufficient contrast for readability.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">Third Card</h2>
            <p className="text-muted-foreground">
              The design uses semantic color tokens for consistency.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
