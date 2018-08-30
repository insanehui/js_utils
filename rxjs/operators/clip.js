import {windowToggle, concatAll} from 'rxjs/operators'

export default (s1, s2) => s => {
  const res = windowToggle(s1, ()=>s2)(s)
  return concatAll()(res)
}
