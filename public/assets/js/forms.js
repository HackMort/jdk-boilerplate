/* eslint-disable no-unused-vars */
const parentClassName = 'form__control'
const formClassName = 'form'
/**
 * If the parent element of the child element has the class name, return the parent
 * element, otherwise, call the function again with the parent element as the child
 * element.
 * @param child {HTMLElement} - the child element that you want to find the parent of
 * @param className {string} - The class name of the parent element you're looking for.
 * @returns {HTMLElement} The parent element of the child element.
 */
const getParent = function (child, className) {
  const parent = child.parentElement
  const isControlParent = parent.classList.contains(className)

  if ((parent === null) || isControlParent) {
    return parent
  } else {
    return getParent(parent, className)
  }
}

/**
  Disables a submit button by adding the 'disabled' attribute and the 'disabled' class to its parent element.
  @param {Element} submit - The submit button to be disabled.
*/
const disableSubmitButton = (submit) => {
  submit && submit.setAttribute('disabled', 'true')
  if (submit.parentElement) {
    submit.parentElement.classList.add('disabled')
  }
}

/**
  Enables a submit button by removing the 'disabled' attribute and the 'disabled' class from its parent element.
  @param {Element} submit - The submit button to be enabled.
*/
const enableSubmitButton = (submit) => {
  submit && submit.removeAttribute('disabled')
  if (submit.parentElement) {
    submit.parentElement.classList.remove('disabled')
  }
}

/**
 * If any of the radio buttons in the group are checked, return true.
 * @param name {string} - The name of the radio group.
 * @returns {boolean} A boolean value.
 */
const radioGroupIsValid = function (name) {
  const radioGroup = document.getElementsByName(
    `input[type="radio"][name=${name}]`
  )
  let isValid = false
  for (let i = 0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
      isValid = true
      break
    }
  }

  return isValid
}

/**
 * The function sets a dataset attribute to "true" for a given form control to indicate that it has
 * been touched.
 * @param {HTMLDivElement} control - The `control` parameter is a form control element, such as an input, select, or
 * textarea, that needs to be marked as touched. The function `markFormControlAsTouched` sets the
 * `data-touched` attribute of the control to `'true'`, indicating that the control has been touched
 */
const markFormControlAsTouched = (control) => {
  if (control) {
    control.dataset.touched = 'true'
  }
}

/**
 * "Return true if every required control has been touched."
 *
 * The function starts by filtering the controls array to only include controls
 * that are required. Then it uses the every method to check if every control in
 * the array has been touched
 * @returns A boolean value.
 */
const formHasBeenTouched = function (form) {
  const controls = Array.from(form.querySelectorAll('.form__control'))
  return controls
    .filter((control) => control.dataset.required === 'true')
    .some((control) => control.dataset.touched === 'true')
}

/**
 * It returns true if all the controls that have the data-required attribute set to
 * true also have the data-is-valid attribute set to true
 * @returns {boolean} A boolean value.
 */
const checkFormValidity = function (form) {
  const controls = Array.from(form.querySelectorAll('.form__control'))
  return controls
    .filter((control) => control.dataset.required === 'true')
    .every((control) => control.dataset.isValid === 'true')
}

/**
 * The function sets the validation status of a form control based on its required status and validity
 * of its native control.
 * @param {HTMLDivElement} formControl - The HTML element that represents the form control, such as an input or select
 * element.
 * @param {HTMLInputElement | HTMLSelectElement} nativeControl - The nativeControl parameter is a reference to the HTML input element that the
 * validation status is being set for.
 */
const setValidationStatusToFormControl = (formControl, nativeControl) => {
  const isOptional = formControl.dataset.required === 'false'
  markFormControlAsTouched(formControl)

  if (nativeControl.type === 'radio' && !nativeControl.checked) {
    const groupIsValid = radioGroupIsValid(nativeControl.name)

    if (groupIsValid || isOptional) {
      formControl.classList.remove('form__control--invalid')
      formControl.dataset.isValid = 'true'
    } else {
      formControl.classList.add('form__control--invalid')
      formControl.dataset.isValid = 'false'
    }
  } else {
    if (nativeControl.checkValidity() || isOptional) {
      formControl.classList.remove('form__control--invalid')
      formControl.dataset.isValid = 'true'
    } else {
      formControl.classList.add('form__control--invalid')
      formControl.dataset.isValid = 'false'
    }
  }
}

/**
 * The function validates form controls and toggles the state of the submit button based on the
 * validity of the form.
 * @param {Event} event - The event object that triggered the function, likely an input or change event on a
 * form control.
 */
function validateFormControl (event) {
  const nativeControl = event.target
  const formControl = getParent(nativeControl, parentClassName)
  const form = getParent(formControl, formClassName)
  const submitButton = form.querySelector("[type='submit']")

  markFormControlAsTouched(formControl)

  /**
   * If the form is valid, remove the disabled attribute from the submit button,
   * otherwise add the disabled attribute to the submit button
   */
  const toggleSubmitButtonState = function () {
    if (form && checkFormValidity(form)) {
      enableSubmitButton(submitButton)
      form.classList.remove('form--invalid')
    } else {
      disableSubmitButton(submitButton)
      if (formHasBeenTouched(form)) {
        form.classList.add('form--invalid')
      }
    }
  }

  // toggleSubmitButtonState()

  setValidationStatusToFormControl(formControl, nativeControl)

  // toggleSubmitButtonState()
}

function validateFormOnSubmit (event) {
  const form = event.target.form
  const formIsValid = checkFormValidity(form)

  if (!formIsValid) {
    event.preventDefault()

    const controls = Array.from(form.querySelectorAll('.' + parentClassName))
    controls.forEach((formControl) => {
      const nativeControl = formControl.querySelector('input') ||
        formControl.querySelector('select')

      setValidationStatusToFormControl(formControl, nativeControl)
    })
  }
}
