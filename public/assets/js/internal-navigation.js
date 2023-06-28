let isClick = false
let clickTimeout
const heightRatio = 1.45

window.addEventListener('DOMContentLoaded', (event) => {
  const internalNav = document.querySelector('.internal-nav')
  if (internalNav) {
    const internalNavigationLinks = document.querySelectorAll(
      '.internal-nav__list-item-link'
    )
    internalNavigationLinks.forEach((navigationLink) => {
      if (navigationLink.hash.startsWith('#')) {
        navigationLink.addEventListener('click', goToTarget)
      }
    })

    if (internalNav.dataset.fixOnScroll !== 'false') {
      setFixInternalNav()
      setTopNav()

      window.addEventListener('resize', () => {
        setTopNav()
      })

      window.addEventListener('scroll', () => {
        setFixInternalNav()
        setTopNav()
      })
    }

    if (internalNav.dataset.highlightOnScroll !== 'false') {
      window.addEventListener('scroll', () => {
        addHighlightOnScrollObserver()
      })
    }
  }
})

function goToTarget(event) {
  event.preventDefault()
  if (clickTimeout) {
    clearTimeout(clickTimeout)
  }
  const target = document.querySelector(event.target.hash)
  if (target) {
    const internalNav = document.querySelector('.internal-nav')
    let internalNavHeight = 0
    let elementsBeforeNavHeight = 0
    let internalNavTop = 0

    elementsBeforeNavHeight = getHeightNavigationCalcs()
    if (internalNav.dataset.fixOnScroll !== 'false') {
      const internalNavStyles = window.getComputedStyle(internalNav)
      internalNavTop = parseInt(
        internalNavStyles.getPropertyValue('--internal-nav-top').slice(0, -2)
      )
      internalNavHeight = internalNav.scrollHeight * heightRatio
      const mobileQuery = window.matchMedia('(max-width: 1199px)')
      if (mobileQuery) {
        internalNavHeight = internalNav.offsetHeight
      }
    }

    const targetOffsetTop =
      target.getBoundingClientRect().top + window.pageYOffset

    const scrollPosition =
      targetOffsetTop -
      internalNavHeight -
      internalNavTop -
      elementsBeforeNavHeight
    isClick = true

    switchActive(event.target)

    window.scroll({
      top: scrollPosition,
      behavior: 'smooth'
    })

    clickTimeout = setTimeout(() => {
      isClick = false
    }, 1000)
  }
}

function addHighlightOnScrollObserver() {
  const internalNavItemLinks = document.querySelectorAll(
    '.internal-nav__list-item-link'
  )
  const internalNav = document.querySelector('.internal-nav')

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  }

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const sectionTop = entry.boundingClientRect.top
      const internalNavMainStyles = window.getComputedStyle(internalNav)
      const heightBeforeInternalNav =
        parseInt(
          internalNavMainStyles
            .getPropertyValue('--internal-nav-top')
            .slice(0, -2)
        ) + internalNav.scrollHeight
      const targetElement = entry.target
      const elementId = targetElement.id
      if (
        !isClick &&
        entry.isIntersecting &&
        sectionTop <= heightBeforeInternalNav &&
        sectionTop >= 0
      ) {
        const internalNavLink = document.querySelector(
          `.internal-nav__list-item-link[href='#${elementId}']`
        )
        switchActive(internalNavLink)
      }
    })
  }, observerOptions)

  internalNavItemLinks.forEach((internalNavItemLink) => {
    if (internalNavItemLink.hash) {
      const targetElement = document.querySelector(internalNavItemLink.hash)
      if (targetElement) {
        observer.observe(targetElement)
      }
    }
  })
}

