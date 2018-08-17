/*
 * 取window event，手动实现基于iframe的bubbling
 */
import _ from 'lodash'
import {fromEvent, merge} from 'rxjs'

/*
 * TODO: 等有必要的时候，再改成递归
 */
function mouseEvent(win, event) {
  const events = [..._.map(win), win].map(f => fromEvent(f, event))
  return merge.apply(null, events)
}

export default event=>mouseEvent(window, event)
