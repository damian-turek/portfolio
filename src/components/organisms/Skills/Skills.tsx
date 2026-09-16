import { Tag } from '@/components/atoms/Tag'

export type SkillsProps = {
  title: string
  mainTechnologies: string[]
  technologies: string[]
}

export const Skills = ({
  title,
  mainTechnologies,
  technologies,
}: SkillsProps) => {
  return (
    <section className="container" id="skills">
      <h2
        className="title-font [&>span]:leading-14 [&>span]:md:leading-25 [&>span]:block [&>span]:text-transparent  [&>span]:md:[-webkit-text-stroke:3px_var(--color-muted)] [&>span]:[-webkit-text-stroke:1px_var(--color-muted)] mb-3 md:mb-5"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="flex flex-wrap gap-2 mb-2 max-w-205">
        {mainTechnologies?.map((tech) => (
          <Tag variant="large" key={tech} text={tech} />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 max-w-230">
        {technologies?.map((tech) => (
          <Tag variant="medium" key={tech} text={tech} />
        ))}
      </div>
    </section>
  )
}
