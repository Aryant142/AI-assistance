import { GitHubAnalyzer } from '@/components/tools/github-analyzer'

export const metadata = {
  title: 'GitHub Analyzer | DevTools',
  description: 'Analyze GitHub data with visual charts',
}

export default function GitHubAnalyzerPage() {
  return (
    <main className="flex-1 p-4 md:p-8 flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">GitHub Analyzer</h1>
        <p className="text-muted-foreground">
          Upload a GitHub CSV file to visualize repository activity, commits by language, and trends over time.
        </p>
      </div>
      <GitHubAnalyzer />
    </main>
  )
}
