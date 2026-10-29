import { getTranslations } from 'next-intl/server'

import { AboutMeProps } from '@/components/organisms/AboutMe'
import { SkillsProps } from '@/components/organisms/Skills'
import { ContactProps } from '@/components/organisms/Contact'
import { HeroProps } from '@/components/organisms/Hero'

import HeroImage from '@/assets/hero.jpeg'
import LorImage from '@/assets/lor.png'
import PrepCodeImage from '@/assets/prepcode.png'
import CommunityImage from '@/assets/community.png'

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7

const getAllContributions = async (year = new Date().getFullYear()) => {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/damian-turek?y=${year}`,
      { next: { revalidate: WEEK_IN_SECONDS } }
    )

    if (!res.ok) throw new Error(`GitHub contributions API: ${res.status}`)

    const data: { total: Record<string, number> } = await res.json()

    return data.total[String(year)] ?? 0
  } catch (error) {
    console.error('getAllContributions failed', error)
    return 0
  }
}

export const getHomePageData = async (locale: string) => {
  const t = await getTranslations({ locale, namespace: 'HomepageData' })
  const total = await getAllContributions()

  const HERO_DATA = {
    title: 'Damian <span>Turek</span>',
    mail: 'damianturek@icloud.com',
    description: t.raw('hero.description'),
    image: {
      src: HeroImage.src,
      alt: t.raw('hero.imageAlt'),
    },
    tiles: [
      {
        title: '4',
        description: t.raw('hero.tiles.projects.description'),
        label: t.raw('hero.tiles.projects.label'),
      },
      {
        title: `${(total / 1000).toFixed(1).replace('.0', '')}<span>k</span>`,
        description: t.raw('hero.tiles.github.description'),
        label: t.raw('hero.tiles.github.label'),
      },
      {
        title: `${new Date().getFullYear() - 2023}<span>+</span>`,
        description: t.raw('hero.tiles.experience.description'),
        label: t.raw('hero.tiles.experience.label'),
      },
      {
        title: t.raw('hero.tiles.education.title'),
        description: t.raw('hero.tiles.education.description'),
        label: t.raw('hero.tiles.education.label'),
      },
    ],
  } satisfies HeroProps

  const ABOUT_ME_DATA = {
    title: t.raw('about.title'),
    description: [
      t.raw('about.paragraphs.p1'),
      t.raw('about.paragraphs.p2'),
      t.raw('about.paragraphs.p3'),
      t.raw('about.paragraphs.p4'),
    ],
    positions: [
      {
        startDate: '2025.09',
        endDate: t.raw('about.current'),
        title: t.raw('about.positions.indigital.title'),
        company: 'INDIGITAL',
        description: t.raw('about.positions.indigital.description'),
      },
      {
        startDate: '2023.10',
        endDate: '2024.01',
        title: t.raw('about.positions.greenbox.title'),
        company: 'Green Box Europe Sp. z o.o.',
        description: t.raw('about.positions.greenbox.description'),
      },
      {
        startDate: '2019.09',
        endDate: '2023.05',
        title: t.raw('about.positions.hypode.title'),
        company: 'Hypode',
        description: t.raw('about.positions.hypode.description'),
      },
    ],
  } satisfies AboutMeProps

  const SKILLS_DATA = {
    title: t.raw('skills.title'),
    mainTechnologies: [
      'React',
      'Next.js',
      'Nest.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Python',
      'GCP',
      'REST API',
      'AI',
    ],
    technologies: [
      'GraphQL',
      'Prisma',
      'SASS',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Git',
      'Docker',
      'Vitest',
      'StoryBook',
      'R3F',
      'Vite',
      'Prettier',
      'Algorithms',
      'MatLab',
      'Simulink',
      'Contentful',
      'Pandas',
      'Scrum',
      'Agile',
    ],
  } satisfies SkillsProps

  const PROJECTS_DATA = {
    title: t.raw('projects.title'),
    projects: [
      {
        title: t.raw('projects.stockAssistant.title'),
        technologies: ['PyTorch', 'Python', 'Pandas', 'Scrappers'],
        description: t.raw('projects.stockAssistant.description'),
        projectUrl: 'https://github.com/damian-turek/stock-assistant',
        index: '(a.)',
      },
      {
        title: 'Prep code',
        technologies: [
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Nest.js',
          'REST API',
        ],
        description: t.raw('projects.prepCode.description'),
        projectUrl: 'https://github.com/damian-turek/BOYSIT',
        index: '(b.)',
        projectImage: {
          src: PrepCodeImage.src,
          alt: 'Prep Code',
        },
      },
      {
        title: 'Community core',
        technologies: ['Next.js', 'TypeScript', 'CSS', 'REST API'],
        description: t.raw('projects.communityCore.description'),
        projectUrl: 'https://github.com/damian-turek/praca-inzynierska',
        index: '(c.)',
        projectImage: {
          src: CommunityImage.src,
          alt: 'Community core',
        },
      },
      {
        title: `LO'r`,
        technologies: [
          'Gatsby.js',
          'TypeScript',
          'SCSS',
          'GraphQL',
          'Contentful',
        ],
        description: t.raw('projects.lor.description'),
        projectUrl: 'https://lor.com.pl/',
        index: '(d.)',
        projectImage: { src: LorImage.src, alt: "LO'r" },
      },
    ],
  }

  const CONTACT_DATA = {
    title: t.raw('contact.title'),
  } satisfies ContactProps

  return { HERO_DATA, ABOUT_ME_DATA, SKILLS_DATA, PROJECTS_DATA, CONTACT_DATA }
}
