import type StickySections from '..'
import touchcancel from './touchcancel.ts'
import touchend from './touchend.ts'
import touchmove from './touchmove.ts'
import touchstart from './touchstart.ts'

interface StickySectionListeners {
  touchstart: typeof touchstart
  touchend: typeof touchend
  touchcancel: typeof touchcancel
  touchmove: typeof touchmove
}

export default {
  touchstart,
  touchend,
  touchcancel,
  touchmove,
} as StickySectionListeners
