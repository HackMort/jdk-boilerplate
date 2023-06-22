import { Props as SeoProps } from 'astro-seo'

export interface PageSeoConfig {
  pageId: string
  config: SeoProps
}

export interface SiteSeoConfig {
  globals: SeoProps
  pages: { [pageId: string]: SeoProps }
}
export const SEO_CONFIG: SiteSeoConfig = {
  globals: {
    openGraph: {
      basic: {
        title: 'A Very Descriptive Title',
        type: 'A type.'
      }
    }
  },
  pages: {
    index: {
      title: 'Homepage',
      titleTemplate: '%s | JD Boilerplate',
      description:
        'A heavily optimized description full of well-researched keywords.',
      openGraph: {
        basic: {
          image:
            'https://dev-jdoutstanding.com/_astro/jdk-logo-alt.cc760fca.png',

          url: 'https://www.boilerplate.com'
        }
      }
    }
  }
}
