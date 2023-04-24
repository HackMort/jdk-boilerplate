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
      })
    })
  }
}
