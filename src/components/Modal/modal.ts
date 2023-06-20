/**
 * data-jd-modal-trigger="<modalId>"
 */

import { Fancybox } from '@fancyapps/ui'

const TEMPLATE_PREFFIX = 'jd-modal-template-'
const MODAL_PREFFIX = 'jd-modal-'

let openModalTriggers: HTMLElement[] = []

const modals = new Map<string | number, Fancybox>()

/**
 * This function appends an HTML modal template to the DOM body.
 * @param {HTMLTemplateElement} template - HTMLTemplateElement - This is an object that represents an
 * HTML template element in the DOM. It contains the content of the template, which can be cloned and
 * inserted into the DOM.
 * @returns the cloned content of the provided HTML template element appended to the body of the
 * document.
 */
function appendHtmlModalToDom (template: HTMLTemplateElement) {
  const body = document.querySelector('body')
  const content = template.content.cloneNode(true)
  return body.appendChild(content)
}

/**
 * This function removes a HTML modal element from the DOM.
 * @param {string} modalId - The modalId parameter is a string that represents the ID of the HTML modal
 * element that needs to be removed from the DOM (Document Object Model).
 */
function removeHtmlModalFromDom (modalId: string) {
  const node = document.querySelector('#' + modalId)
  if (node) {
    node.parentElement.removeChild(node)
  }
}

/**
 * This function creates a modal using Fancybox library with specific configurations and event
 * listeners.
 * @param {string} modalId - a string representing the ID of the modal element that will be created.
 * @returns The function `createModal` is returning a new instance of the `Fancybox` class with the
 * provided configuration options.
 */
function createModal (modalId: string) {
  return new Fancybox([{ src: modalId }], {
    id: modalId,
    autoFocus: false,
    defaultType: 'inline',
    placeFocusBack: false,
    trapFocus: false,
    closeButton: false,
    height: 'auto',
    mainClass: 'fancybox__jd-modal-container',
    hideScrollbar: true,
    defaultDisplay: 'flex',
    on: {
      close: () => {
        setTimeout(() => {
          removeHtmlModalFromDom(modalId)
          removeModalInstanceFromGroup(modalId)
        }, 100)
      },
      destroy: () => {
        setTimeout(() => {
          removeHtmlModalFromDom(modalId)
          removeModalInstanceFromGroup(modalId)
        }, 100)
      }
    }
  })
}

/**
 * This function adds a Fancybox instance to a group of modals.
 * @param {Fancybox} instance - The parameter "instance" is of type "Fancybox", which is likely a class
 * or interface representing a modal window or dialog box. The function "addModalInstanceToGroup" takes
 * an instance of this class/interface and adds it to a Map object called "modals", using the
 * instance's ID
 */
function addModalInstanceToGroup (instance: Fancybox) {
  modals.set(instance.id, instance)
}

/**
 * This function removes a modal instance from a group if it exists.
 * @param {string} modalId - a string representing the unique identifier of a modal instance that needs
 * to be removed from a group of modal instances.
 */
function removeModalInstanceFromGroup (modalId: string) {
  if (modals.has(modalId)) {
    modals.delete(modalId)
  }
}

/**
 * This function initializes a modal by creating and appending it to the DOM, adding a close button
 * listener, and adding the modal instance to a group.
 * @param {Event} event - The `event` parameter is an object that represents an event that has
 * occurred, such as a mouse click or a key press. It contains information about the event, such as the
 * target element that triggered the event.
 */
function init (event: Event) {
  const trigger = event.target as HTMLElement

  const getModalId = (target: HTMLElement) => {
    let modalId = target.dataset.jdModalTrigger

    if (modalId) {
      return modalId
    } else {
      return getModalId(target.parentElement)
    }
  }

  let modalId = getModalId(trigger)
  const modalTemplateId = '#' + TEMPLATE_PREFFIX + modalId

  const modalTemplate: HTMLTemplateElement =
    document.querySelector(modalTemplateId)

  if (modalTemplate) {
    appendHtmlModalToDom(modalTemplate)
  } else {
    throw new Error('Modal template not found')
  }

  modalId = MODAL_PREFFIX + modalId
  const modal = createModal(modalId)

  const closeButtons: HTMLButtonElement[] = Array.from(
    document
      .querySelector('#' + modalId)
      .querySelectorAll('[data-jd-modal-close]')
  )

  if (closeButtons) {
    closeButtons.forEach(closeButton => {
      closeButton.addEventListener('click', () => {
        modal.close()
      })
    })
  }

  addModalInstanceToGroup(modal)
}

/**
 * The function removes click event listeners from an array of triggers.
 */
function removeListeners () {
  if (openModalTriggers && openModalTriggers.length > 0) {
    openModalTriggers.forEach(trigger =>
      trigger.removeEventListener('click', init)
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  removeListeners()
  openModalTriggers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-jd-modal-trigger]')
  )

  openModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', init)
  })
})
