export default class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page)
    this.slides = this.page.children
    this.btns = document.querySelectorAll(btns)
    this.slideIndex = 1
  }

  // n - Направление слайдера
  // Если +1 то вперед, если -1 то назад
  showSlides(n) {
    // Если n больше чем общее количество слайдов, тогда возвращаемся на 1 слайд
    if(n > this.slides.length) {
      this.slideIndex = 1
    }

    // Если n меньше 1 тогда возвращаемся на последний слайд
    if(n < 1) {
      this.slideIndex = this.slides.length
    }

    try {
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
    } catch (e) {
      console.log(e)
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

  render() {
    try {
      this.hanmson = document.querySelector('.hanson')
    } catch (e) {
      console.log(e)
    }

    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlides(1)
      })

      btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault()
        this.slideIndex = 1
        this.showSlides(this.slideIndex)
      })
    })

    this.showSlides(this.slideIndex)
  }
}