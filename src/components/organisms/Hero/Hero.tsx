'use client'

import { ImageProps } from '@/types/image'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import React, { useEffect, useState } from 'react'

export type HeroProps = {
  title: string
  label: string
  description: string
  mail: string
  image: ImageProps
  githubUsername?: string
  tiles: {
    title: string
    description: string
    label: string
  }[]
}

function useGithubContribs(username?: string) {
  const [data, setData] = useState<{ total: number; monthly: number[] } | null>(
    null
  )
  useEffect(() => {
    if (!username) return
    const year = new Date().getFullYear()
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`
    )
      .then((r) => r.json())
      .then((json) => {
        const total: number = json.total?.[year] ?? 0
        const monthly = Array(12).fill(0) as number[]
        ;(json.contributions ?? []).forEach(
          (d: { date: string; count: number }) => {
            monthly[new Date(d.date).getMonth()] += d.count
          }
        )
        setData({ total, monthly })
      })
      .catch(() => {})
  }, [username])
  return data
}

export const Hero = ({
  title,
  label,
  mail,
  description,
  image,
  tiles,
  githubUsername = 'damian-turek',
}: HeroProps) => {
  const gh = useGithubContribs(githubUsername)
  const maxMonth = gh ? Math.max(...gh.monthly, 1) : 1

  return (
    <section className="container flex min-h-screen pt-8 lg:pt-0">
      <div className="flex flex-col xl:flex-row flex-1 gap-8 lg:gap-0">
        <div className="flex flex-col gap-6 justify-center lg:border-r border-muted/30 lg:min-w-180 lg:pr-10 lg:py-0">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-7 bg-primary" />
              <p className="label-font-spaced text-primary">{label}</p>
            </div>

            <h1
              className="hero-text [&_span]:text-primary [&_span]:block"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <div className="h-0.75 w-32 bg-primary rounded-full" />
            <p className="body-medium text-muted max-w-sm">{description}</p>
          </div>

          {githubUsername && (
            <div className="flex flex-col gap-2 py-4 border-y border-muted/20">
              <div className="flex items-center justify-between">
                <p className="label-font-spaced text-muted/60">
                  GitHub {new Date().getFullYear()}
                </p>
                <p className="label-font-spaced text-primary">
                  {gh ? gh.total.toLocaleString('pl-PL') : '…'}
                </p>
              </div>
              <div className="flex items-end gap-0.5 h-8">
                {(gh?.monthly ?? Array(12).fill(0)).map((v, i) => (
                  <div
                    key={i}
                    title={`Miesiąc ${i + 1}: ${v}`}
                    className="flex-1 rounded-sm bg-primary transition-all duration-700"
                    style={{
                      height: gh
                        ? `${Math.max(4, Math.round((v / maxMonth) * 32))}px`
                        : '4px',
                      opacity: gh
                        ? v === maxMonth
                          ? 1
                          : 0.35 + (v / maxMonth) * 0.5
                        : 0.15,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between">
                {[
                  'Sty',
                  '',
                  '',
                  'Kwi',
                  '',
                  '',
                  'Lip',
                  '',
                  '',
                  'Paź',
                  '',
                  'Gru',
                ].map((m, i) => (
                  <p key={i} className="label-font text-muted/40 text-[7px]">
                    {m}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="block w-1.5 h-1.5 rounded-full bg-primary animate-[pulse_2.2s_ease_infinite]" />
              <Button label="Send Message" link="#contact" />
              <Button
                link={`mailto:${mail}`}
                label={mail}
                variant="secondary"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0 gap-0">
          <div className="relative flex-1 overflow-hidden lg:px-10 lg:py-6 min-h-[50vw] lg:min-h-0">
            <div
              aria-hidden="true"
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20
                         flex-col items-center gap-2 pl-1"
            >
              <div className="h-10 w-px bg-muted/20" />
              <p
                className="label-font text-muted/30 text-[8px] tracking-[3px]"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                Software Engineer
              </p>
              <div className="h-10 w-px bg-muted/20" />
            </div>

            <div className="relative h-full w-full overflow-hidden rounded-2xl z-10 group">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover grayscale
                               transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none
                                  bg-linear-to-t from-background/40 to-transparent rounded-b-2xl"
              />

              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-muted/15 pointer-events-none z-20" />
            </div>
          </div>

          <div className="flex border-t border-muted/30 mt-6 lg:mt-0">
            {tiles.map((tile, index) => (
              <div
                key={index}
                className={cn(
                  'flex-1 flex flex-col gap-1 px-3 lg:px-5 pt-5 pb-4 group/tile',
                  'border-l border-muted/30',
                  'transition-transform duration-300 hover:-translate-y-1',
                  index === 0 ? 'border-none pl-0 lg:pl-10' : '',
                  index === tiles.length - 1 ? 'lg:pl-10' : ''
                )}
              >
                <h3
                  className="section-header-font [&_span]:text-primary lg:[&_span]:text-[42px]
                             transition-opacity group-hover/tile:[&_span]:opacity-80"
                  dangerouslySetInnerHTML={{ __html: tile.title }}
                />
                <p
                  className="label-font-spaced text-muted"
                  dangerouslySetInnerHTML={{ __html: tile.label }}
                />
                <p
                  className="body-small text-muted max-w-[8rem] hidden lg:block"
                  dangerouslySetInnerHTML={{ __html: tile.description }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
