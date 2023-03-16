import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, prev, next, activeClass, animate, autoplay) {
    super(container, prev, next, activeClass, animate, autoplay);
  }

  decorizeSlides() {
    Array.from(this.slides).forEach(slide => {
      slide.classList.remove(this.activeClass)
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '.4'
        slide.querySelector('.card__controls-arrow').style.opacity = '0'
      }
    })

    this.slides[0].classList.add(this.activeClass)

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1'
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1'
    }
  }

  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide())

    this.prev.addEventListener('click', () => {
      // Последний слайд помещаем в начало списка
      this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0])
      this.decorizeSlides()
    })
  }

  nextSlide() {
    // Первый слайд помещаем в конец списка
    this.container.appendChild(this.slides[0])
    this.decorizeSlides()
  }

  init() {
    this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `

    this.bindTriggers()
    this.decorizeSlides()

    if (this.autoplay) {
      setInterval(() => this.nextSlide(), 5000)
    }
  }
}
