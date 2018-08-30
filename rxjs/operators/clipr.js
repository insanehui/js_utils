import {startWith} from 'rxjs/operators'
import clip from './clip.js'

export default (s1, s2) => s => {
  return clip(startWith(1)(s2), s1)(s)
}
