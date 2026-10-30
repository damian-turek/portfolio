'use client'

import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { ArrowUpRight } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { sendEmail } from '@/app/actions/send-email'

const FORM_STYLES = `
@keyframes form-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes form-pop {
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes form-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes form-ring {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.8); opacity: 0; }
}
.form-success-panel { animation: form-fade-up 0.5s ease-out both; }
.form-success-icon { animation: form-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.form-success-ring { animation: form-ring 1.4s ease-out 0.5s both; }
.form-success-circle {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: form-draw 0.6s ease-out 0.15s forwards;
}
.form-success-check {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: form-draw 0.4s ease-out 0.65s forwards;
}
.form-success-title { animation: form-fade-up 0.5s ease-out 0.5s both; }
.form-success-text { animation: form-fade-up 0.5s ease-out 0.65s both; }
.form-success-action { animation: form-fade-up 0.5s ease-out 0.8s both; }
.form-status-enter { animation: form-fade-up 0.3s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .form-success-panel,
  .form-success-icon,
  .form-success-ring,
  .form-success-title,
  .form-success-text,
  .form-success-action,
  .form-status-enter { animation: none; opacity: 1; transform: none; }
  .form-success-ring { display: none; }
  .form-success-circle,
  .form-success-check { animation: none; stroke-dashoffset: 0; }
}
`

export const Form = () => {
  const t = useTranslations('Homepage.form')
  const locale = useLocale()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await sendEmail(formData, locale)
      setStatus({ success: result.success, message: result.message })
    } catch {
      setStatus({ success: false, message: t('errorSendingEmail') })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status?.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="form-success-panel flex flex-col items-center justify-center text-center gap-4 w-full py-12"
      >
        <style>{FORM_STYLES}</style>

        <div className="relative flex items-center justify-center">
          <span className="form-success-ring absolute h-24 w-24 rounded-full border-2 border-green-500" />
          <svg
            className="form-success-icon relative text-green-500"
            width="96"
            height="96"
            viewBox="0 0 52 52"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle
              className="form-success-circle"
              cx="26"
              cy="26"
              r="24"
              pathLength={1}
            />
            <path
              className="form-success-check"
              d="M15 27l7 7 15-16"
              pathLength={1}
            />
          </svg>
        </div>

        <h3 className="form-success-title title-font">{t('thankYouTitle')}</h3>
        <p className="form-success-text text-muted max-w-md">
          {status.message}
        </p>
        <button
          type="button"
          onClick={() => setStatus(null)}
          className="form-success-action mt-2 text-sm underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {t('sendAnother')}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full"
    >
      <style>{FORM_STYLES}</style>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Input
        className="w-full md:col-span-1"
        label={t('name')}
        input={{ name: 'name', type: 'text', required: true }}
      />
      <Input
        className="w-full md:col-span-1"
        label={t('email')}
        input={{ name: 'email', type: 'email', required: true }}
      />

      <Input
        className="w-full col-span-1 md:col-span-2"
        label={t('subject')}
        input={{ name: 'subject', type: 'text', required: true }}
      />
      <Input
        className="w-full col-span-1 md:col-span-2"
        label={t('budget')}
        input={{ name: 'budget', type: 'text' }}
      />
      <Input
        className="w-full col-span-1 md:col-span-2"
        label={t('message')}
        input={{ name: 'message', type: 'textarea', required: true }}
      />

      {status && !status.success && (
        <div
          role="alert"
          className="form-status-enter col-span-1 md:col-span-2 text-sm font-medium text-alert"
        >
          {status.message}
        </div>
      )}

      <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
        <Button
          label={isSubmitting ? '...' : t('submit')}
          type="submit"
          disabled={isSubmitting}
          icon={ArrowUpRight}
        />
      </div>
    </form>
  )
}
