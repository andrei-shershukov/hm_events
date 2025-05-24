import type StickySections from '..'

export default function touchend(this: StickySections) {
  this.being_touched = false
  this.apply_scrolling_momentum()
}
