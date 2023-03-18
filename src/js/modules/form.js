export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms)
    this.inputs = document.querySelectorAll('input')
    this.message = {
      loading: 'Loading...',
      success: 'Thanks! We will contact you soon!',
      failure: 'Something went wrong...'
    }
    this.path = 'assets/question.php'
  }

  checkEmailInputs() {
    const emailInputs = document.querySelectorAll('[type="email"]')

    emailInputs.forEach(input => {
      input.addEventListener('keypress', function (e) {
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault()
        }
      })
    })
  }

  initMask() {
    const setCursorPosition = (pos, elem) => {
      elem.focus()

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos)
      } else if (elem.createTextRange) {
        let range = elem.createTextRange()

        range.collapse(true);
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      }
    }

    function createMask(event) {
      let matrix = '+1 (___) ___-____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '')

      if (def.length >= val.length) {
        val = def
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
      })

      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = ''
        }
      } else {
        setCursorPosition(this.value.length, this)
      }
    }

    let inputs = document.querySelectorAll('[name="phone"]')

    inputs.forEach(input => {
      input.addEventListener('input', createMask)
      input.addEventListener('focus', createMask)
      input.addEventListener('blur', createMask)
    })
  }

  clearInputs() {
    this.inputs.forEach(input => {
      input.value = ''
    })
  }

  async postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      body: data
    })

    return await res.text()
  }

  init() {
    this.checkEmailInputs()
    this.initMask()

    Array.from(this.forms).forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault()

        let statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: grey;
        `
        form.parentNode.appendChild(statusMessage)

        statusMessage.textContent = this.message.loading

        const formData = new FormData(form)

        this.postData(this.path, formData)
          .then(res => {
            console.log(res)
            statusMessage.textContent = this.message.success
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure
          })
          .finally(() => {
            this.clearInputs()
            setTimeout(() => {
              statusMessage.remove()
            }, 5000)
          })
      })
    })
  }
}
