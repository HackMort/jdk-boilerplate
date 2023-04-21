import { Panzoom, Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/panzoom/panzoom.css'

import { Toolbar } from '@fancyapps/ui/dist/panzoom/panzoom.toolbar.esm.js'
import '@fancyapps/ui/dist/panzoom/panzoom.toolbar.css'
import { OptionsType } from '@fancyapps/ui/types/Panzoom/options'

const options: Partial<OptionsType> = {
    click: 'toggleCover',
    Toolbar: {
        display: ['zoomIn', 'zoomOut']
    }
}

/* This code is adding an event listener to the `DOMContentLoaded` event, which fires when the initial
HTML document has been completely loaded and parsed. Once the event is fired, the code selects all
the buttons with the class `button--pich-to-zoom` and adds a click event listener to each of them.
When a button is clicked, the code retrieves the ID of the container element from the
`data-content-id` attribute of the button, selects the container element using the ID, and creates a
new instance of the `Panzoom` class with the container element, the `options` object, and the
`Toolbar` module as arguments. This allows the user to zoom in and out of the container element
using the pan and zoom controls provided by the `Panzoom` library. */
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(
        'button.button--pich-to-zoom'
    )

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const containerId = button.dataset.contentId
            const container = document.getElementById(containerId)
            const body = document.querySelector('body')

            const clone = container.cloneNode(true) as HTMLElement
            clone.setAttribute('style', 'display: none')
            clone.id = 'clone-' + clone.id
            const cloneZoomButton = clone.querySelector('button.button--pich-to-zoom')
            cloneZoomButton.parentElement.removeChild(cloneZoomButton)
            body.appendChild(clone)

            let panzoom: Panzoom

            const modal = new Fancybox([{ src: clone.id }], {
                autoFocus: true,
                defaultType: "inline",
                placeFocusBack: true,
                trapFocus: true,
                closeButton: false,
                id: clone.id,
                hideScrollbar: true,
                defaultDisplay: 'flex',
                on: {
                    done: () => {
                        panzoom = new Panzoom(clone, options, { Toolbar })
                        const slideContainer = document.querySelector('.fancybox__slide')

                        if (slideContainer) {
                            slideContainer.setAttribute('style', 'padding: 0 !important')
                        }

                        const closeModalButton = clone.querySelector('.pinch-to-zoom__close-modal')
                        closeModalButton.removeAttribute('style')
                        closeModalButton.addEventListener('click', () => {
                            panzoom.destroy()
                            modal.close()
                        })
                    },
                    destroy: () => {
                        clone.parentElement.removeChild(clone)
                    },
                }
            });
        })
    })
})
