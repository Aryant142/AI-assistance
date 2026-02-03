'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  FileText,
  BarChart3,
  Code2,
  Home,
  Menu,
  X,
  Wrench,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/tools/document-writer', label: 'Documentation Writer', icon: FileText },
  { href: '/tools/github-analyzer', label: 'GitHub Analyzer', icon: BarChart3 },
  { href: '/tools/dsa', label: 'DSA Tool', icon: Code2 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [devtoolsOpen, setDevtoolsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'glass fixed left-0 top-0 h-screen border-r border-white/10 p-6 transition-all duration-300 z-40 md:relative md:left-0 md:top-0 md:z-0 md:translate-x-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          isCollapsed ? 'md:w-20' : 'md:w-64 w-64'
        )}
      >
        {/* Logo and Close Button */}
        <div className="mb-8 flex items-center justify-between gap-2">
          {!isCollapsed && (
            <>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
                <span className="font-bold text-xl text-foreground">DevTools</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex -mr-2"
                onClick={() => setIsCollapsed(true)}
                title="Collapse sidebar"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex w-full"
              onClick={() => setIsCollapsed(false)}
              title="Expand sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                  isCollapsed ? 'px-2 justify-center' : '',
                  isActive
                    ? 'bg-primary/20 text-primary glow-primary'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className={cn(
          'space-y-4 border-t border-white/10 pt-4',
          isCollapsed ? 'space-y-2' : ''
        )}>
          <Button
            variant="outline"
            size={isCollapsed ? 'icon' : 'sm'}
            className={cn(
              'flex items-center gap-2 bg-transparent',
              isCollapsed ? 'w-full justify-center' : 'w-full'
            )}
            onClick={() => setDevtoolsOpen(!devtoolsOpen)}
            title={isCollapsed ? 'Open DevTools' : undefined}
          >
            <Wrench className="h-4 w-4" />
            {!isCollapsed && (devtoolsOpen ? 'Close DevTools' : 'Open DevTools')}
          </Button>
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground">
              Built with React & Three.js
            </p>
          )}
        </div>
        
        {/* DevTools Panel */}
        {devtoolsOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="glass w-full max-w-2xl rounded-t-2xl border-x border-t border-white/10 p-6 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Developer Tools</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDevtoolsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Environment</p>
                  <code className="block text-xs bg-white/10 p-3 rounded-lg text-muted-foreground">
                    NODE_ENV: {process.env.NODE_ENV}
                  </code>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Current Route</p>
                  <code className="block text-xs bg-white/10 p-3 rounded-lg text-muted-foreground">
                    {pathname}
                  </code>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Version Info</p>
                  <code className="block text-xs bg-white/10 p-3 rounded-lg text-muted-foreground">
                    React 19 • Next.js 16 • TypeScript
                  </code>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">API Endpoints</p>
                  <div className="text-xs bg-white/10 p-3 rounded-lg text-muted-foreground space-y-1">
                    <p>/api/document - Documentation Writer</p>
                    <p>/api/github-analysis - GitHub Analyzer</p>
                    <p>/api/dsa - DSA Questions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

    </>
  )
}
