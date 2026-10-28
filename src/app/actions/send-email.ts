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

export async function sendEmail(formData: FormData) {
  const t = await getTranslations('Homepage.form')

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const budget = formData.get('budget') as string
  const message = formData.get('message') as string

  if (!email || !subject || !message) {
    throw new Error(t('errorMissingFields'))
  }

  try {
    await transporter.sendMail({
      from: `"${name || 'Form'}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subject} from ${name || email}`,
      text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\nMessage:\n${message}`,
      html: `
        <h3>New message from the form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    await transporter.sendMail({
      from: `"Damian Turek" <${process.env.SMTP_USER}>`,
      to: email,
      subject: t('thankYouTitle'),
      text: t('thankYouMessage', { name: name || email }),
    })

    return { success: true }
  } catch (e) {
    console.error('SMTP Error:', e)
    throw new Error(t('errorSendingEmail'))
  }
}