function setFixInternalNav() {
  const internalNav = document.querySelector('.internal-nav')
  const internalNavMargin = document.querySelector(
    '.internal-nav-margin-on-fix'
  )

  const heightBeforeChangingPosition = getHeightCalc()
  const heightBeforeOnFixPosition = getHeightCalc(['fixed'])
  const windowPageYOffset = window.pageYOffset

  if (
    windowPageYOffset >
    heightBeforeChangingPosition - heightBeforeOnFixPosition
  ) {
    internalNav.classList.add('is--fixed')
    let fixMarginBottom = internalNav.scrollHeight * heightRatio
    const mobileQuery = window.matchMedia('(max-width: 1199px)')
    if (mobileQuery) {
      fixMarginBottom = internalNav.offsetHeight
    }
    internalNavMargin.style.setProperty('margin-bottom', fixMarginBottom + 'px')
  } else {
    internalNav.classList.remove('is--fixed')
    internalNavMargin.style.removeProperty('margin-bottom')
  }
}

function setTopNav() {
  const internalNav = document.querySelector('.internal-nav')
  const extraOffset = getHeightCalc(['fixed', 'sticky'])

  internalNav.style.setProperty('--internal-nav-top', `${extraOffset}px`)
}

function getHeightCalc(positions = ['static', 'relative']) {
  const internalNav = document.querySelector('.internal-nav')
  const elementsBeforeNav = JSON.parse(internalNav.dataset.elementsBeforeNav)

  let totalOffset = 0
  elementsBeforeNav.forEach((element) => {
    const elementBeforeNav = document.querySelector(element.mainSelector)
    if (elementBeforeNav) {
      const elementStyles = window.getComputedStyle(elementBeforeNav)
      const elementPosition = elementStyles.getPropertyValue('position')

      if (positions.indexOf(elementPosition) !== -1) {
        totalOffset += elementBeforeNav.offsetHeight
      }
    }
  })

  return totalOffset
}

function getHeightNavigationCalcs() {
  const internalNav = document.querySelector('.internal-nav')
  const elementsBeforeNav = JSON.parse(internalNav.dataset.elementsBeforeNav)

  let totalOffset = 0
  elementsBeforeNav.forEach((element) => {
    const elementBeforeNav = document.querySelector(element.mainSelector)
    if (elementBeforeNav) {
      const elementStyles = window.getComputedStyle(elementBeforeNav)
      const elementPosition = elementStyles.getPropertyValue('position')
      if (internalNav.dataset.fixOnScroll !== 'false') {
        if (element.positionOnScroll === 'fixed') {
          totalOffset += elementBeforeNav.offsetHeight
          if (elementPosition === element.positionOnScroll) {
            totalOffset -= elementBeforeNav.offsetHeight
          } else {
            totalOffset += elementBeforeNav.offsetHeight
          }
        } else if (element.positionOnScroll === 'sticky') {
          totalOffset += elementBeforeNav.offsetHeight
          if (elementPosition === element.positionOnScroll) {
            totalOffset -= elementBeforeNav.offsetHeight
          }
        }
      } else {
        if (element.positionOnScroll === 'sticky') {
          totalOffset += elementBeforeNav.offsetHeight
        } else if (element.positionOnScroll === 'fixed') {
          totalOffset += elementBeforeNav.offsetHeight
          if (elementPosition !== element.positionOnScroll) {
            totalOffset += elementBeforeNav.offsetHeight
          }
        }
      }
    }
  })

  return totalOffset
}

function switchActive(targetChild) {
  const currentLinkActive = document.querySelector(
    '.internal-nav__list-item--is-active'
  )
  const newLinkActive = targetChild.parentElement
  currentLinkActive.classList.remove('internal-nav__list-item--is-active')
  newLinkActive.classList.add('internal-nav__list-item--is-active')
  scrollToActiveElement(newLinkActive)
}

function scrollToActiveElement(itemTarget) {
  const internalNav = document.querySelector('.internal-nav')

  if (internalNav.dataset.scrollToActive !== 'false') {
    const internalNavList = document.querySelector('.internal-nav__list')
    const activeOffset = itemTarget.offsetLeft
    internalNavList.scrollLeft = activeOffset
  }
}
