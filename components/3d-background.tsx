'use client'

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.3 }} />
            </linearGradient>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            </filter>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#grad1)" filter="url(#blur)" />
          <circle cx="900" cy="400" r="180" fill="url(#grad1)" filter="url(#blur)" />
          <circle cx="600" cy="100" r="120" fill="url(#grad1)" filter="url(#blur)" />
          <circle cx="100" cy="500" r="100" fill="url(#grad1)" filter="url(#blur)" />
          <circle cx="1100" cy="150" r="140" fill="url(#grad1)" filter="url(#blur)" />
        </svg>
      </div>
    </div>
  )
}
