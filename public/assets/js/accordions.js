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
  const accordion = document.querySelector('.accordion')
  if (accordion) {
    const accordionItems = document.querySelectorAll('.accordion__item')
    accordionItems.forEach((accordionItem) => {
      accordionItem.addEventListener('click', (e) => {
        const expanded = accordionItem.getAttribute('aria-expanded') === 'true' || false
        accordionItem.setAttribute('aria-expanded', !expanded)

        // close all other accordion items... maybe?
        // accordionItems.forEach((accordionItem) => {
        //   if (accordionItem !== e.currentTarget) {
        //     accordionItem.setAttribute('aria-expanded', false)
        //   }
        // })

        GetAccordionGroupState(accordionItem)
      })
    })
  }
}

/**
 * The function looks for <div class="accordion-group"> elements
 * @description Open a event listener for each accordion group trigger, when the trigger is clicked, change the state of the accordion group items and the trigger
 * @returns {void}
*/
export function AccordionsGroup () {
  const triggers = document.querySelectorAll('.accordion-group-toggle') || false

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault()
      e.target.classList.toggle('accordion-group-toggle--opened')
      const target = document.querySelector(`#accordion-group-${e.target.getAttribute('data-target')}`)
      const isExpanded = target.getAttribute('data-expanded') === 'true' || false
      const accordionItems = target.querySelectorAll('.accordion__item')

      if (isExpanded) {
        accordionItems.forEach((accordionItem) => {
          accordionItem.setAttribute('aria-expanded', false)
        })

        target.setAttribute('data-expanded', false)
      } else {
        accordionItems.forEach((accordionItem) => {
          accordionItem.setAttribute('aria-expanded', true)
        })

        target.setAttribute('data-expanded', true)
      }
    })
  })
}

/**
 * GetAccordionGroupState
 * @description Validate if all items are closed or not, if a single item is open change the state of the accordion group and the trigger
 * @param {*} item Item clicked
 * @returns {void}
 */
function GetAccordionGroupState (item) {
  // Get the accordion group if exists or return false
  const target = item.closest('.accordion-group')
  if (!target) {
    return
  }

  // Validate if all items are closed or not
  const accordionItems = target.querySelectorAll('.accordion__item')
  let allClosed = true
  accordionItems.forEach((accordionItem) => {
    if (accordionItem.getAttribute('aria-expanded') === 'true') {
      allClosed = false
    }
  })

  // Change the states of the accordion group and the trigger
  const trigger = document.querySelector(`.accordion-group-toggle[data-target="${target.getAttribute('id').replace('accordion-group-', '')}"]`)
  if (allClosed) {
    trigger.classList.remove('accordion-group-toggle--opened')
    target.setAttribute('data-expanded', false)
  } else {
    trigger.classList.add('accordion-group-toggle--opened')
    target.setAttribute('data-expanded', true)
  }
}
