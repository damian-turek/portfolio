import { FooterProps } from '@/components/molecules/Footer'
import { HeaderProps } from '@/components/molecules/Header'

export const getLayoutData = () => {
  const HEADER_DATA = {
    logo: 'DT',
    nav: [
      { label: 'About Me', href: '#aboutMe' },
      { label: 'Stack', href: '#skills' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
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
