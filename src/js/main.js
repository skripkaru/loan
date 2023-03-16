import MainSlider from "./modules/slider/mainSlider";
import MiniSlider from "./modules/slider/miniSlider";
import VideoPlayer from "./modules/playVideo";

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({
    container: '.page',
    btns: '.next'
  })
  slider.render()

  const showUpSlider = new MiniSlider({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true,
  })
  showUpSlider.init()

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  })
  modulesSlider.init()

  const feedSlider = new MiniSlider({
    container: '.feed__slider-content',
    prev: '.feed__slider-controls .slick-prev',
    next: '.feed__slider-controls .slick-next',
    activeClass: 'feed__item-active'
  })
  feedSlider.init()

  const player = new VideoPlayer('.showup .play', '.overlay')
  player.init()
})
