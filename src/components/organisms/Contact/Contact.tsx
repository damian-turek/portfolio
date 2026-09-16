import { Form } from '@/components/molecules/Form'

export type ContactProps = {
  title: string
}

export const Contact = ({ title }: ContactProps) => {
  return (
    <section
      className="flex flex-col lg:flex-row w-full lg:items-center justify-between gap-10 lg:gap-40 container"
      id="contact"
    >
      <div className="flex flex-col gap-3 lg:gap-5">
        <h2
          className="title-font xl:hero-text [&>span]:block [&>span]:text-muted"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <Form />
    </section>
  )
}
