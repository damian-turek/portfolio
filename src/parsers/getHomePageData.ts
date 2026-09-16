import { AboutMeProps } from '@/components/organisms/AboutMe'
import { SkillsProps } from '@/components/organisms/Skills'
import { ContactProps } from '@/components/organisms/Contact'
import { HeroProps } from '@/components/organisms/Hero'

import HeroImage from '@/assets/hero.jpeg'

export const getHomePageData = () => {
  const HERO_DATA = {
    title: 'Damian <span>Turek</span>',
    label: 'software engineer',
    mail: 'damianturek@icloud.com',
    description:
      'I’m a fullstack developer with a product mindset. I don’t just write code — I think about why the product exists, who uses it, and what makes it worth building well.',
    image: {
      src: HeroImage.src,
      alt: 'Hero Image',
    },
    tiles: [
      {
        title: '12<span>+</span>',
        description: 'Software, WebApps, Systems, and more',
        label: 'Projects',
      },
      {
        title: '17<span>k</span>',
        description: 'Contributions this year',
        label: 'GitHub 2026',
      },
      {
        title: '4<span>+</span>',
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
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
      {
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
      {
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
      {
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
      {
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
      {
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Junior Developer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
      {
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
      {
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
      {
        startDate: '2022.01',
        endDate: '2023.01',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        description:
          'Led architecture overhaul of transaction monitoring system. Reduced API latency by 60%, mentored team of 4.',
      },
    ],
  } satisfies AboutMeProps

  const SKILLS_DATA = {
    title: 'Full stack, <span>top to bottom.</span>',
    mainTechnologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
    ],
    technologies: [
      'GraphQL',
      'Prisma',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'AWS',
      'Vitest',
      'StoryBook',
      'Jest',
      'Cypress',
      'Playwright',
      'Vite',
      'Webpack',
      'Babel',
      'ESLint',
      'Prettier',
    ],
  } satisfies SkillsProps

  const PROJECTS_DATA = {
    title: 'CREATED <span>PROJECTS</span>',
    projects: [
      {
        title: 'Orion Analytics',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        description: 'SaaS · Revenue dashboard for e-commerce',
        projectUrl: '#',
        index: '(a.)',
      },
      {
        title: 'Orion Analytics',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        description: 'SaaS · Revenue dashboard for e-commerce',
        projectUrl: '#',
        index: '(b.)',
      },
      {
        title: 'Orion Analytics',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        description: 'SaaS · Revenue dashboard for e-commerce',
        projectUrl: '#',
        index: '(c.)',
      },
      {
        title: 'Orion Analytics',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        description: 'SaaS · Revenue dashboard for e-commerce',
        projectUrl: '#',
        index: '(d.)',
      },
      {
        title: 'Orion Analytics',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        description: 'SaaS · Revenue dashboard for e-commerce',
        projectUrl: '#',
        index: '(e.)',
      },
    ],
  }

  const CONTACT_DATA = {
    title: "Let's <br/> build <span>something</span>",
  } satisfies ContactProps

  return { HERO_DATA, ABOUT_ME_DATA, SKILLS_DATA, PROJECTS_DATA, CONTACT_DATA }
}
