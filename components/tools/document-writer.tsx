'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Send, Copy, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DocumentWriter() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const [loading, setLoading] = useState(false)
  const [copying, setCopying] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim()) return

    const userMessage = prompt
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setPrompt('')
    setLoading(true)

    try {
      const response = await fetch('/api/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.result || data.error || 'No response' }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Failed to get response' }])
    } finally {
      setLoading(false)
    }
  }

  async function copyLastMessage() {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'assistant') {
      setCopying(true)
      await navigator.clipboard.writeText(lastMessage.content)
      setTimeout(() => setCopying(false), 2000)
    }
  }

  function downloadAsText() {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'assistant') {
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(lastMessage.content))
      element.setAttribute('download', 'documentation.txt')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  const hasResponse = messages.some(m => m.role === 'assistant')

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Chat Area */}
      <Card className="glass flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground py-8">
                <div className="text-center">
                  <p className="mb-2">Start writing documentation</p>
                  <p className="text-sm">Enter a prompt below to generate documentation</p>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex gap-3 rounded-lg p-4',
                    msg.role === 'user'
                      ? 'glass-dark ml-8 bg-primary/10'
                      : 'glass-dark mr-8 bg-accent/10'
                  )}
                >
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex gap-3 rounded-lg p-4 glass-dark mr-8 bg-muted/20">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Generating documentation...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        {hasResponse && (
          <div className="border-t border-white/10 p-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyLastMessage}
              className="gap-2 bg-transparent"
              disabled={copying}
            >
              <Copy className="h-4 w-4" />
              {copying ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAsText}
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        )}
      </Card>

      {/* Input Area */}
      <Card className="glass p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what documentation you need..."
            rows={2}
            className="resize-none"
          />
          <Button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="self-end gap-2"
          >
            <Send className="h-4 w-4" />
            Send
          </Button>
        </form>
      </Card>
    </div>
  )
}
