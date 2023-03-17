export default class Difference {
  constructor(container, items) {
    this.container = document.querySelector(container)
    this.items = this.container.querySelectorAll(items)
    this.counter = 0
  }

  hideItems() {
    this.items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none'
      }
    })
  }

  bindTriggers() {
    this.container.querySelector('.plus').addEventListener('click', () => {
      if (this.counter !== this.items.length - 2) {
        this.items[this.counter].style.display = 'flex'
        this.items[this.counter].classList.add('animated', 'fadeIn')
        this.counter++
      } else {
        this.items[this.counter].style.display = 'flex'
        this.items[this.items.length - 1].remove()
      }
    })
  }

  init() {
    this.hideItems()
    this.bindTriggers()
  }
}
