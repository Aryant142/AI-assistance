# Component Reference - DevTools Hub

Complete API documentation for all custom components.

## Layout Components

### `Background3D`
Located: `/components/3d-background.tsx`

3D animated background using Three.js with floating wireframe shapes.

**Usage:**
```tsx
import { Background3D } from '@/components/3d-background'

export default function Layout() {
  return (
    <>
      <Background3D />
      {/* Rest of layout */}
    </>
  )
}
```

**Features:**
- Animated icosahedron in center
- Three floating spheres with different colors
- Wireframe material style
- Emissive glow effects
- Night environment lighting

**Customization:**
```tsx
// In AnimatedSphere component
<meshStandardMaterial
  color="#6366f1"              // Change color
  emissive="#4f46e5"           // Change glow color
  emissiveIntensity={0.5}      // Change glow intensity
/>

// In useFrame hook
meshRef.current.rotation.x = state.clock.elapsedTime * 0.2  // Change speed

// In FloatingShapes
<Float speed={1.5} floatIntensity={2} />  // Adjust animation
```

**Props:** None (uses global Three.js context)

**Performance:** Optimized for 60fps with LOD culling

---

### `Sidebar`
Located: `/components/sidebar.tsx`

Responsive navigation sidebar with mobile menu support.

**Usage:**
```tsx
import { Sidebar } from '@/components/sidebar'

export default function Layout() {
  return (
    <>
      <Sidebar />
      <main>{/* Content */}</main>
    </>
  )
}
```

**Features:**
- Mobile hamburger menu
- Active route highlighting
- Glassmorphism styling
- Icon navigation
- Smooth transitions
- Auto-close on mobile navigation

**Props:** None

**Navigation Items:**
```typescript
{
  href: '/',
  label: 'Dashboard',
  icon: Home,
}
```

**Styling:**
- Desktop: Always visible, fixed width (16rem)
- Mobile: Hidden by default, overlay with hamburger
- Hover effect on links
- Active state with glow effect

---

## Tool Components

### `DocumentWriter`
Located: `/components/tools/document-writer.tsx`

Chat-style interface for documentation generation.

**Usage:**
```tsx
import { DocumentWriter } from '@/components/tools/document-writer'

export default function Page() {
  return <DocumentWriter />
}
```

**Features:**
- Chat-style message display
- Real-time message streaming
- Copy to clipboard
- Download as .txt file
- Loading state with spinner
- Empty state messaging

**Props:** None

**Internal State:**
```typescript
prompt: string              // Current input
messages: Message[]         // Chat history
loading: boolean            // Loading state
copying: boolean            // Copy button state
```

**API Endpoint:**
```
POST /api/document
Body: { prompt: string }
```

**Messages Interface:**
```typescript
{
  role: 'user' | 'assistant'
  content: string
}
```

---

### `GitHubAnalyzer`
Located: `/components/tools/github-analyzer.tsx`

CSV uploader with data visualization and filtering.

**Usage:**
```tsx
import { GitHubAnalyzer } from '@/components/tools/github-analyzer'

export default function Page() {
  return <GitHubAnalyzer />
}
```

**Features:**
- CSV file upload
- Bar chart (activity by language)
- Line chart (activity timeline)
- Time range filters (10d, 1m, 3m)
- Error handling
- Empty state
- Data export ready

**Props:** None

**Internal State:**
```typescript
file: File | null
loading: boolean
barData: Array<{ name: string; value: number }>
lineData: Array<{ date: string; commits: number }>
timeFilter: '10d' | '1m' | '3m'
error: string
```

**API Endpoints:**
```
POST /api/github-analysis
Form Data:
  - file: File (CSV)
  - timeFilter: string ('10d' | '1m' | '3m')
```

**Expected CSV Format:**
```
owner,repo,language,commits,date
user,project,javascript,25,2024-01-15
```

**Chart Data Structure:**
```typescript
barData: [
  { name: 'JavaScript', value: 450 },
  { name: 'TypeScript', value: 320 }
]

lineData: [
  { date: 'Jan 1', commits: 15 },
  { date: 'Jan 2', commits: 22 }
]
```

---

### `DSATool`
Located: `/components/tools/dsa-tool.tsx`

DSA problem browser with topic selection and difficulty filtering.

**Usage:**
```tsx
import { DSATool } from '@/components/tools/dsa-tool'

export default function Page() {
  return <DSATool />
}
```

**Features:**
- Topic selection dropdown
- Problem table with sorting
- Difficulty color coding
- Acceptance rate display
- CSV export functionality
- Statistics summary
- Empty state handling

**Props:** None

**Available Topics:**
```typescript
'arrays'
'strings'
'linked-lists'
'trees'
'graphs'
'dp'
'sorting'
'searching'
'hashing'
'stacks-queues'
```

**Internal State:**
```typescript
selectedTopic: string
questions: DSAQuestion[]
loading: boolean
error: string
```

**Question Interface:**
```typescript
interface DSAQuestion {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  acceptance: number  // 0-100
}
```

**API Endpoint:**
```
GET /api/dsa?topic={topic}
```

**Response:**
```json
{
  "success": true,
  "topic": "arrays",
  "questions": [...],
  "count": 8,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Difficulty Colors:**
- Easy: Green (`bg-green-500/20 text-green-400`)
- Medium: Yellow (`bg-yellow-500/20 text-yellow-400`)
- Hard: Red (`bg-red-500/20 text-red-400`)

---

## Utility Components

### `Button` (Shadcn/ui)
```tsx
<Button variant="default" size="md">
  Click me
