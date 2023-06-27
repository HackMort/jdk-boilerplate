/*
  elementsBeforeNav: Allows to know containers that will have position:fixed over navigation to calculate correct position to scroll and correct top position if navigation bar has position: fixed

  navigationItems: Allows to set navigation items for the list on each page on site
*/
const navigationData = {
  elementsBeforeNav: [
    { mainSelector: '.test-section-a', fixedPositionClassname: 'is--fixed' },
    { mainSelector: '.test-section-b', fixedPositionClassname: 'is--fixed' }
  ],
  navigationItems: {
    design: [
      { href: 'design-colors', label: 'Colors', active: true },
      { href: 'design-fonts', label: 'Fonts' },
      { href: 'design-buttons', label: 'Buttons' },
      { href: 'design-tabs', label: 'Tabs' },
      { href: 'design-accordions', label: 'Accordions' },
      { href: 'design-slide', label: 'Slider' },
      { href: 'design-picture', label: 'Picture' },
      { href: 'design-modal', label: 'Modal' }
    ],
    'internal-navigation-test': [
      { href: 'colors', label: 'Colors', active: true },
      { href: 'fonts', label: 'Fonts' },
      { href: 'buttons', label: 'Buttons' },
      { href: 'tabs', label: 'Tabs' },
      { href: 'accordions', label: 'Accordions' }
    ]
  }
}

export default navigationData
