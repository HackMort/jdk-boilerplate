import { Props } from 'astro-seo'

export interface SeoSiteConfig {
  pageId: string
  config: Props
}
const SEO_CONFIG: SeoSiteConfig[] = [
  {
    pageId: 'index',
    config: {
      title: 'Homepage',
      titleTemplate: '%s | JD Boilerplate',
      description:
        'A heavily optimized description full of well-researched keywords.',
      openGraph: {
        basic: {
          title: 'A Very Descriptive Title',
          type: 'A type.',
          image:
            'https://dev-jdoutstanding.com/_astro/jdk-logo-alt.cc760fca.png'
        }
      }
    }
  }
]

export function getSeoConfig (pageId: string) {}
