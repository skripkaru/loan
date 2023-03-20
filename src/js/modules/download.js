export default class Download {
  constructor(triggers, path) {
    this.btns = document.querySelectorAll(triggers)
    this.path = path
  }

  downloadItem(path) {
    const link = document.createElement('a')

    link.setAttribute('href', path)
    link.setAttribute('download', '')
    link.hidden
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.downloadItem(this.path)
      })
    })
  }
}
