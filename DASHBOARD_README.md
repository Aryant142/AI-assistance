# DevTools Hub - Dashboard Documentation

A modern AI developer tools dashboard with glassmorphism UI, 3D background, and three integrated tools.

## Features

### 🎨 Design
- **Glassmorphism UI** - Modern frosted glass effect with backdrop blur
- **3D Background** - Interactive animated 3D scene with floating wireframe shapes
- **Dark Theme** - Premium dark color scheme with vibrant accent colors
- **Responsive Layout** - Mobile-first design with sidebar navigation
- **Smooth Animations** - Fluid transitions and hover effects

### 🛠️ Tools

#### 1. Documentation Writer
- **Endpoint**: `/api/document` (POST)
- **Features**:
  - Chat-style interface for generating documentation
  - AI-powered content generation
  - Copy to clipboard functionality
  - Download as `.txt` file
  - Real-time streaming responses

**Request Body**:
```json
{
  "prompt": "Description of what documentation you need"
}
```

**Response**:
```json
{
  "success": true,
  "result": "Generated documentation content...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 2. GitHub Analyzer
- **Endpoint**: `/api/github-analysis` (POST, multipart/form-data)
- **Features**:
  - CSV file upload for GitHub data
  - Bar chart visualization by language
  - Line chart for activity timeline
  - Time range filters (10d, 1m, 3m)
  - Animated transitions

**Request Data**:
```
file: <CSV file>
timeFilter: "10d" | "1m" | "3m"
```

**Response**:
```json
{
  "success": true,
  "barData": [
    { "name": "JavaScript", "value": 450 },
    { "name": "TypeScript", "value": 320 }
  ],
  "lineData": [
    { "date": "Jan 1", "commits": 15 },
    { "date": "Jan 2", "commits": 22 }
  ],
  "timeFilter": "10d",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 3. DSA Tool
- **Endpoint**: `/api/dsa?topic={topic}` (GET)
- **Features**:
  - Browse DSA problems by topic
  - Filter by difficulty level
  - View acceptance rates
  - Export to CSV

**Query Parameters**:
- `topic`: Topic slug (arrays, strings, linked-lists, trees, graphs, dp, sorting, searching, hashing, stacks-queues)

**Response**:
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

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── document/route.ts          # Documentation generation
│   │   ├── github-analysis/route.ts   # GitHub CSV analysis
│   │   └── dsa/route.ts               # DSA questions database
│   ├── tools/
│   │   ├── document-writer/page.tsx
│   │   ├── github-analyzer/page.tsx
│   │   └── dsa/page.tsx
│   ├── layout.tsx                     # Root layout with 3D background & sidebar
│   ├── globals.css                    # Theme tokens & glassmorphism styles
│   └── page.tsx                       # Dashboard homepage
├── components/
│   ├── 3d-background.tsx              # Three.js 3D scene
│   ├── sidebar.tsx                    # Navigation sidebar
│   └── tools/
│       ├── document-writer.tsx        # Doc writer component
│       ├── github-analyzer.tsx        # GitHub analyzer component
│       └── dsa-tool.tsx               # DSA tool component
└── lib/
    └── utils.ts                       # Utility functions (cn, etc.)
```

## Customization Guide

### 1. Connecting Real APIs

#### Documentation Writer
Replace the mock generation in `/app/api/document/route.ts`:

```typescript
// Replace generateDocumentation function with real API call
async function generateDocumentation(prompt: string): Promise<string> {
  const response = await fetch('https://your-ai-api.com/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt })
  })
  
  const data = await response.json()
  return data.content
}
```

#### GitHub Analyzer
Replace CSV parsing in `/app/api/github-analysis/route.ts`:

```typescript
async function parseCSVAndAnalyze(fileContent: string, timeFilter: string): Promise<AnalysisResult> {
  // Use a CSV parsing library like papaparse
  const csv = Papa.parse(fileContent)
  // Process your actual GitHub data
  // Return bar and line chart data
}
```

#### DSA Tool
Replace mock data in `/app/api/dsa/route.ts`:

```typescript
// Replace DSA_QUESTIONS with database queries
const questions = await db.dsa_questions
  .where({ topic })
  .select('*')
```

### 2. Theme Customization

Edit `/app/globals.css` to customize colors:

```css
:root {
  --primary: 250 100% 65%;      /* Purple-blue */
  --accent: 180 90% 50%;        /* Cyan */
  --secondary: 200 100% 50%;    /* Blue */
  --background: 10 10% 5%;      /* Almost black */
}
```

### 3. 3D Background Customization

Modify `/components/3d-background.tsx`:

```typescript
// Change colors
<meshStandardMaterial color="#6366f1" />

// Adjust animation speeds
useFrame((state) => {
  meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
})

// Modify floating shape positions
position={[-3, 2, -5]}
```

### 4. Adding New Tools

1. Create component: `/components/tools/new-tool.tsx`
2. Create page: `/app/tools/new-tool/page.tsx`
3. Create API: `/app/api/new-tool/route.ts`
4. Add to sidebar navigation in `/components/sidebar.tsx`

## Environment Variables

Create `.env.local`:

```env
# Optional: For real API integrations
AI_API_KEY=your-api-key
GITHUB_API_KEY=your-github-key
DATABASE_URL=your-database-url
```

## Performance Optimizations

- **3D Scene**: Uses LOD (Level of Detail) and frustum culling
- **Charts**: Recharts with memoization
- **Code Splitting**: Dynamic imports for tool components
- **Caching**: SWR for client-side data fetching

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- Requires WebGL for 3D background

## Dependencies

- **Next.js 16**: Framework
- **React 19**: UI library
- **Three.js**: 3D graphics
- **React Three Fiber**: React wrapper for Three.js
- **Recharts**: Data visualization
- **Tailwind CSS v4**: Styling
- **Shadcn/ui**: Component library
- **Lucide React**: Icons

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

### Self-hosted
```bash
npm run build
npm start
```

## Troubleshooting

### 3D Background Not Rendering
- Check browser WebGL support
- Ensure Three.js and React Three Fiber are installed
- Check browser console for errors

### Charts Not Displaying
- Verify Recharts is properly installed
- Check data format matches expected structure
- Ensure colors are valid hex values

### API Errors
- Check endpoint URLs in component files
- Verify request/response formats
- Check browser Network tab for failed requests

## License

MIT License - feel free to use this project for commercial purposes.

## Support

For issues or questions, check:
1. Browser console for errors
2. Network tab for API failures
3. GitHub Issues (if applicable)
