import { Button } from '@/components/atoms/Button'
import { MoveUpRight } from 'lucide-react'
import { Tag } from '@/components/atoms/Tag'
import Link from 'next/link'

export type ProjectCardProps = {
  title: string
  technologies: string[]
  description: string
  projectUrl: string
  index: string
}

export const ProjectCard = ({
  title,
  technologies,
  description,
  projectUrl,
  index,
}: ProjectCardProps) => {
  return (
    <Link
      href={projectUrl}
      className="flex gap-10 justify-between border-b border-muted/50 py-3 md:py-8"
    >
      <p
        className="label-font-spaced text-muted md:mt-3"
        dangerouslySetInnerHTML={{ __html: index }}
      />
      <div className="flex flex-col w-full">
        <p
          className="section-header-font"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="body-small italic text-muted"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <Button className="md:mt-3" iconOnly icon={MoveUpRight} />
      <div className="hidden lg:flex md:mt-3 max-w-70 w-full flex-wrap justify-end gap-y-0 gap-x-1">
        {technologies.map((tech) => (
          <Tag key={tech} text={tech} />
        ))}
      </div>
    </Link>
  )
}
