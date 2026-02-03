'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Download, Badge } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DSAQuestion {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  acceptance: number
}

const DSA_TOPICS = [
  'arrays',
  'strings',
  'linked-lists',
  'trees',
  'graphs',
  'dp',
  'sorting',
  'searching',
  'hashing',
  'stacks-queues',
]

export function DSATool() {
  const [selectedTopic, setSelectedTopic] = useState('arrays')
  const [questions, setQuestions] = useState<DSAQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchQuestions(selectedTopic)
  }, [selectedTopic])

  async function fetchQuestions(topic: string) {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/dsa?topic=${topic}`)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setQuestions([])
      } else {
        setQuestions(data.questions || [])
      }
    } catch (err) {
      setError('Failed to fetch DSA questions')
      setQuestions([])
    } finally {
      setLoading(false)
    }
  }

  function getDifficultyColor(difficulty: string) {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-muted/20 text-muted-foreground'
    }
  }

  function downloadAsExcel() {
    if (questions.length === 0) return

    // Create CSV content
    const headers = ['ID', 'Title', 'Difficulty', 'Category', 'Acceptance Rate']
    const rows = questions.map(q => [
      q.id,
      q.title,
      q.difficulty,
      q.category,
      `${q.acceptance}%`,
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n')

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
    element.setAttribute('download', `dsa-${selectedTopic}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Topic Selector */}
      <Card className="glass p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium block mb-2">Select Topic:</label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic} disabled={loading}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DSA_TOPICS.map(topic => (
                  <SelectItem key={topic} value={topic}>
                    {topic.replace('-', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {questions.length > 0 && (
            <Button
              onClick={downloadAsExcel}
              variant="outline"
              className="gap-2 self-end sm:self-center bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export to CSV
            </Button>
          )}
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="glass p-4 border-destructive/50 bg-destructive/10">
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card className="glass flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading DSA questions...</p>
          </div>
        </Card>
      )}

      {/* Questions Table */}
      {questions.length > 0 && !loading && (
        <Card className="glass flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <Table>
              <TableHeader className="bg-white/5 sticky top-0">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-foreground">ID</TableHead>
                  <TableHead className="text-foreground">Title</TableHead>
                  <TableHead className="text-foreground">Difficulty</TableHead>
                  <TableHead className="text-foreground">Category</TableHead>
                  <TableHead className="text-right text-foreground">Acceptance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map(question => (
                  <TableRow
                    key={question.id}
                    className="border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {question.id}
                    </TableCell>
                    <TableCell className="font-medium">{question.title}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {question.category}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {question.acceptance}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          {/* Summary */}
          <div className="border-t border-white/10 p-4 flex gap-4 flex-wrap text-sm">
            <div>
              <p className="text-muted-foreground">Total Questions</p>
              <p className="text-xl font-bold text-primary">{questions.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Easy</p>
              <p className="text-xl font-bold text-green-400">
                {questions.filter(q => q.difficulty === 'Easy').length}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Medium</p>
              <p className="text-xl font-bold text-yellow-400">
                {questions.filter(q => q.difficulty === 'Medium').length}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Hard</p>
              <p className="text-xl font-bold text-red-400">
                {questions.filter(q => q.difficulty === 'Hard').length}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {questions.length === 0 && !loading && (
        <Card className="glass flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">No questions found</p>
            <p className="text-sm">Try selecting a different topic</p>
          </div>
        </Card>
      )}
    </div>
  )
}
