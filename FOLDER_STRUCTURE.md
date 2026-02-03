# Project Folder Structure

Complete guide to the DevTools Hub file organization.

## Directory Tree

```
devtools-hub/
│
├── 📄 README.md                        ← START HERE (Main overview)
├── 📄 BUILD_SUMMARY.txt               ← What was built
├── 📄 QUICK_START.md                  ← 5-minute setup
├── 📄 DASHBOARD_README.md             ← Full documentation
├── 📄 INTEGRATION_EXAMPLES.md         ← Real API patterns
├── 📄 STYLING_GUIDE.md               ← Design system
├── 📄 COMPONENT_REFERENCE.md         ← Component API
├── 📄 PROJECT_SUMMARY.md             ← Architecture
├── 📄 FOLDER_STRUCTURE.md            ← This file
│
├── package.json                        ← Dependencies
├── tsconfig.json                       ← TypeScript config
├── next.config.mjs                     ← Next.js config
├── .env.local                          ← Environment variables
│
├── 📁 app/                            ← Next.js App Router
│   ├── 📁 api/                       ← API Routes
│   │   ├── document/
│   │   │   └── route.ts              ← POST /api/document
│   │   ├── github-analysis/
│   │   │   └── route.ts              ← POST /api/github-analysis
│   │   └── dsa/
│   │       └── route.ts              ← GET /api/dsa?topic={topic}
│   │
│   ├── 📁 tools/                     ← Tool Pages
│   │   ├── document-writer/
│   │   │   └── page.tsx              ← /tools/document-writer
│   │   ├── github-analyzer/
│   │   │   └── page.tsx              ← /tools/github-analyzer
│   │   └── dsa/
│   │       └── page.tsx              ← /tools/dsa
│   │
│   ├── layout.tsx                    ← Root layout (47 lines)
│   │                                    - Imports Sidebar
│   │                                    - Imports Background3D
│   │                                    - Sets up dark theme
│   │
│   ├── page.tsx                      ← Home page (103 lines)
│   │                                    - Dashboard overview
│   │                                    - Tool cards
│   │                                    - Feature highlights
│   │
│   └── globals.css                   ← Global styles (171 lines)
│                                        - Theme colors
│                                        - Glassmorphism effects
│                                        - Responsive utilities
│
├── 📁 components/                     ← React Components
│   │
│   ├── 3d-background.tsx             ← 3D Scene (87 lines)
│   │                                    - Three.js Canvas
│   │                                    - Animated shapes
│   │                                    - Floating spheres
│   │
│   ├── sidebar.tsx                   ← Navigation (98 lines)
│   │                                    - Mobile menu
│   │                                    - Navigation links
│   │                                    - Active state styling
│   │
│   └── 📁 tools/                     ← Tool Components
│       ├── document-writer.tsx       ← Chat interface (155 lines)
│       │                                - Message display
│       │                                - Input handling
│       │                                - Copy/Download
│       │
│       ├── github-analyzer.tsx       ← Chart UI (231 lines)
│       │                                - File upload
│       │                                - Bar chart
│       │                                - Line chart
│       │                                - Time filters
│       │
│       └── dsa-tool.tsx              ← Problem browser (249 lines)
│                                        - Topic selector
│                                        - Question table
│                                        - Difficulty colors
│                                        - CSV export
│
├── 📁 lib/                            ← Utilities
│   └── utils.ts                      ← Helper functions
│                                        - cn() for classnames
│                                        - Type definitions
│
└── 📁 public/                         ← Static assets
    ├── icon.svg
    ├── icon-light-32x32.png
    └── icon-dark-32x32.png
```

## File Organization

### 🎯 By Purpose

**Pages (What users see)**
```
app/page.tsx                          ← Dashboard home
app/tools/document-writer/page.tsx    ← Documentation tool
app/tools/github-analyzer/page.tsx    ← GitHub analyzer
app/tools/dsa/page.tsx               ← DSA questions
```

**Components (Reusable UI)**
```
components/3d-background.tsx          ← 3D scene
components/sidebar.tsx                ← Navigation
components/tools/document-writer.tsx  ← Writer component
components/tools/github-analyzer.tsx  ← Analyzer component
components/tools/dsa-tool.tsx        ← DSA component
```

**APIs (Backend)**
```
app/api/document/route.ts            ← Doc generation
app/api/github-analysis/route.ts     ← GitHub analysis
app/api/dsa/route.ts                 ← DSA database
```

**Styling & Config**
```
app/globals.css                       ← Global styles
tsconfig.json                         ← TypeScript
next.config.mjs                       ← Next.js
package.json                          ← Dependencies
```

**Documentation**
```
README.md                             ← Main overview
QUICK_START.md                        ← Quick guide
DASHBOARD_README.md                   ← Full docs
INTEGRATION_EXAMPLES.md              ← Real APIs
STYLING_GUIDE.md                     ← Design system
COMPONENT_REFERENCE.md               ← Component API
PROJECT_SUMMARY.md                   ← Architecture
```

### 📊 By Size

**Large Components (200+ lines)**
- `components/tools/dsa-tool.tsx` (249 lines)
- `components/tools/github-analyzer.tsx` (231 lines)

**Medium Components (100-200 lines)**
- `components/tools/document-writer.tsx` (155 lines)
- `components/sidebar.tsx` (98 lines)

**Small Components (<100 lines)**
- `components/3d-background.tsx` (87 lines)

**API Routes**
- `app/api/document/route.ts` (163 lines)
- `app/api/dsa/route.ts` (119 lines)
- `app/api/github-analysis/route.ts` (86 lines)

**Pages**
- `app/page.tsx` (103 lines)
- `app/tools/*/page.tsx` (21 lines each)

