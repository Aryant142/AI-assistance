# Integration Examples - DevTools Hub

Complete examples for connecting real services to your dashboard.

## 1. Documentation Writer - OpenAI Integration

### Install Dependencies
```bash
npm install openai
```

### Update API Route
Replace `/app/api/document/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function generateDocumentation(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert technical documentation writer. Create clear, concise, and well-structured documentation.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  })

  return response.choices[0].message.content || ''
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      )
    }

    const result = await generateDocumentation(prompt)

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Documentation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate documentation' },
      { status: 500 }
    )
  }
}
```

### Add Environment Variable
`.env.local`:
```
OPENAI_API_KEY=sk-...
```

---

## 2. GitHub Analyzer - GitHub API Integration

### Install Dependencies
```bash
npm install octokit papaparse @types/papaparse
```

### Update API Route
Replace `/app/api/github-analysis/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from 'octokit'
import Papa from 'papaparse'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

interface AnalysisResult {
  barData: Array<{ name: string; value: number }>
  lineData: Array<{ date: string; commits: number }>
}

async function analyzeGitHubRepo(
  owner: string,
  repo: string,
  timeFilter: string
): Promise<AnalysisResult> {
  // Get commits
  const daysBack = timeFilter === '1m' ? 30 : timeFilter === '3m' ? 90 : 10
  const since = new Date()
  since.setDate(since.getDate() - daysBack)

  const commits = await octokit.rest.repos.listCommits({
    owner,
    repo,
    since: since.toISOString(),
    per_page: 100,
  })

  // Get language statistics
  const languages = await octokit.rest.repos.listLanguages({
    owner,
    repo,
  })

  // Process data
  const barData = Object.entries(languages).map(([lang, bytes]) => ({
    name: lang,
    value: bytes as number,
  }))

  // Group commits by date
  const commitsByDate: Record<string, number> = {}
  commits.data.forEach(commit => {
    const date = new Date(commit.commit.author?.date || '')
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    commitsByDate[date] = (commitsByDate[date] || 0) + 1
  })

  const lineData = Object.entries(commitsByDate).map(([date, count]) => ({
    date,
    commits: count,
  }))

  return { barData, lineData }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const timeFilter = (formData.get('timeFilter') as string) || '10d'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileContent = await file.text()

    // Parse CSV to get repo info
    const results = Papa.parse(fileContent, { header: true })
    const { data } = results as any

    if (!data || !data[0] || !data[0].owner || !data[0].repo) {
      return NextResponse.json(
        { error: 'CSV must have owner and repo columns' },
        { status: 400 }
      )
    }

    const { owner, repo } = data[0]
    const result = await analyzeGitHubRepo(owner, repo, timeFilter)

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
```

### Add Environment Variable
`.env.local`:
```
GITHUB_TOKEN=ghp_...
```

---

## 3. DSA Tool - Database Integration (Prisma + PostgreSQL)

### Install Dependencies
```bash
npm install @prisma/client
npx prisma init
```

### Create Database Schema
`prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model DSAQuestion {
  id         String   @id @default(cuid())
  title      String
  difficulty String   // Easy, Medium, Hard
  topic      String   // arrays, strings, etc.
  category   String
  acceptance Int      // 0-100
  url        String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([topic])
  @@index([difficulty])
}
```

### Update API Route
Replace `/app/api/dsa/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const topic = searchParams.get('topic')?.toLowerCase()

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic parameter is required' },
        { status: 400 }
      )
    }

    const questions = await prisma.dSAQuestion.findMany({
      where: {
        topic: topic,
      },
      orderBy: {
        difficulty: 'asc',
      },
    })

    if (questions.length === 0) {
      return NextResponse.json(
        { error: `No questions found for topic: ${topic}` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      topic,
      questions: questions.map(q => ({
        id: q.id,
        title: q.title,
        difficulty: q.difficulty,
        category: q.category,
        acceptance: q.acceptance,
      })),
      count: questions.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('DSA API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch DSA questions' },
      { status: 500 }
    )
  }
}
```

### Add Environment Variable
`.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/devtools"
```

### Setup Database
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

---

## 4. Documentation Writer - Anthropic Claude Integration

### Install Dependencies
```bash
npm install @anthropic-ai/sdk
```

### Update API Route
```typescript
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

async function generateDocumentation(prompt: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `You are an expert technical writer. Generate comprehensive documentation for: ${prompt}`,
      },
    ],
  })

  const textBlock = message.content.find(block => block.type === 'text')
  return textBlock && 'text' in textBlock ? textBlock.text : ''
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 })
    }

    const result = await generateDocumentation(prompt)

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate documentation' },
      { status: 500 }
    )
  }
}
```

### Add Environment Variable
`.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## 5. Real-Time Updates - With Webhooks

### Add Webhook Handler
`/app/api/webhooks/github/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

function verifySignature(payload: string, signature: string): boolean {
  const hmac = createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET!)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  return digest === signature
}

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const signature = request.headers.get('x-hub-signature-256') || ''

  if (!verifySignature(payload, signature)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const event = JSON.parse(payload)

  // Handle push events
  if (event.action === 'opened' || event.action === 'synchronize') {
    // Update your database or cache
    console.log('Repository updated:', event.repository.name)
  }

  return NextResponse.json({ success: true })
}
```

---

## 6. Caching with Redis - Upstash

### Install Dependencies
```bash
npm install @upstash/redis
```

### Update API with Caching
```typescript
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('topic')
  const cacheKey = `dsa:${topic}`

  // Check cache
  const cached = await redis.get(cacheKey)
  if (cached) {
    return NextResponse.json(JSON.parse(cached as string))
  }

  // Fetch fresh data
  const questions = await fetchQuestions(topic)

  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(questions))

  return NextResponse.json(questions)
}
```

### Add Environment Variables
`.env.local`:
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Testing Your Integrations

### Use PostMan or Insomnia

Create requests for each endpoint:

**POST /api/document**
```json
{
  "prompt": "Create API documentation for a REST API"
}
```

**POST /api/github-analysis**
Form data:
- file: (CSV file)
- timeFilter: 10d

**GET /api/dsa?topic=arrays**

### Monitor Performance

Add logging to track API calls:

```typescript
console.log(`[${new Date().toISOString()}] API: ${request.method} ${request.nextUrl.pathname}`)
```

## Best Practices

✅ **Do:**
- Use environment variables for API keys
- Implement error handling
- Add request validation
- Cache expensive operations
- Rate limit APIs
- Log API calls for debugging

❌ **Don't:**
- Commit API keys to version control
- Expose sensitive data in client-side code
- Make database calls from client components
- Trust user input without validation
- Ignore error responses

## Troubleshooting

**API Key not found:**
```bash
# Check .env.local exists and has correct values
cat .env.local
```

**Prisma migration issues:**
```bash
npx prisma migrate reset
npx prisma generate
```

**Redis connection error:**
```bash
# Test connection
npx @upstash/redis
```

---

## More Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Anthropic Claude Docs](https://docs.anthropic.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Upstash Redis Docs](https://upstash.com/docs/redis/overview)

Good luck with your integrations! 🚀
