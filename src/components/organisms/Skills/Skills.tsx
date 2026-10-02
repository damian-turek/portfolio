'use client'

import { Tag } from '@/components/atoms/Tag'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-tag]', {
        x: -1000,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 90%',
        },
      })
    },
    { scope: container }
  )

  return (
    <section className="container" id="skills" ref={container}>
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
