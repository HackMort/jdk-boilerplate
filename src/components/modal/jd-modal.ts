/**
 * data-jd-modal-trigger="<modalId>"
 */

import { Fancybox } from '@fancyapps/ui'
const TEMPLATE_PREFFIX = 'jd-modal-template-'
const MODAL_PREFFIX = 'jd-modal-'

class ModalGroup {
  modals: JdModal[] = []
}

class JdModal {
  fancybox: Fancybox
  template: HTMLTemplateElement

  constructor (template: HTMLTemplateElement) {
    this.template = template
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll<HTMLElement>(
    '[data-jd-modal-trigger]'
  )

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.jdModalTrigger
      const modalTemplateId = '#' + TEMPLATE_PREFFIX + modalId

      const modalTemplate: HTMLTemplateElement =
        document.querySelector(modalTemplateId)
      console.log(
        '🚀 ~ file: jd-modal.ts:33 ~ trigger.addEventListener ~ modalTemplate:',
        modalTemplate
      )
    })
  })
})
