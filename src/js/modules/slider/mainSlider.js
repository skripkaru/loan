import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns)
  }

  // n - Направление слайдера. Если +1 то вперед, если -1 то назад
  showSlides(n) {
    // Если n больше чем общее количество слайдов, тогда возвращаемся на 1 слайд
    if (n > this.slides.length) {
      this.slideIndex = 1
    }

    // Если n меньше 1 тогда возвращаемся на последний слайд
    if (n < 1) {
      this.slideIndex = this.slides.length
    }

    if (this.hanmson) {
      this.hanmson.style.opacity = '0'

      if (n === 3) {
        this.hanmson.classList.add('animated')
        setTimeout(() => {
          this.hanmson.style.opacity = '1'
          this.hanmson.classList.add('slideInUp')
        }, 3000)
      } else {
        this.hanmson.classList.remove('slideInUp')
      }
    }

    // Скрываем все слайды
    Array.from(this.slides).forEach(slide => {
      slide.style.display = 'none'
    })

    // Показываем слайд
    this.slides[this.slideIndex - 1].style.display = 'block'
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n)
  }

  changeSlide(btns, n) {
    document.querySelectorAll(btns).forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.plusSlides(n)
      })
    })
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        this.plusSlides(1)
      })

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault()
        this.slideIndex = 1
        this.showSlides(this.slideIndex)
      })
    })

    this.changeSlide('.prevmodule', -1)
    this.changeSlide('.nextmodule', 1)
  }

  render() {
    if (this.container) {
      if (this.hanmson) this.hanmson = document.querySelector('.hanson')

      this.showSlides(this.slideIndex)
      this.bindTriggers()
    }
  }
}
