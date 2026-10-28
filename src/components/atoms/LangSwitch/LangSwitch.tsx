'use client'

import { useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/navigation'

export const LangSwitch = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div
      role="group"
      className="flex items-center rounded-full border border-foreground/20 p-0.5 text-xs font-mono uppercase"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === locale}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`rounded-full px-2.5 py-1.5 transition-colors cursor-pointer uppercase ${
            l === locale
              ? 'bg-foreground text-background'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
