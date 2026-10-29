'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LangSwitch } from '@/components/atoms/LangSwitch/LangSwitch'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'

export type NavItem = {
  label: string
  href: string
}

export type HeaderProps = {
  logo?: string
  nav?: NavItem[]
}

export const Header = ({ logo = 'DT', nav = [] }: HeaderProps) => {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-muted/30 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container py-0 flex items-center justify-between h-14 gap-6">
        <Link
          href="https://github.com/damian-turek"
          target="_blank"
          rel="noopener noreferrer"
          className="font-anton hover:text-primary transition-colors"
        >
          {logo}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label-font-spaced text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <LangSwitch />
          <ThemeToggle />
        </nav>

        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
        >
          {open ? (
            <X size={20} strokeWidth={1.5} />
          ) : (
            <Menu size={20} strokeWidth={1.5} />
          )}
        </button>
      </div>

      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          open ? 'max-h-96 border-t border-muted/30' : 'max-h-0'
        )}
      >
        <nav className="container flex flex-col py-4 gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="label-font-spaced text-muted hover:text-foreground
                         transition-colors py-3 border-b border-muted/20 last:border-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-center gap-4 pb-4">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
