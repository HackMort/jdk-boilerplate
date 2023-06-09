/**
  * The function looks for <div class="accordion"> elements
  * Here's an example of an accordion:
  * <div class="accordion">
  * <article id={id} role="tab" class="accordion__item" aria-expanded={expanded}>
  * <div class="accordion__item_header">
  * <h6 class="accordion__item_title" role="button" tabindex="0" aria-controls={id}> {header} </h6>
  * </div>
  * <div class="accordion__item_content" role="tabpanel" aria-labelledby={id} tabindex="0"> <slot /> </div>
  * </article>
  * </div>
  */

export function Accordions () {
  const accordions = document.querySelectorAll('.accordion.accordion-group')
  const globalAccordionItems = document.querySelectorAll('.accordion:not(.accordion-group) .accordion__item')

  if (!accordions) {
    return
  }

  if (globalAccordionItems.length > 0) {
    globalAccordionItems.forEach((accordionItem) => {
      accordionItem.addEventListener('click', (e) => {
        const expanded = accordionItem.getAttribute('aria-expanded') === 'true' || false
        accordionItem.setAttribute('aria-expanded', !expanded)
      })
    })
  }

  accordions.forEach((accordion) => {
    const accordionIsExpandAll = accordion.hasAttribute('data-expand-all') ?? false
    const accordionExpandBehavior = accordion.getAttribute('data-expand-behavior') ?? 'multiple'
    const accordionItems = accordion.querySelectorAll('.accordion__item')
    const accordionTrigger = accordion.querySelector('.accordion-group-toggle') ?? false
    const accordionTriggerOpenClass = 'accordion-group-toggle--opened'

    if (accordionIsExpandAll) {
      accordionTrigger && accordionTrigger.classList.add(accordionTriggerOpenClass)
      accordionItems.forEach((accordionItem) => {
        accordionItem.setAttribute('aria-expanded', true)
      })
    }

    accordionItems.forEach((accordionItem) => {
      accordionItem.addEventListener('click', (e) => {
        const expanded = accordionItem.getAttribute('aria-expanded') === 'true' || false
        accordionItem.setAttribute('aria-expanded', !expanded)

        if (accordionExpandBehavior === 'single') {
          // close all other accordion items... maybe?
          accordionItems.forEach((accordionItem) => {
            // If the accordion item is not the clicked and if its not expanded
            if (accordionItem !== e.currentTarget && expanded === false) {
              accordionItem.setAttribute('aria-expanded', false)
            }
          })
        }

        if (accordionTrigger) {
          if (expanded) {
            accordionTrigger.classList.remove(accordionTriggerOpenClass)
          } else {
            accordionTrigger.classList.add(accordionTriggerOpenClass)
          }
        }
      })
    })

    accordionTrigger && accordionTrigger.addEventListener('click', (e) => {
      e.preventDefault()
      const opened = accordionTrigger.classList.contains(accordionTriggerOpenClass)

      if (opened) {
        accordionTrigger.classList.remove(accordionTriggerOpenClass)
        accordionItems.forEach((accordionItem) => {
          accordionItem.setAttribute('aria-expanded', false)
        })
      } else {
        accordionTrigger.classList.add(accordionTriggerOpenClass)
        accordionItems.forEach((accordionItem) => {
          accordionItem.setAttribute('aria-expanded', true)
        })
      }
    })
  })
}