</Button>
```

**Variants:**
- `default` - Primary button
- `outline` - Bordered button
- `ghost` - Text-only button
- `destructive` - Danger action

**Sizes:**
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `icon` - Square icon button

---

### `Card` (Shadcn/ui)
```tsx
<Card className="glass p-6">
  <h2>Card Title</h2>
</Card>
```

**Styling:**
- Apply `.glass` for glassmorphism
- Add padding with `p-4`, `p-6`, etc.
- Use border utilities as needed

---

### `ScrollArea` (Shadcn/ui)
```tsx
<ScrollArea className="h-96">
  {/* Scrollable content */}
</ScrollArea>
```

**Features:**
- Custom scrollbar styling
- Smooth scrolling
- Responsive height

---

### `Select` (Radix UI)
```tsx
<Select value={topic} onValueChange={setTopic}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="arrays">Arrays</SelectItem>
    <SelectItem value="strings">Strings</SelectItem>
  </SelectContent>
</Select>
```

---

### `Textarea` (Shadcn/ui)
```tsx
<Textarea 
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Enter text..."
  rows={3}
/>
```

---

### `Table` (Shadcn/ui)
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Value 1</TableCell>
      <TableCell>Value 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Page Components

### DocumentWriter Page
Located: `/app/tools/document-writer/page.tsx`

**Route:** `/tools/document-writer`

**Metadata:**
```typescript
title: 'Documentation Writer | DevTools'
description: 'AI-powered documentation generator'
```

**Layout:**
```tsx
<main>
  <header>
    <h1>Documentation Writer</h1>
    <p>Description</p>
  </header>
  <DocumentWriter />
</main>
```

---

### GitHubAnalyzer Page
Located: `/app/tools/github-analyzer/page.tsx`

**Route:** `/tools/github-analyzer`

**Metadata:**
```typescript
title: 'GitHub Analyzer | DevTools'
description: 'Analyze GitHub data with visual charts'
```

---

### DSATool Page
Located: `/app/tools/dsa/page.tsx`

**Route:** `/tools/dsa`

**Metadata:**
```typescript
title: 'DSA Questions | DevTools'
description: 'Browse and practice DSA problems by topic'
```

---

### Dashboard Page
Located: `/app/page.tsx`

**Route:** `/`

**Features:**
- Tool cards with descriptions
- Feature highlights
- Gradient text styling
- Call-to-action buttons

**Tool Cards:**
```typescript
{
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string  // Gradient class
}
```

---

## API Route Components

### Document API
Located: `/app/api/document/route.ts`

**Handler:** `POST`

**Request:**
```json
{
  "prompt": "Generate API documentation"
}
```

**Response:**
```json
{
  "success": true,
  "result": "Generated documentation...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
```json
{
  "error": "Invalid prompt provided",
  "status": 400
}
```

---

### GitHub Analysis API
Located: `/app/api/github-analysis/route.ts`

**Handler:** `POST` (multipart/form-data)

**Request:**
```
file: File (CSV)
timeFilter: "10d" | "1m" | "3m"
```

**Response:**
```json
{
  "success": true,
  "barData": [
    { "name": "JavaScript", "value": 450 }
  ],
  "lineData": [
    { "date": "Jan 1", "commits": 15 }
  ],
  "timeFilter": "10d",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### DSA API
Located: `/app/api/dsa/route.ts`

**Handler:** `GET`

**Query Parameters:**
```
topic: string (required)
```

**Response:**
```json
{
  "success": true,
  "topic": "arrays",
  "questions": [
    {
      "id": "1",
      "title": "Two Sum",
      "difficulty": "Easy",
      "category": "Arrays",
      "acceptance": 48
    }
  ],
  "count": 8,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
```json
{
  "error": "Topic 'invalid' not found. Available topics: arrays, strings, ...",
  "status": 404
}
```

---

## Type Definitions

### Message Type
```typescript
interface Message {
  role: 'user' | 'assistant'
  content: string
}
```

### Chart Data Types
```typescript
interface BarData {
  name: string
  value: number
}

interface LineData {
  date: string
  commits: number
}
```

### DSAQuestion Type
```typescript
interface DSAQuestion {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  acceptance: number
}
```

---

## CSS Classes Reference

### Glassmorphism
- `.glass` - Full glass effect
- `.glass-sm` - Small glass effect
- `.glass-dark` - Dark glass effect

### Effects
- `.glow-primary` - Purple glow
- `.glow-accent` - Cyan glow

### Responsive
- `md:` - Tablet and above
- `lg:` - Desktop and above
- `hidden md:block` - Hidden on mobile

### Text
- `.text-foreground` - Primary text color
- `.text-muted-foreground` - Secondary text color
- `.text-primary` - Brand color text
- `.text-balance` - Optimal line breaking

---

## Hooks Used

### Built-in React Hooks
- `useState` - State management
- `useEffect` - Side effects
- `useRef` - DOM references
- `useMemo` - Memoization

### Next.js Hooks
- `usePathname()` - Current route
- `useRouter()` - Navigation
- `useSearchParams()` - Query params

### Custom Hooks
- None (directly implemented)

---

## Best Practices

✅ **Do:**
- Use TypeScript for type safety
- Memoize expensive components
- Handle loading and error states
- Validate API responses
- Use semantic HTML
- Optimize images
- Add accessibility attributes

❌ **Don't:**
- Fetch in useEffect (use server components)
- Pass all props to children
- Create inline styles
- Ignore error handling
- Use generic class names
- Make API calls in render

---

Complete component reference ready for development! 🎨
