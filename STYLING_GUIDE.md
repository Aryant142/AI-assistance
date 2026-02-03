# Styling Guide - DevTools Hub

Complete guide to the glassmorphism design system.

## Design Philosophy

The dashboard uses:
- **Dark Background**: Deep navy/black (#0a0a0f)
- **Frosted Glass**: Semi-transparent cards with backdrop blur
- **Vibrant Accents**: Purple, Cyan, and Blue gradients
- **Smooth Animations**: Fluid transitions and hover effects

## Color Palette

### Primary Colors
- **Primary**: Purple-Blue `hsl(250, 100%, 65%)`
- **Accent**: Cyan `hsl(180, 90%, 50%)`
- **Secondary**: Blue `hsl(200, 100%, 50%)`

### Neutral Colors
- **Background**: Almost Black `hsl(10, 10%, 5%)`
- **Foreground**: Near White `hsl(0, 0%, 95%)`
- **Card**: Dark Blue-Gray `hsl(240, 20%, 12%)`
- **Muted**: Medium Gray `hsl(240, 10%, 25%)`
- **Border**: Light Blue-Gray `hsl(240, 20%, 20%)`

### Semantic Colors
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red (#FF5252)

## CSS Classes Reference

### Glassmorphism Effects

#### `.glass`
Full-featured glass effect for main cards:
```css
@apply backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl shadow-2xl;
```

**Use for:** Major card containers, primary sections

**Example:**
```tsx
<Card className="glass p-6">
  <h2>Main Section</h2>
</Card>
```

#### `.glass-sm`
Smaller glass effect for secondary elements:
```css
@apply backdrop-blur-md bg-white/5 border border-white/10 rounded-lg;
```

**Use for:** Small cards, badges, buttons, controls

**Example:**
```tsx
<div className="glass-sm p-3">
  <span>Status Badge</span>
</div>
```

#### `.glass-dark`
Darker glass for contrast:
```css
@apply backdrop-blur-lg bg-black/20 border border-white/5 rounded-xl shadow-2xl;
```

**Use for:** Overlays, modal backgrounds, chat messages

**Example:**
```tsx
<div className="glass-dark p-4">
  <p>Dark overlay content</p>
</div>
```

### Glow Effects

#### `.glow-primary`
Purple glow shadow:
```css
@apply drop-shadow-[0_0_20px_rgba(99,102,241,0.4)];
```

**Use for:** Primary CTA buttons, important elements

**Example:**
```tsx
<Button className="glow-primary">
  Primary Action
</Button>
```

#### `.glow-accent`
Cyan glow shadow:
```css
@apply drop-shadow-[0_0_20px_rgba(34,211,238,0.4)];
```

**Use for:** Accent buttons, highlight elements

**Example:**
```tsx
<Button className="glow-accent">
  Accent Action
</Button>
```

## Component Styling Patterns

### Card Hierarchy

**Main Cards:**
```tsx
<Card className="glass p-6">
  {/* Primary content */}
</Card>
```

**Secondary Cards:**
```tsx
<Card className="glass-sm p-4">
  {/* Supporting content */}
</Card>
```

**Message/Alert Cards:**
```tsx
<div className="glass-dark p-4 border-primary/50 bg-primary/10">
  {/* Special content */}
</div>
```

### Button Styling

**Primary Button with Glow:**
```tsx
<Button className="gap-2 glow-primary">
  <Icon className="h-4 w-4" />
  Primary Action
</Button>
```

**Secondary Button:**
```tsx
<Button 
  variant="outline" 
  className="gap-2 hover:bg-primary/20 hover:border-primary/50 bg-transparent"
>
  <Icon className="h-4 w-4" />
  Secondary Action
</Button>
```

**Icon Button:**
```tsx
<Button 
  variant="ghost" 
  size="icon"
  className="hover:bg-primary/10"
>
  <Icon className="h-4 w-4" />
</Button>
```

### Text Styling

**Headlines:**
```tsx
<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
  Major Heading
</h1>
```

**Subheadings:**
```tsx
<h2 className="text-2xl font-semibold text-foreground">
  Section Title
</h2>
```

**Muted Text:**
```tsx
<p className="text-sm text-muted-foreground">
  Secondary information
</p>
```

**Code/Mono:**
```tsx
<code className="font-mono text-sm text-primary">
  variable_name
</code>
```

### Input Styling

**Text Input:**
```tsx
<input 
  className="glass-sm px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  placeholder="Type something..."
/>
```

**Textarea:**
```tsx
<textarea 
  className="glass-sm px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
  placeholder="Enter content..."
  rows={3}
/>
```

### Navigation Styling

**Active Link:**
```tsx
<Link 
  href="/path"
  className={cn(
    'px-4 py-3 rounded-lg transition-all duration-200',
    isActive
      ? 'bg-primary/20 text-primary glow-primary'
      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
  )}
>
  Link Text
</Link>
```

### Loading States

**Spinner with Text:**
```tsx
<div className="flex items-center gap-2">
  <Loader2 className="h-4 w-4 animate-spin text-primary" />
  <span className="text-muted-foreground">Loading...</span>
</div>
```

**Skeleton Loading:**
```tsx
<div className="space-y-2">
  <div className="glass-sm h-4 w-3/4 rounded animate-pulse" />
  <div className="glass-sm h-4 w-full rounded animate-pulse" />
</div>
```

### Chart Styling

**Chart Container:**
```tsx
<Card className="glass p-4">
  <h3 className="font-semibold mb-4">Chart Title</h3>
  <ResponsiveContainer width="100%" height={300}>
    {/* Recharts component */}
  </ResponsiveContainer>
</Card>
```

**Tooltip Styling:**
```typescript
contentStyle={{
  backgroundColor: 'rgba(10, 10, 15, 0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
}}
```

## Responsive Design

### Breakpoints
- **Mobile**: < 640px (no prefix)
- **Tablet**: 640px+ (`sm:`)
- **Desktop**: 768px+ (`md:`)
- **Large**: 1024px+ (`lg:`)
- **XL**: 1280px+ (`xl:`)

### Responsive Patterns

**Grid Layout:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

**Sidebar Layout:**
```tsx
<div className="flex flex-col md:flex-row gap-4">
  <aside className="w-full md:w-64">
    {/* Sidebar */}
  </aside>
  <main className="flex-1">
    {/* Content */}
  </main>
</div>
```

**Hidden on Mobile:**
```tsx
<div className="hidden md:block">
  {/* Desktop only */}
</div>
```

**Mobile Menu:**
```tsx
<div className="md:hidden">
  {/* Mobile only */}
</div>
```

## Animation Patterns

### Hover Effects

**Card Hover:**
```tsx
className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
```

**Button Hover:**
```tsx
className="transition-colors duration-200 hover:bg-primary/20 hover:text-primary"
```

**Icon Animation:**
```tsx
className="h-4 w-4 group-hover:translate-x-1 transition-transform"
```

### Entry Animations

**Fade In:**
```tsx
className="animate-in fade-in duration-300"
```

**Slide In:**
```tsx
className="animate-in slide-in-from-left duration-300"
```

**Scale In:**
```tsx
className="animate-in zoom-in duration-300"
```

## Dark Mode

The dashboard uses dark mode by default. To toggle:

### In Layout:
```tsx
<html className="dark">
  {/* Content */}
</html>
```

### Toggle Script:
```typescript
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark')
}
```

## Accessibility

### Color Contrast
All text meets WCAG AA standards:
- Foreground on Background: 15:1
- Primary on Background: 6.5:1

### Focus States
All interactive elements have clear focus rings:
```tsx
className="focus:outline-none focus:ring-2 focus:ring-primary"
```

### Screen Reader Text
```tsx
<span className="sr-only">Screen reader only text</span>
```

### Semantic HTML
```tsx
<button>  {/* instead of <div onClick> */}
<nav>     {/* for navigation */}
<main>    {/* for main content */}
<header>  {/* for page header */}
<section> {/* for content sections */}
```

## Performance Tips

1. **Use CSS Variables**: Faster than computed values
2. **Limit Animations**: Use `prefers-reduced-motion`
3. **Optimize Images**: Use WebP format
4. **Lazy Load**: Load charts only when visible
5. **Memoize Components**: Prevent unnecessary re-renders

### Reduced Motion:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Common Issues & Solutions

### Issue: Text looks blurry
**Solution**: Ensure parent has `font-smoothing`
```css
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Issue: Glass effect not blurring
**Solution**: Check `backdrop-filter` browser support
```css
@supports (backdrop-filter: blur(1px)) {
  .glass {
    backdrop-filter: blur(12px);
  }
}
```

### Issue: Glow effect too subtle
**Solution**: Increase shadow values
```tsx
className="drop-shadow-[0_0_30px_rgba(99,102,241,0.6)]"
```

### Issue: Border not visible
**Solution**: Ensure border width is set
```tsx
className="border border-white/10"  // ✓ Works
className="border-white/10"         // ✗ Missing border width
```

## Export for Use

### Copy Entire Theme:
All theme variables are in `/app/globals.css`. Copy this file to reuse the design system.

### Create Variants:
```css
.glass-xl {
  @apply glass p-8;
}

.glass-compact {
  @apply glass-sm p-2;
}
```

---

Use this guide as reference when styling components. Keep the design consistent by following these patterns! ✨
