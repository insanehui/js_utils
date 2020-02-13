/*
 * 比如可以用来实现双击事件
 */
import {debounceTime, buffer, filter} from 'rxjs/operators'

const combo = (n, time = 300) => ev$ => {
  const debounce$ = ev$.pipe(debounceTime(time))
  return ev$.pipe(buffer(debounce$), filter(x=>x.length === n))
}

export default combo

