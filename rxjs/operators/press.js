/*
 * 实现类似长按操作
 */
import {merge, interval} from 'rxjs'
import {filter, switchMap, map, first} from 'rxjs/operators'

const press = (time = 500) => (a$, b$) => {
  return a$.pipe(switchMap(v=>{
    return merge(
      b$.pipe(map(x=>0)), 
      interval(time).pipe(map(x=>1))
    ).pipe(first())
  }), filter(x=>x))
}

export default press
