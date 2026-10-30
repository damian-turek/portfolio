'use server'

import nodemailer from 'nodemailer'
import { getTranslations } from 'next-intl/server'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const cleanHeader = (value: string) =>
  value
    .replace(/[\r\n]+/g, ' ')
    .replace(/[<>"]/g, '')
    .trim()

const getField = (formData: FormData, key: string) =>
  ((formData.get(key) as string) ?? '').trim()

export type SendEmailResult = {
  success: boolean
  message?: string
}

export async function sendEmail(
  formData: FormData,
  locale: string
): Promise<SendEmailResult> {
  const t = await getTranslations({ locale, namespace: 'Homepage.form' })

  if (getField(formData, 'website')) {
    return { success: true, message: t('successMessage') }
  }

  const name = cleanHeader(getField(formData, 'name'))
  const email = cleanHeader(getField(formData, 'email'))
  const subject = cleanHeader(getField(formData, 'subject'))
  const budget = getField(formData, 'budget')
  const message = getField(formData, 'message')

  if (!email || !subject || !message) {
    return { success: false, message: t('errorMissingFields') }
  }

  const sender = process.env.SMTP_USER

  try {
    await transporter.sendMail({
      from: `"Contact form" <${sender}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: name ? `"${name}" <${email}>` : email,
      subject: `[Contact] ${subject} from ${name || email}`,
      text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <h3>New message from the form</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        </div>
      `,
    })
  } catch (e) {
    console.error('SMTP Error:', e)
    return { success: false, message: t('errorSendingEmail') }
  }

  try {
    const reply = t('thankYouMessage', { name: name || email })

    await transporter.sendMail({
      from: `"Damian Turek" <${sender}>`,
      to: email,
      subject: t('thankYouTitle'),
      text: `${reply}\n\n— Damian Turek`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <p>${escapeHtml(reply)}</p>
          <p>— Damian Turek</p>
        </div>
      `,
      headers: {
        'Auto-Submitted': 'auto-replied',
        'X-Auto-Response-Suppress': 'All',
      },
    })
  } catch (e) {
    console.error('SMTP auto-reply error:', e)
  }

  return { success: true, message: t('successMessage') }
}
