import type StickySections from '..'

export default function touchstart(this: StickySections, event: TouchEvent) {
  this.being_touched = true
  this.reset_scroll_data()
  this.last_touch_location = event.touches[0].clientY
  this.update_current_section_data()
}
