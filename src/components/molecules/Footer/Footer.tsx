export type FooterProps = {
  email: string
  name: {
    text: string
    link: string
  }
}

export const Footer = ({ email, name }: FooterProps) => {
  return (
    <footer className="border-t border-muted">
      <div className="max-w-480 px-4 gap-3 flex flex-col md:flex-row md:items-center justify-between pt-5 pb-10 md:pt-3 md:pb-5 mx-auto">
        <div>
          <p className="label-font-spaced md:mt-5">Direct email</p>
          <a
            className="tiles-title-font underline hover:text-primary ease-in-out duration-150 cursor-pointer"
            href={`mailto:${email}`}
            dangerouslySetInnerHTML={{ __html: email }}
          />
        </div>
        <a
          className="tiles-title-font hover:text-primary ease-in-out duration-150 cursor-pointer"
          href={name.link}
          target="_blank"
          dangerouslySetInnerHTML={{ __html: name.text }}
        />
      </div>
    </footer>
  )
}
