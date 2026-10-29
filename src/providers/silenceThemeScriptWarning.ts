'use client'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error

  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag')
    ) {
      return
    }
    originalError.apply(console, args)
  }
}

export const SilenceThemeScriptWarning = () => null
