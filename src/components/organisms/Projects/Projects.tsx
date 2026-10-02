'use client'

import {
  ProjectCard,
  ProjectCardProps,
} from '@/components/molecules/ProjectCard'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export type ProjectsProps = {
  title: string
  projects: ProjectCardProps[]
}

export const Projects = ({ title, projects }: ProjectsProps) => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]')

        gsap.set(cards, { x: -200, autoAlpha: 0 })

        ScrollTrigger.batch(cards, {
          start: 'top 85%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              x: 0,
              autoAlpha: 1,
              duration: 1.6,
              ease: 'power3.out',
              stagger: 0.2,
              overwrite: true,
            }),
        })
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="container flex flex-col gap-5 md:gap-15"
      id="projects"
    >
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
