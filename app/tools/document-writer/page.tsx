import { DocumentWriter } from '@/components/tools/document-writer'

export const metadata = {
  title: 'Documentation Writer | DevTools',
  description: 'AI-powered documentation generator',
}

export default function DocumentWriterPage() {
  return (
    <main className="flex-1 p-4 md:p-8 flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Documentation Writer</h1>
        <p className="text-muted-foreground">
          Generate professional documentation with AI. Chat-style interface with copy and download options.
        </p>
      </div>
      <DocumentWriter />
    </main>
  )
}
