import { getInputEl } from './dom'

export const focus = {
  inserted (el) {
    el = getInputEl(el)
    el.focus()
  }
}
