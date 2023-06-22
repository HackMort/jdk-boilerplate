import { Props as SeoProps } from 'astro-seo'

/* The `SiteSeoConfig` interface is defining the structure of an object that contains SEO configuration
for a website. It has two properties: `globals` and `pages`. */
export interface SiteSeoConfig {
  globals: SeoProps
  pages: { [pageId: string]: SeoProps }
}

/**
 * Add SEO configuration here
 * global: SEO configuration using in all pages
 * pages: SEO configuration by page
 */
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
