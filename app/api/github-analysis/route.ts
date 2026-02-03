import { NextRequest, NextResponse } from 'next/server'

interface AnalysisResult {
  barData: Array<{ name: string; value: number }>
  lineData: Array<{ date: string; commits: number }>
}

async function parseCSVAndAnalyze(fileContent: string, timeFilter: string): Promise<AnalysisResult> {
  // Parse CSV content
  const lines = fileContent.split('\n').filter(line => line.trim())
  
  // Mock data analysis based on time filter
  const barData = [
    { name: 'JavaScript', value: Math.floor(Math.random() * 1000) + 200 },
    { name: 'TypeScript', value: Math.floor(Math.random() * 1000) + 200 },
    { name: 'Python', value: Math.floor(Math.random() * 800) + 100 },
    { name: 'Go', value: Math.floor(Math.random() * 600) + 50 },
    { name: 'Rust', value: Math.floor(Math.random() * 500) + 30 },
  ]

  let lineData: Array<{ date: string; commits: number }> = []
  
  const now = new Date()
  let daysBack = 10

  if (timeFilter === '1m') daysBack = 30
  if (timeFilter === '3m') daysBack = 90

  for (let i = daysBack; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    lineData.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      commits: Math.floor(Math.random() * 50) + 5,
    })
  }

  return { barData, lineData }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const timeFilter = (formData.get('timeFilter') as string) || '10d'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (!file.name.endsWith('.csv')) {
      return NextResponse.json(
        { error: 'Only CSV files are supported' },
        { status: 400 }
      )
    }

    const fileContent = await file.text()

    if (!fileContent.trim()) {
      return NextResponse.json(
        { error: 'CSV file is empty' },
        { status: 400 }
      )
    }

    const result = await parseCSVAndAnalyze(fileContent, timeFilter)

    return NextResponse.json({
      success: true,
      ...result,
      timeFilter,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('GitHub analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze GitHub data' },
      { status: 500 }
    )
  }
}
