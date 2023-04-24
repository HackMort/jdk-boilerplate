/**
  * The function below is used to validate the access code for the site
  * @see public/assets/js/validate.js
  * The function is called from public/assets/js/script.js
  * When the user submits the form, the function checks the value of the input field against the access code (customPSW)
  * If the access code is correct, the function sets a cookie with the access code and redirects the user to the home page
  * If the access code is incorrect, the function displays an alert
  * The function also checks if the user has a cookie with the access code
  * If the user does not have a cookie with the access code, the function redirects the user to the validation page
  */

function cookieValidation () {
  const accessCookie = document.cookie.split(';').filter((item) => item.trim().startsWith('accessCookie=')).pop()
  if (!accessCookie && accessCookie !== 'accessCookie=customPSW' && window.location.pathname !== '/validate/') {
    window.location.href = '/validate/'
  }
}
function cookieFormValidation () {
  // Validate Form
  const form = document.querySelector('.form__validate')
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const accessCode = form.querySelector('input[name="access-code"]').value
      if (accessCode === 'customPSW') {
        document.cookie = `accessCookie=${accessCode};max-age=604800;path=/`
        window.location.href = '/'
      } else {
        window.alert('Invalid Access Code')
      }
    })
  }
}

export { cookieValidation, cookieFormValidation }
