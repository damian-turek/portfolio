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

export const getHomePageData = async () => {
  const total = await getAllContributions()

  const HERO_DATA = {
    title: 'Damian <span>Turek</span>',
    mail: 'damianturek@icloud.com',
    description:
      'I’m a software developer with a product mindset. I don’t just write code — I think about why the product exists, who uses it, and what makes it worth building well.',
    image: {
      src: HeroImage.src,
      alt: 'Hero Image',
    },
    tiles: [
      {
        title: '4',
        description: 'Software, WebApps, Systems, and more',
        label: 'Projects',
      },
      {
        title: `${(total / 1000).toFixed(1).replace('.0', '')}<span>k</span>`,
        description: 'Contributions this year',
        label: 'GitHub 2026',
      },
      {
        title: `${new Date().getFullYear() - 2023}<span>+</span>`,
        description: 'As software engineer',
        label: 'Years exp.',
      },
      {
        title: 'B.<span>Eng.</span>',
        description: 'Graduated from University as C.S. engineer',
        label: 'Education',
      },
    ],
  } satisfies HeroProps

  const ABOUT_ME_DATA = {
    title: 'WHO I <span>ACTUALLY AM</span>',
    description: [
      "I'm a fullstack developer with a product mindset. I don't just write code — I think about <strong>why the product exists</strong>, who uses it, and what makes it worth building well.",
      'I started as a frontend developer obsessed with interaction details, and gradually moved into backend, infrastructure, and systems design. Now I own the full stack — from database schema to the last pixel.',
      'Outside of shipping products, I <strong>Outside of shipping products, I</strong>, write about engineering culture, and mentor junior developers who are figuring out their path.',
      "I work best in small, focused teams where quality is taken seriously and people care about what they're building.",
    ],
    positions: [
      {
        startDate: '2025.09',
        endDate: 'current',
        title: 'Frontend Developer',
        company: 'INDIGITAL',
        description:
          '* implemented web applications from scratch for Indigital using Next.js, WP, Payload <br/>\n' +
          '* implemented Storybook for isolated UI component development, testing, and interactive documentation.',
      },
      {
        startDate: '2023.10',
        endDate: '2024.01',
        title: 'Frontend Developer',
        company: 'Green Box Europe Sp. z o.o.',
        description:
          '* implemented from scratch a new website for Green Box Europe using Next.js, Contetful <br/>\n' +
          '* implemented translation using i18n',
      },
      {
        startDate: '2019.09',
        endDate: '2023.05',
        title: 'Junior Frontend Engineer',
        company: 'Hypode',
        description:
          '* implemented from scratch a new website for one of the clients using Gatsby and Contentful <br/>\n' +
          '* connected to Instagram for fetching latest photos<br/>\n' +
          '* implemented Google Maps API',
      },
    ],
  } satisfies AboutMeProps

  const SKILLS_DATA = {
    title: 'Full stack, <span>top to bottom.</span>',
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
      'Webpack',
      'Babel',
      'ESLint',
      'Prettier',
      'Algorithms',
      'MatLab',
      'Simulink',
      'Contentful',
      'Pandas',
    ],
  } satisfies SkillsProps

  const PROJECTS_DATA = {
    title: 'CREATED <span>PROJECTS</span>',
    projects: [
      {
        title: 'Stock assistant - in progress',
        technologies: ['PyTorch', 'Python', 'Pandas', 'Scrappers'],
        description:
          'AI & Analytics · Automated stock analysis & predictive assistant built with PyTorch',
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
        description: 'SaaS · E-learning platform for post-graduate students',
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
        description: 'SaaS · Platform for community management',
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
        description:
          "Web application · Booksy connected SSG application for LO'r",
        projectUrl: 'https://lor.com.pl/',
        index: '(d.)',
        projectImage: { src: LorImage.src, alt: "LO'r" },
      },
    ],
  }

  const CONTACT_DATA = {
    title: "Let's <br/> build <span>something</span>",
  } satisfies ContactProps

  return { HERO_DATA, ABOUT_ME_DATA, SKILLS_DATA, PROJECTS_DATA, CONTACT_DATA }
}
