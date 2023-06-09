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
  const accordions = document.querySelectorAll('.accordion-group')

  if (accordions) {
    accordions.forEach((accordion) => {
      const accordionIsExpandAll = accordion.hasAttribute('data-expanded') ?? false
      const accordionItems = accordion.querySelectorAll('.accordion__item')
      const accordionTrigger = accordion.querySelector('.accordion-group-toggle') ?? false

      if (accordionIsExpandAll) {
        accordionTrigger && accordionTrigger.classList.add('accordion-group-toggle--opened')
        accordionItems.forEach((accordionItem) => {
          accordionItem.setAttribute('aria-expanded', true)
        })
      }

      accordionItems.forEach((accordionItem) => {
        accordionItem.addEventListener('click', (e) => {
          const expanded = accordionItem.getAttribute('aria-expanded') === 'true' || false
          accordionItem.setAttribute('aria-expanded', !expanded)
          // close all other accordion items... maybe?
          /* accordionItems.forEach((accordionItem) => {
            if (accordionItem !== e.currentTarget) {
              accordionItem.setAttribute('aria-expanded', false)
            }
          }) */

          if (accordionTrigger) {
            if (expanded) {
              accordionTrigger.classList.remove('accordion-group-toggle--opened')
            } else {
              accordionTrigger.classList.add('accordion-group-toggle--opened')
            }
          }
        })
      })

      accordionTrigger && accordionTrigger.addEventListener('click', (e) => {
        e.preventDefault()
        const opened = accordionTrigger.classList.contains('accordion-group-toggle--opened')

        if (opened) {
          accordionTrigger.classList.remove('accordion-group-toggle--opened')
          accordionItems.forEach((accordionItem) => {
            accordionItem.setAttribute('aria-expanded', false)
          })
        } else {
          accordionTrigger.classList.add('accordion-group-toggle--opened')
          accordionItems.forEach((accordionItem) => {
            accordionItem.setAttribute('aria-expanded', true)
          })
        }
      })
    })
  }
}
