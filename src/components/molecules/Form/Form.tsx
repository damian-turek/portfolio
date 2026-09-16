'use client'

import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { ArrowUpRight } from 'lucide-react'
import { FormEvent } from 'react'

export const Form = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full"
    >
      <Input
        className="w-full md:col-span-1"
        label="Name"
        input={{ type: 'text', required: true }}
      />
      <Input
        className="w-full md:col-span-1"
        label="E-mail"
        input={{ type: 'email', required: true }}
      />

      <Input
        className="w-full col-span-1 md:col-span-2"
        label="Subject"
        input={{ type: 'text' }}
      />
      <Input
        className="w-full col-span-1 md:col-span-2"
        label="Budget Range"
        input={{ type: 'text' }}
      />
      <Input
        className="w-full col-span-1 md:col-span-2"
        label="Message"
        input={{ type: 'textarea' }}
      />

      <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
        <Button label="Send Message" type="submit" icon={ArrowUpRight} />
      </div>
    </form>
  )
}
