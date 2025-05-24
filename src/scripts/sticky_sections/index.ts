import StickySectionListeners from './listeners'

export default class StickySections extends HTMLElement {
  being_touched: boolean
  last_touch_location: number
  last_delta_y: number
  current_section_index!: number
  current_section_content!: HTMLElement
  constructor() {
    super()
    this.being_touched = false
    this.last_touch_location = 0
    this.last_delta_y = 0
    this.update_current_section_data()
  }

  connectedCallback() {
    this.addEventListener('touchstart', StickySectionListeners.touchstart.bind(this))
    this.addEventListener('touchend', StickySectionListeners.touchend.bind(this))
    this.addEventListener('touchcancel', StickySectionListeners.touchcancel.bind(this))
    this.addEventListener('touchmove', event => StickySectionListeners.touchmove.call(this, event), { passive: false })
  }

  disconnectedCallback() {
    this.removeEventListener('touchstart', StickySectionListeners.touchstart.bind(this))
    this.removeEventListener('touchend', StickySectionListeners.touchend.bind(this))
    this.removeEventListener('touchcancel', StickySectionListeners.touchcancel.bind(this))
    this.removeEventListener('touchmove', event => StickySectionListeners.touchmove.call(this, event))
  }

  reset_scroll_data() {
    this.last_touch_location = 0
    this.last_delta_y = 0
  }

  get_current_section_index(): number {
    const sections = this.children

    for (let index = 0; index < sections.length; index++) {
      const section = sections[index]
      if (section.children[0].getBoundingClientRect().top - this.getBoundingClientRect().top < this.clientHeight / 2 && section.children[section.children.length - 1].getBoundingClientRect().bottom - this.getBoundingClientRect().top > this.clientHeight / 2) return index
    }

    throw new Error('Could not find current section index!')
  }

  update_current_section_data() {
    this.current_section_index = this.get_current_section_index()
    this.current_section_content = this.children[this.current_section_index].querySelector('.content') as HTMLElement
  }

  client_view_is_beyond_section_content_top(): boolean {
    const distance_from_section_container_top_to_section_content_top = this.current_section_content.getBoundingClientRect().top - this.getBoundingClientRect().top
    return distance_from_section_container_top_to_section_content_top > 0
  }

  client_view_is_beyond_section_content_bottom(): boolean {
    const distance_from_section_container_bottom_to_section_content_bottom = this.current_section_content.getBoundingClientRect().bottom - this.getBoundingClientRect().bottom
    return distance_from_section_container_bottom_to_section_content_bottom < 0
  }

  client_view_is_beyond_section_content(): boolean {
    return this.client_view_is_beyond_section_content_top() || this.client_view_is_beyond_section_content_bottom()
  }

  apply_scrolling_momentum() {
    console.log('Applying scrolling momentum...')
    if (this.being_touched === true) return
    if (this.client_view_is_beyond_section_content()) return this.resist_back_to_section_content()

    const delta_y = this.last_delta_y / 1.06 // Decelerate the scrolling momentum
    console.log('Applying scrolling momentum:', delta_y)
    if (delta_y < 0.5 && delta_y > -0.5) return // Stop applying momentum if it's too small

    this.last_delta_y = delta_y
    this.scrollBy(0, delta_y)
    requestAnimationFrame(this.apply_scrolling_momentum.bind(this))
  }

  resist_back_to_section_content_top() {
    console.log('Resisting scroll back to section content top...')
    if (this.being_touched === true) return

    const distance_from_section_container_top_to_section_content_top = this.current_section_content.getBoundingClientRect().top - this.getBoundingClientRect().top
    if (distance_from_section_container_top_to_section_content_top < 0) return

    let delta_y = this.last_delta_y
    if (delta_y < 0) delta_y /= 20 // In case of a high scrolling force, resist without immediately scrolling back
    if (delta_y > -1) {
      delta_y = distance_from_section_container_top_to_section_content_top / 8 // Scroll back to the top of the section content
      if (delta_y < 0.5) delta_y = 0.5 // Compensating the rounding down behavior
    }

    console.log('Resisting scroll back to section content top:', delta_y)
    this.last_delta_y = delta_y
    this.scrollBy(0, delta_y)
    requestAnimationFrame(this.resist_back_to_section_content_top.bind(this))
  }

  resist_back_to_section_content_bottom() {
    console.log('Resisting scroll back to section content bottom...')
    if (this.being_touched === true) return

    const distance_from_section_container_bottom_to_section_content_bottom = this.current_section_content.getBoundingClientRect().bottom - this.getBoundingClientRect().bottom
    if (distance_from_section_container_bottom_to_section_content_bottom > 0) return

    let delta_y = this.last_delta_y
    if (delta_y > 0) delta_y /= 20 // In case of a high scrolling force, resist without immediately scrolling back
    if (delta_y < 1) {
      delta_y = distance_from_section_container_bottom_to_section_content_bottom / 8 // Scroll back to the bottom of the section content
      if (delta_y > -0.5) delta_y = -0.5 // Compensating the rounding down behavior
    }

    console.log('Resisting scroll back to section content bottom:', delta_y)
    this.last_delta_y = delta_y
    this.scrollBy(0, delta_y)
    requestAnimationFrame(this.resist_back_to_section_content_bottom.bind(this))
  }

  resist_back_to_section_content() {
    if (this.client_view_is_beyond_section_content_top()) this.resist_back_to_section_content_top()
    else if (this.client_view_is_beyond_section_content_bottom()) this.resist_back_to_section_content_bottom()
  }
}
