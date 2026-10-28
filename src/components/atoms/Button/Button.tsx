'use client'

import React, { useRef } from 'react'
import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

export const buttonStyles = cva(
  'relative inline-flex items-center justify-center gap-2.5 focus:outline-none cursor-pointer disabled:cursor-not-allowed py-2.5 px-6 button-font select-none overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'bg-foreground text-background border border-foreground hover:bg-muted',
        secondary:
          'bg-transparent border border-muted/40 text-muted hover:border-primary hover:text-primary',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
      iconOnly: {
        true: 'p-2.5 md:p-3! h-fit w-fit aspect-square',
        false: '',
      },
      isRounded: {
        true: 'rounded-full!',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      fullWidth: false,
      iconOnly: false,
    },
  }
)

export interface ButtonProps {
  label?: string
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  isRounded?: boolean
  iconOnly?: boolean
  disabled?: boolean
  onClick?: () => void
  link?: string
  className?: string
  icon?: LucideIcon
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  label,
  variant,
  fullWidth,
  iconOnly,
  isRounded,
  disabled,
  onClick,
  className,
  link,
  type = 'button',
  icon: Icon,
}: ButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLElement | null>(null)
  const iconRef = useRef<SVGSVGElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const { contextSafe } = useGSAP({ scope: containerRef })

  const handleMouseEnter = contextSafe(() => {
    if (disabled || !buttonRef.current) return

    gsap.to(buttonRef.current, {
      scale: 1.03,
      y: -2,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        y: -1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: 3,
        y: -1,
        scale: 1.1,
        duration: 0.35,
        ease: 'back.out(2)',
        overwrite: 'auto',
      })
    }
  })

  const handleMouseLeave = contextSafe(() => {
    if (disabled || !buttonRef.current) return

    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  })

  const styles = buttonStyles({
    variant,
    fullWidth,
    iconOnly,
    isRounded,
  })

  const content = (
    <>
      {!iconOnly && label && (
        <span
          ref={labelRef}
          className="inline-block transition-colors duration-200"
        >
          {label}
        </span>
      )}
      {Icon && (
        <Icon
          ref={iconRef}
          className="size-4 shrink-0 transition-colors duration-200"
        />
      )}
    </>
  )

  return (
    <div ref={containerRef} className="inline-block">
      {link ? (
        <Link
          ref={(el) => {
            buttonRef.current = el
          }}
          href={link}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(styles, className)}
        >
          {content}
        </Link>
      ) : (
        <button
          ref={(el) => {
            buttonRef.current = el
          }}
          type={type}
          disabled={disabled}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(styles, className)}
        >
          {content}
        </button>
      )}
    </div>
  )
}
