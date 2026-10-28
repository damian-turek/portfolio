'use client'

import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { ArrowUpRight } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useTranslations } from 'next-intl'
import { sendEmail } from '@/app/actions/send-email'

export const Form = () => {
  const t = useTranslations('Homepage.form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const result = await sendEmail(formData)
      if (result?.success) {
        setStatus({ success: true, message: 'Wiadomość została wysłana!' })
        form.reset()
      }
    } catch (error) {
      setStatus({
        success: false,
        message:
          error instanceof Error ? error.message : t('errorSendingEmail'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full"
    >
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

      {status && (
        <div
          className={`col-span-1 md:col-span-2 text-sm font-medium ${
            status.success ? 'text-green-500' : 'text-alert'
          }`}
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
