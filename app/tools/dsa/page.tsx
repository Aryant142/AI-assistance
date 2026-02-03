import { DSATool } from '@/components/tools/dsa-tool'

export const metadata = {
  title: 'DSA Questions | DevTools',
  description: 'Browse and practice DSA problems by topic',
}

export default function DSAToolPage() {
  return (
    <main className="flex-1 p-4 md:p-8 flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">DSA Questions</h1>
        <p className="text-muted-foreground">
          Explore data structures and algorithms problems by category. Filter by difficulty and export to CSV.
        </p>
      </div>
      <DSATool />
    </main>
  )
}
