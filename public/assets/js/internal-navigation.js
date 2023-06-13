let isClick = false
let clickTimeout

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

      window.addEventListener('scroll', () => {
        setFixInternalNav()
      })
    }

    if (internalNav.dataset.highlightOnScroll !== 'false') {
      window.addEventListener('scroll', () => {
        addHighlightOnScrollObserver()
      })
    }

    setTopNav()
    window.addEventListener('resize', () => {
      setTopNav()
    })
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
    const internalNavStyles = window.getComputedStyle(internalNav)

    let internalNavHeight = 0
    let elementsBeforeNavHeight = 0
    let fixedElementsBeforeHeight = 0
    getNavigationOffsetPreFixedPosition()
    if (internalNav.dataset.fixOnScroll !== 'false') {
      internalNavHeight = internalNav.scrollHeight
      elementsBeforeNavHeight = parseInt(
        internalNavStyles.getPropertyValue('--internal-nav-top').slice(0, -2)
      )
      fixedElementsBeforeHeight = getNavigationOffsetPreFixedPosition()
    }

    let targetOffsetTop =
      target.getBoundingClientRect().top + window.pageYOffset
    if (!internalNav.classList.contains('is--fixed')) {
      targetOffsetTop =
        targetOffsetTop -
        internalNavHeight -
        elementsBeforeNavHeight +
        fixedElementsBeforeHeight
    }

    const scrollPosition =
      targetOffsetTop - internalNavHeight - elementsBeforeNavHeight
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
  let extraOffset = 0
  const internalNav = document.querySelector('.internal-nav')
  const previousSibling = internalNav.previousElementSibling

  if (previousSibling) {
    extraOffset += previousSibling.offsetHeight
  }

  const fixedElementsBeforeHeight = getNavigationOffsetPreFixedPosition()

  const internalNavHeight = internalNav.offsetHeight
  if (
    window.pageYOffset >
    internalNavHeight + extraOffset - fixedElementsBeforeHeight
  ) {
    internalNav.classList.add('is--fixed')
  } else {
    internalNav.classList.remove('is--fixed')
  }
}

function setTopNav() {
  const internalNav = document.querySelector('.internal-nav')
  const elementsBeforeNav = JSON.parse(internalNav.dataset.elementsBeforeNav)

  let totalOffset = 0
  elementsBeforeNav.forEach((element) => {
    if (element.selector !== '') {
      const elementBeforeNav = document.querySelector(element.mainSelector)
      if (elementBeforeNav) {
        totalOffset += elementBeforeNav.scrollHeight
      }
    }
  })

  internalNav.style.setProperty('--internal-nav-top', `${totalOffset}px`)
}

function getNavigationOffsetPreFixedPosition() {
  const internalNav = document.querySelector('.internal-nav')
  const elementsBeforeNav = JSON.parse(internalNav.dataset.elementsBeforeNav)

  let totalOffset = 0
  elementsBeforeNav.forEach((element) => {
    if (element.selector !== '') {
      const elementBeforeNav = document.querySelector(element.mainSelector)
      if (
        elementBeforeNav &&
        elementBeforeNav.classList.contains(element.fixedPositionClassname)
      ) {
        totalOffset += elementBeforeNav.scrollHeight
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
