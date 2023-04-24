import { Tabs } from './tabs.js'
import { cookieValidation, cookieFormValidation } from './validate.js'
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM fully loaded and parsed')
  /**
   * Validation
   * @see public/assets/js/validation.js
   * Call the function from validation.js
  */
  cookieValidation()
  cookieFormValidation()
  /**
   * Tabs
   * @see public/assets/js/tabs.js
   * Call the function from tabs.js
  */
  Tabs()
})
