import {
  ProjectCard,
  ProjectCardProps,
} from '@/components/molecules/ProjectCard'

export type ProjectsProps = {
  title: string
  projects: ProjectCardProps[]
}

export const Projects = ({ title, projects }: ProjectsProps) => {
  return (
    <section className="container flex flex-col gap-5 md:gap-15" id="projects">
      <div className="flex justify-between items-end">
        <h2
          className="title-font [&>span]:md:ml-16.5 [&>span]:ml-6 [&>span]:leading-6 [&>span]:md:leading-12 [&>span]:block [&>span]:text-transparent [&>span]:[-webkit-text-stroke:3px_var(--color-primary)]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="text-muted label-font-spaced"
          dangerouslySetInnerHTML={{ __html: `(${projects.length} projects)` }}
        />
      </div>
      <div className="flex flex-col pt-1 border-t border-muted/50">
        {projects.map((project) => (
          <ProjectCard key={project.index + project.title} {...project} />
        ))}
      </div>
    </section>
  )
}
