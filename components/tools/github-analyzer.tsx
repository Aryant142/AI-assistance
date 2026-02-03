'use client'

import React from "react"

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Upload } from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function GitHubAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [barData, setBarData] = useState<any[]>([])
  const [lineData, setLineData] = useState<any[]>([])
  const [timeFilter, setTimeFilter] = useState('10d')
  const [error, setError] = useState('')

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('timeFilter', timeFilter)

    try {
      const response = await fetch('/api/github-analysis', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setBarData(data.barData || [])
        setLineData(data.lineData || [])
      }
    } catch (err) {
      setError('Failed to analyze CSV file')
    } finally {
      setLoading(false)
    }
  }

  async function updateTimeFilter(filter: string) {
    if (!file) return
    
    setTimeFilter(filter)
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('timeFilter', filter)

    try {
      const response = await fetch('/api/github-analysis', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setBarData(data.barData || [])
        setLineData(data.lineData || [])
      }
    } catch (err) {
      setError('Failed to update analysis')
    } finally {
      setLoading(false)
    }
  }

  const hasData = barData.length > 0 && lineData.length > 0

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Upload Area */}
      <Card className="glass p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Upload GitHub CSV</h3>
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={loading}
            className="block w-full text-sm text-muted-foreground
              file:mr-4 file:py-2 file:px-4 file:rounded-lg
              file:border-0 file:text-sm file:font-semibold
              file:bg-primary/20 file:text-primary
              hover:file:bg-primary/30"
          />
          {file && (
            <p className="text-sm text-muted-foreground">
              File: {file.name}
            </p>
          )}
        </div>
      </Card>

      {/* Time Filter */}
      {hasData && (
        <Card className="glass p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Time Range:</span>
            <Select value={timeFilter} onValueChange={updateTimeFilter} disabled={loading}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10d">Last 10 Days</SelectItem>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}

      {/* Error Message */}
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
            <p className="text-sm text-muted-foreground">Analyzing repository...</p>
          </div>
        </Card>
      )}

      {/* Charts */}
      {hasData && !loading && (
        <ScrollArea className="flex-1 space-y-4">
          <div className="pr-4 space-y-4">
            {/* Bar Chart */}
            <Card className="glass p-4">
              <h3 className="font-semibold mb-4">Repository Activity by Language</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 10, 15, 0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Line Chart */}
            <Card className="glass p-4">
              <h3 className="font-semibold mb-4">Activity Timeline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 10, 15, 0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="commits"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </ScrollArea>
      )}

      {/* Empty State */}
      {!hasData && !loading && (
        <Card className="glass flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">Upload a GitHub CSV file to analyze</p>
            <p className="text-sm">Support for commits, contributions, and activity data</p>
          </div>
        </Card>
      )}
    </div>
  )
}
