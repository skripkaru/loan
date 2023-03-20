export default class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers)
  }

  init() {
    this.btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        const body = btn.nextElementSibling
        body.classList.toggle('active')
      })
    })
  }
}
