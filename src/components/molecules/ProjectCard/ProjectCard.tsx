'use client'

import { Button } from '@/components/atoms/Button'
import { MoveUpRight } from 'lucide-react'
import { Tag } from '@/components/atoms/Tag'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export type ProjectCardProps = {
  title: string
  technologies: string[]
  description: string
  projectUrl: string
  index: string
  projectImage?: {
    src: string
    alt: string
  }
}

const IMAGE_WIDTH = 224

export const ProjectCard = ({
  title,
  technologies,
  description,
  projectUrl,
  index,
  projectImage,
}: ProjectCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)

  const moveX = useRef<((value: number) => void) | null>(null)
  const moveY = useRef<((value: number) => void) | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(borderRef.current, { scaleX: 0, transformOrigin: 'left center' })

      if (imageRef.current) {
        gsap.set(imageRef.current, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          autoAlpha: 0,
          scale: 0.9,
        })

        moveX.current = gsap.quickTo(imageRef.current, 'x', {
          duration: 0.5,
          ease: 'power3.out',
        })
        moveY.current = gsap.quickTo(imageRef.current, 'y', {
          duration: 0.5,
          ease: 'power3.out',
        })
      }
    }, linkRef)

    return () => ctx.revert()
  }, [])

  const getLocalPosition = (e: React.MouseEvent) => {
    const linkRect = linkRef.current!.getBoundingClientRect()
    const zoneRect = zoneRef.current!.getBoundingClientRect()

    const zoneLeft = zoneRect.left - linkRect.left
    const zoneRight = zoneRect.right - linkRect.left
    const half = IMAGE_WIDTH / 2

    const minX = zoneLeft + half
    const maxX = zoneRight - half
    const rawX = e.clientX - linkRect.left

    const x =
      minX >= maxX
        ? (zoneLeft + zoneRight) / 2
        : Math.min(Math.max(rawX, minX), maxX)

    return { x, y: e.clientY - linkRect.top }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    const image = imageRef.current

    gsap.set(linkRef.current, { zIndex: 10 })

    gsap.to(contentRef.current, {
      y: -4,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    gsap.fromTo(
      borderRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.35, ease: 'power2.out', overwrite: true }
    )

    gsap.to(buttonRef.current, {
      scale: 1.15,
      rotate: 15,
      duration: 0.3,
      ease: 'back.out(2)',
      overwrite: 'auto',
    })

    if (image) {
      const { x, y } = getLocalPosition(e)
      gsap.set(image, { x, y })

      gsap.to(image, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return
    const { x, y } = getLocalPosition(e)
    moveX.current?.(x)
    moveY.current?.(y)
  }

  const handleMouseLeave = () => {
    const image = imageRef.current

    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      overwrite: 'auto',
    })

    gsap.to(borderRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.3,
      ease: 'power2.in',
      overwrite: true,
    })

    gsap.to(buttonRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: 'auto',
    })

    if (image) {
      gsap.to(image, {
        autoAlpha: 0,
        scale: 0.9,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
      })
    }

    gsap.set(linkRef.current, { zIndex: 'auto', delay: 0.25 })
  }

  return (
    <Link
      ref={linkRef}
      href={projectUrl}
      data-project-card="true"
      className="relative block border-b border-muted/50"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={borderRef}
        className="absolute bottom-0 left-0 w-full h-px bg-foreground"
        aria-hidden="true"
      />

      {projectImage && (
        <div
          ref={imageRef}
          className="pointer-events-none absolute left-0 top-0 z-50 h-36 w-56 overflow-hidden rounded-sm"
          aria-hidden="true"
        >
          <Image
            src={projectImage.src}
            alt={projectImage.alt}
            fill
            sizes="224px"
            className="object-cover"
          />
        </div>
      )}

      <div
        ref={contentRef}
        className="flex gap-10 justify-between py-3 md:py-8"
      >
        <p
          className="label-font-spaced text-muted md:mt-3"
          dangerouslySetInnerHTML={{ __html: index }}
        />

        <div className="flex flex-col max-w-[50%]">
          <p
            className="section-header-font"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="body-small italic text-muted"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div
          ref={zoneRef}
          className="flex-1 min-w-0 self-stretch"
          aria-hidden="true"
        />

        <div ref={buttonRef} className="md:mt-3 origin-center">
          <Button iconOnly icon={MoveUpRight} />
        </div>

        <div className="hidden lg:flex md:mt-3 max-w-70 w-full flex-wrap justify-end gap-y-0 gap-x-1">
          {technologies.map((tech) => (
            <Tag key={tech} text={tech} />
          ))}
        </div>
      </div>
    </Link>
  )
}
