'use client'

import {
  FocusEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

type InputProps = {
  label: string
  input: (InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>) & {
    type?: string
  }
  error?: string
  className?: string
}

export const Input = ({ label, input, error, className }: InputProps) => {
  const labelRef = useRef<HTMLLabelElement | null>(null)
  const isTextarea = input.type === 'textarea'
  const hasInitialValue = Boolean(input.value ?? input.defaultValue)

  useEffect(() => {
    if (!labelRef.current) return

    gsap.set(labelRef.current, {
      y: hasInitialValue ? -28 : 0,
      scale: hasInitialValue ? 0.8 : 1,
      opacity: 1,
    })
  }, [hasInitialValue])

  const handleFocus = (
    e: FocusEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        y: -12,
        scale: 0.8,
        color: 'var(--color-accent, #000)',
        duration: 0.25,
        ease: 'power2.out',
      })
    }
    input.onFocus?.(e)
  }

  const handleBlur = (
    e: FocusEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const hasValue = Boolean(e.currentTarget.value)

    if (labelRef.current) {
      gsap.to(labelRef.current, {
        y: hasValue ? -12 : 0,
        scale: hasValue ? 0.8 : 1,
        color: 'var(--color-muted, #888)',
        duration: 0.25,
        ease: 'power2.out',
      })
    }
    input.onBlur?.(e)
  }

  const inputStyles = cn(
    'w-full border-b border-muted/40 focus:border-accent bg-transparent py-2.5 px-0 text-foreground text-sm outline-none transition-colors duration-300',
    isTextarea && 'min-h-28 resize-y',
    error && 'border-red-500 focus:border-red-500'
  )

  return (
    <div className={cn('flex flex-col relative pt-5', className)}>
      {label && (
        <label
          ref={labelRef}
          className={cn(
            'absolute left-0 top-6 label-font text-[12px]! text-muted pointer-events-none origin-left uppercase tracking-wider',
            error && 'text-red-500'
          )}
        >
          {label}
        </label>
      )}

      {isTextarea ? (
        <textarea
          className={inputStyles}
          {...(input as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          className={inputStyles}
          {...(input as InputHTMLAttributes<HTMLInputElement>)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
