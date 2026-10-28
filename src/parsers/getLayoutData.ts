import { FooterProps } from '@/components/molecules/Footer'
import { HeaderProps } from '@/components/molecules/Header'
import { getTranslations } from 'next-intl/server'

export const getLayoutData = async () => {
  const t = await getTranslations('Layout')

  const HEADER_DATA = {
    logo: 'DT',
    nav: [
      { label: t('nav.about'), href: '#aboutMe' },
      { label: t('nav.stack'), href: '#skills' },
      { label: t('nav.projects'), href: '#projects' },
      { label: t('nav.contact'), href: '#contact' },
    ],
  } satisfies HeaderProps

  const FOOTER_DATA = {
    email: 'damianturek@icloud.com',
    name: {
      text: 'Damian Turek - DT',
      link: 'https://pl.linkedin.com/in/turek-damian',
    },
  } satisfies FooterProps

  return { HEADER_DATA, FOOTER_DATA }
}
