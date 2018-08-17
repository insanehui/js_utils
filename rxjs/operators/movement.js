/*
 * 鼠标移动的增量
 */
import {pairwise, pairwise} from 'rxjs/operators'

export default source => {
  return source.pipe(
    pairwise(),
    map(([e1, e2])=>{ 
      const X = e2.screenX
      const Y = e2.screenY
      return {
        x : X - e1.screenX,
        y : Y - e1.screenY,
        X,
        Y,
      }
    })
  )
}
