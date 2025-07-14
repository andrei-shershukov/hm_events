import type StickySections from '..'

export default function touchcancel(this: StickySections) {
  this.being_touched = false
  this.apply_scrolling_momentum()
}
