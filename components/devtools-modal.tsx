'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Settings, X, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DevToolsModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('info')

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const systemInfo = {
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A',
    timestamp: new Date().toISOString(),
  }

  return (
    <>
      {/* DevTools Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-40 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
        onClick={() => setIsOpen(true)}
        title="Open DevTools"
      >
        <Settings className="h-5 w-5 text-primary" />
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Card className="glass w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                DevTools
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/10 px-6 pt-4">
              {[
                { id: 'info', label: 'System Info' },
                { id: 'console', label: 'Console' },
                { id: 'settings', label: 'Settings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-all border-b-2',
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-4 font-mono text-sm">
                      <div className="mb-2 text-muted-foreground">User Agent:</div>
                      <div className="text-foreground break-all">{systemInfo.userAgent}</div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 gap-2"
                        onClick={() => copyToClipboard(systemInfo.userAgent)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        {copied ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 font-mono text-sm">
                      <div className="mb-2 text-muted-foreground">Viewport:</div>
                      <div className="text-foreground">{systemInfo.viewport}</div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 font-mono text-sm">
                      <div className="mb-2 text-muted-foreground">Timestamp:</div>
                      <div className="text-foreground">{systemInfo.timestamp}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'console' && (
                <div className="space-y-4">
                  <div className="bg-black/20 rounded-lg p-4 font-mono text-xs h-64 overflow-y-auto">
                    <div className="text-cyan-400">&gt; DevTools Console</div>
                    <div className="text-green-400 mt-2">✓ Dashboard loaded successfully</div>
                    <div className="text-green-400">✓ All API endpoints configured</div>
                    <div className="text-yellow-400">⚠ Connect API endpoints for live data</div>
                    <div className="text-gray-400 mt-4 text-xs">View browser console for detailed logs</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Open your browser's developer console (F12) for detailed debugging information.
                  </p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm font-medium">Debug Mode</span>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm font-medium">Show Performance Metrics</span>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm font-medium">Network Logs</span>
                      <input type="checkbox" className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-muted-foreground mb-4">
                      For full debugging capabilities, use your browser's Developer Tools (F12)
                    </p>
                    <Button
                      className="w-full gap-2"
                      onClick={() => console.log('Opening browser DevTools...')}
                    >
                      Open Browser DevTools (F12)
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
