import React from 'react'
import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export const buttonStyles = cva(
  'inline-flex items-center justify-center gap-3 transition-all duration-100 focus:outline-none cursor-pointer disabled:cursor-not-allowed py-2.5 px-6 button-font',
  {
    variants: {
      variant: {
        primary:
          'bg-black text-white border border-black hover:bg-muted hover:-translate-y-0.25',
        secondary:
          'bg-transparent border border-muted box-border text-muted hover:border-black hover:text-black',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
      iconOnly: {
        true: 'p-1.5 md:p-3! h-fit w-fit aspect-square',
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
  const styles = buttonStyles({
    variant,
    fullWidth,
    iconOnly,
    isRounded,
  })

  const content = (
    <>
      {!iconOnly && label && <span>{label}</span>}
      {Icon && <Icon className="size-4" />}
    </>
  )

  return link ? (
    <Link href={link} onClick={onClick} className={cn(styles, className)}>
      {content}
    </Link>
  ) : (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(styles, className)}
    >
      {content}
    </button>
  )
}
