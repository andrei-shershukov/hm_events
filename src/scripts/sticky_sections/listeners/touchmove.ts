import type StickySections from '..'

export default function touchmove(this: StickySections, event: TouchEvent) {
  if (this.children.length === 0) return
  event.preventDefault()

  let delta_y = -(event.touches[0].clientY - this.last_touch_location)
  this.last_touch_location = event.touches[0].clientY

  const section = this.children[this.current_section_index]
  const section_content = section.querySelector('.content') as HTMLElement
  let scrollable_down = true
  let scrollable_up = true
  if (this.current_section_index === 0) scrollable_up = false
  else if (this.current_section_index === this.children.length - 1) scrollable_down = false
  const scrolling_down = delta_y > 0
  const section_container_top = this.getBoundingClientRect().top
  const section_content_top = section_content.getBoundingClientRect().top - section_container_top
  const section_content_bottom = section_content.getBoundingClientRect().bottom - section_container_top

  if ((scrolling_down && this.clientHeight > section_content_bottom && scrollable_down) || (!scrolling_down && section_content_top > -1 && scrollable_up)) {
    delta_y = delta_y / 20
    if (delta_y > 0 && delta_y < 0.5) delta_y = 0.5 // compensating the rounding down behavior
  }

  this.last_delta_y = delta_y
  this.scrollBy(0, delta_y)
}
