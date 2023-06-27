// Copy to clipboard function
const CopyToClipboard = () => {
  const copyBtns = document.querySelectorAll('.copy-clipboard')

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('aria-labelledby')
      const target = document.getElementById(targetId)

      // Select the text
      const range = document.createRange()
      range.selectNode(target)

      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)

      // Copy the text
      document.execCommand('copy')

      // Remove the text selection
      window.getSelection().removeAllRanges()

      // Change the button text
      btn.innerHTML = 'Copied!'
      btn.classList.add('copied')

      setTimeout(() => {
        btn.innerHTML = 'Copy'
        btn.classList.remove('copied')
      }, 2000)
    })
  })
}

export { CopyToClipboard }
