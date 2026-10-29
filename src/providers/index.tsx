import { SmoothScrollProvider } from '@/providers/smoothScroll'
import { SilenceThemeScriptWarning } from '@/providers/silenceThemeScriptWarning'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SilenceThemeScriptWarning />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </>
  )
}
