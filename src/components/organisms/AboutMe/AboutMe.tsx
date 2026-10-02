'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { PositionCard } from '@/components/molecules/PositionCard'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export type AboutMeProps = {
  title: string
  description: string[]
  positions: {
    startDate: string
    endDate: string
    title: string
    company: string
    description: string
  }[]
}

const ROWS = 3

export const AboutMe = ({ title, description, positions }: AboutMeProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const wrapper = wrapperRef.current
      const track = trackRef.current
      const mobile = mobileRef.current
      if (!section || !wrapper || !track || !mobile) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(section.querySelectorAll('[data-animate]'), {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        })
      })

      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          wrapper.style.overflowX = 'hidden'

          gsap.from(wrapper.querySelectorAll('[data-position]'), {
            y: 30,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: section, start: 'top 70%', once: true },
          })

          const getDistance = () => track.scrollWidth - wrapper.clientWidth

          gsap.to(track, {
            x: () => -Math.max(getDistance(), 0),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'center center',
              end: () => `+=${Math.max(getDistance(), 0)}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          })

          return () => {
            wrapper.style.overflowX = ''
          }
        }
      )

      mm.add(
        '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.from(mobile.querySelectorAll('[data-position]'), {
            x: 40,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: mobile, start: 'top 85%', once: true },
          })
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="container flex flex-col md:flex-row gap-10 md:gap-20"
      id="aboutMe"
    >
      <div className="flex flex-col gap-10 shrink-0">
        <h2
          data-animate
          className="title-font [&>span]:md:ml-16.5 [&>span]:ml-6 [&>span]:leading-6 [&>span]:md:leading-12 [&>span]:block [&>span]:text-primary"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="flex flex-col gap-4">
          {description.map((desc, index) => (
            <p
              key={desc + index}
              data-animate
              className="max-w-150 body-small md:body-large text-muted [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          ))}
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="hidden md:block overflow-x-auto flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          className="grid grid-rows-3 grid-flow-col auto-cols-[minmax(320px,1fr)] w-max"
        >
          {positions.map((position, index) => (
            <PositionCard
              key={position.title + index}
              position={position}
              isFirstRow={index % ROWS === 0}
            />
          ))}
        </div>
      </div>

      <div
        ref={mobileRef}
        className="md:hidden overflow-x-auto scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-6 w-max">
          {positions.map((position, index) => (
            <div
              key={position.title + index}
              className="snap-start w-[80vw] shrink-0"
            >
              <PositionCard position={position} isFirstRow />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