**Layout & Styles**
- `app/layout.tsx` (47 lines)
- `app/globals.css` (171 lines)

## Route Structure

### Pages
```
/                          ← Home dashboard
/tools/document-writer     ← Documentation writer
/tools/github-analyzer     ← GitHub analyzer
/tools/dsa                 ← DSA questions
```

### API Routes
```
POST /api/document              ← Generate documentation
POST /api/github-analysis       ← Analyze GitHub CSV
GET /api/dsa?topic={topic}     ← Get DSA questions
```

## Import Paths

### Components
```typescript
import { Sidebar } from '@/components/sidebar'
import { Background3D } from '@/components/3d-background'
import { DocumentWriter } from '@/components/tools/document-writer'
import { GitHubAnalyzer } from '@/components/tools/github-analyzer'
import { DSATool } from '@/components/tools/dsa-tool'
```

### UI Components (Shadcn)
```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
```

### Utilities
```typescript
import { cn } from '@/lib/utils'
```

### React & Next.js
```typescript
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
```

### Third-party
```typescript
import { Loader2, Send, Copy, Download } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, Sphere } from '@react-three/drei'
```

## File Naming Conventions

```
Pages (lowercase with hyphens)
  page.tsx                    ← Always named page.tsx

Components (PascalCase)
  3d-background.tsx          ← Special case for 3d
  sidebar.tsx
  DocumentWriter.tsx         ← Could be either style
  document-writer.tsx

API Routes (lowercase)
  route.ts                   ← Always named route.ts

Folders (lowercase)
  app/
  components/
  tools/
  ui/

Config Files
  tsconfig.json
  next.config.mjs
  package.json
```

## Dependency Tree

```
Root Layout
├── Background3D (3D scene)
│   ├── Three.js Canvas
│   ├── AnimatedSphere
│   └── FloatingShapes
│
└── Sidebar (Navigation)
    └── Links to Pages

Page Components
├── DocumentWriter
│   ├── Card
│   ├── Textarea
│   ├── Button
│   ├── ScrollArea
│   └── API calls
│
├── GitHubAnalyzer
│   ├── Card
│   ├── Select
│   ├── BarChart
│   ├── LineChart
│   └── API calls
│
└── DSATool
    ├── Card
    ├── Select
    ├── Table
    ├── Button
    └── API calls
```

## Data Flow

```
User Interaction
    ↓
Component State (useState)
    ↓
API Endpoint (fetch)
    ↓
Route Handler
    ↓
Mock Data / Real API
    ↓
Response
    ↓
Update UI
```

## Hot Module Replacement (HMR)

When you edit files, Next.js will hot-reload:

```
Edit: app/page.tsx
→ Page refreshes immediately

Edit: components/sidebar.tsx
→ Sidebar updates in place

Edit: app/globals.css
→ Styles apply without reload

Edit: app/api/dsa/route.ts
→ Endpoint updates without page reload
```

## Build Output

```bash
npm run build
```

Generates:
```
.next/
├── static/
│   ├── chunks/       ← Code bundles
│   └── css/          ← Compiled styles
├── server/           ← Server functions
└── public/           ← Static files
```

## Environment Files

```
.env.local            ← Local development (not in git)
.env.example          ← Template (in git)
.env.production       ← Production (if needed)
```

## Key Files to Know

### Must Edit
- `app/globals.css` - Change colors
- `components/3d-background.tsx` - Change 3D
- `app/api/document/route.ts` - Real documentation API
- `app/api/github-analysis/route.ts` - Real GitHub API
- `app/api/dsa/route.ts` - Real DSA database

### Reference Only
- `app/layout.tsx` - Root structure
- `components/sidebar.tsx` - Navigation logic
- `components/tools/*.tsx` - UI components
- `app/page.tsx` - Home page structure

### Don't Edit
- `tsconfig.json` - TypeScript config
- `next.config.mjs` - Next.js config
- `package.json` - Dependencies (unless adding new)

## Size Breakdown

```
Components:          ~900 lines
API Routes:          ~370 lines
Pages:               ~145 lines
Styles:              ~171 lines
Utils & Config:      ~100 lines
─────────────────────────────
TOTAL CODE:        ~1,686 lines

Documentation:     ~3,500 lines
─────────────────────────────
EVERYTHING:        ~5,200 lines
```

## Quick Navigation

### To Add a Feature
1. Create component in `components/`
2. Create page in `app/tools/`
3. Create API in `app/api/`
4. Add to sidebar navigation
5. Update globals.css if needed

### To Style Something
Edit: `app/globals.css`
Add classes: `.new-class { @apply ... }`

### To Change Colors
Edit: `/app/globals.css`
Change: `--primary: 250 100% 65%;`

### To Modify 3D
Edit: `/components/3d-background.tsx`
Change: Colors, speeds, positions, shapes

### To Connect Real APIs
Edit: `/app/api/*/route.ts`
Replace: Mock functions with real API calls
See: `INTEGRATION_EXAMPLES.md`

## Troubleshooting Files

**Page not loading?**
→ Check: `app/page.tsx` or specific page

**Component not rendering?**
→ Check: `components/` folder
→ Verify: Import statement
→ Check: Props being passed

**Styling broken?**
→ Check: `app/globals.css`
→ Verify: Tailwind classes used
→ Reset: Browser cache

**3D not showing?**
→ Check: `components/3d-background.tsx`
→ Verify: Three.js is installed
→ Check: Browser WebGL support

**API not working?**
→ Check: `app/api/*/route.ts`
→ Verify: Endpoint URL matches
→ Check: Request/response format
→ Use: Network tab in DevTools

---

**Navigation Guide Complete!** 📁

Use this folder structure as your reference when exploring and modifying the codebase.
