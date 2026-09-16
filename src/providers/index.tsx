import { SmoothScrollProvider } from '@/providers/smoothScroll'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>
}
