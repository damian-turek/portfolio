import { Projects } from '@/components/organisms/Projects'
import { getHomePageData } from '@/parsers/getHomePageData'
import { AboutMe } from '@/components/organisms/AboutMe'
import { Skills } from '@/components/organisms/Skills'
import { Contact } from '@/components/organisms/Contact'
import { Hero } from '@/components/organisms/Hero'

export default async function Home({ params }: { params: { locale: string } }) {
  const { HERO_DATA, ABOUT_ME_DATA, SKILLS_DATA, PROJECTS_DATA, CONTACT_DATA } =
    await getHomePageData(params.locale)

  return (
    <main>
      <Hero {...HERO_DATA} />
      <AboutMe {...ABOUT_ME_DATA} />
      <Skills {...SKILLS_DATA} />
      <Projects {...PROJECTS_DATA} />
      <Contact {...CONTACT_DATA} />
    </main>
  )
}
