import MainSlider from "./modules/slider/mainSlider";
import MiniSlider from "./modules/slider/miniSlider";
import Difference from "./modules/difference";
import VideoPlayer from "./modules/playVideo";
import Form from "./modules/form";

window.addEventListener('DOMContentLoaded', () => {
  const slider = new MainSlider({
    container: '.page',
    btns: '.next'
  })
  slider.render()

  const moduleSlider = new MainSlider({
    container: '.moduleapp',
    btns: '.next'
  })
  moduleSlider.render()

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

  new Difference('.officerold', '.officer__card-item').init()
  new Difference('.officernew', '.officer__card-item').init()

  new VideoPlayer('.showup .play', '.overlay').init()
  new VideoPlayer('.module__video-item .play', '.overlay').init()

  new Form('form').init()
})
