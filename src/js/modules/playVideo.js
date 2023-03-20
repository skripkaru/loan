export default class VideoPlayer {
  constructor(btns, overlay) {
    this.btns = document.querySelectorAll(btns)
    this.overlay = document.querySelector(overlay)
    this.close = this.overlay.querySelector('.close')
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest('.module__video-item').nextElementSibling

        if(i % 2 === 0) {
          blockedElem.dataset.disabled = 'true'
        }
      } catch (e) {}

      btn.addEventListener('click', () => {
        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').dataset.disabled !== 'true') {
          this.activeBtn = btn

          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex'

            if (this.path !== btn.dataset.url) {
              this.path = btn.dataset.url
              this.player.loadVideoById({'videoId': this.path})
            }
          } else {
            this.path = btn.dataset.url
            this.createPlayer(this.path)
          }
        }
      })
    })
  }

  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: url,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    })
    this.overlay.style.display = 'flex'
  }

  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true)
      const playCircle = blockedElem.querySelector('.play__circle')
      const playText = blockedElem.querySelector('.play__text')

      if(state.data === 0) {
        if (playCircle.classList.contains('closed')) {
          playCircle.classList.remove('closed')
          blockedElem.querySelector('svg').remove()
          playCircle.appendChild(playBtn)
          playText.textContent = 'play video'
          playText.classList.remove('attention')
          blockedElem.style.opacity = '1'
          blockedElem.style.filter = 'none'
          blockedElem.dataset.disabled = 'false'
        }
      }
    } catch (e) {}
  }

  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none'
      this.player.stopVideo()
    })
  }

  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement('script')
      tag.src = "https://www.youtube.com/iframe_api"

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      this.bindTriggers()
      this.bindCloseBtn()
      this.onPlayerStateChange()
    }
  }
}
