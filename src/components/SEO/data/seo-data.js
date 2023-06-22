/*
  If you need to add more properties you can read the documentation of Astro SEO at https://github.com/jonasmerlin/astro-seo#readme
*/
const seoData = {
  charset: 'UTF-8',
  description: '',
  nofollow: false,
  noindex: false,
  titleDefault: 'JDK Boilerplate',
  titleTemplate: '%s - JDK Boilerplate',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }
  ],
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width'
    }
  ],
  pages: {
    design: {
      title: 'Design',
      openGraph: {
        basic: {
          title: '',
          type: '',
          image: ''
        }
      },
      twitter: {
        title: '',
        image: '',
        imageAlt: '',
        description: ''
      }
    },
    index: {
      title: 'Welcome',
      openGraph: {
        basic: {
          title: '',
          type: '',
          image: ''
        }
      },
      twitter: {
        title: '',
        image: '',
        imageAlt: '',
        description: ''
      }
    },
    'internal-nav-test': {
      title: 'Internal Navigation Test',
      openGraph: {
        basic: {
          title: '',
          type: '',
          image: ''
        }
      },
      twitter: {
        title: '',
        image: '',
        imageAlt: '',
        description: ''
      }
    }
  }
}

export default seoData
