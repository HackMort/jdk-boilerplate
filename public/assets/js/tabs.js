/**
  * The function looks for <ul role="tablist"> elements
  * The function also looks for <section role="tabpanel"> elements
  */
export function Tabs () {
  const tablist = document.querySelectorAll("ul[role='tablist']")
  if (!tablist || tablist.length === 0) {
    return
  }
  const tabLinks = []
  tablist.forEach((tabListItem) => {
    const tabs = tabListItem.querySelectorAll("li[role='presentation']")
    tabs.forEach((tabItem) => {
      const link = tabItem.querySelector("a[role='tab']")
      tabLinks.push(link)
    })
  })

  const panels = document.querySelectorAll("section[role='tabpanel']")

  const LEFT_ARROW = 'ArrowLeft'
  const RIGHT_ARROW = 'ArrowRight'
  const DOWN_ARROW = 'ArrowDown'

  tabLinks.forEach(function (tab, i) {
    tab.addEventListener('click', (e) => {
      e.preventDefault()
      const currentTabList = e.currentTarget.closest('ul[role="tablist"]')
      const currentTab = currentTabList.querySelector('[aria-selected]')
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget)
      }
    })

    tab.addEventListener('keydown', (e) => {
      const index = tabLinks.indexOf(e.currentTarget)
      switch (e.key) {
        case DOWN_ARROW:
          panels[i].focus()
          break
        case LEFT_ARROW:
          e.preventDefault()
          if (tabLinks[index - 1]) {
            switchTab(e.currentTarget, tabLinks[index - 1])
          }
          break
        case RIGHT_ARROW:
          e.preventDefault()
          if (tabLinks[index + 1]) {
            switchTab(e.currentTarget, tabLinks[index + 1])
          }
          break

        default:
          break
      }
    })
  })

  const switchTab = (prevTab, newTab) => {
    newTab.focus()
    newTab.removeAttribute('tabindex')
    newTab.setAttribute('aria-selected', 'true')
    prevTab.removeAttribute('aria-selected')
    prevTab.setAttribute('tabindex', '-1')
    panels[tabLinks.indexOf(prevTab)].hidden = true
    panels[tabLinks.indexOf(newTab)].hidden = false
  }
}
