import Rx from 'rxjs/Rx'

// 为rx编写一个用于鼠标拖动的"插件"
Rx.Observable.prototype.mouseDxy = function() {
  let input = this
  return input.pairwise().map(([e1, e2])=>{ 
    const X = e2.clientX
    const Y = e2.clientY
    return {
      x : X - e1.clientX,
      y : Y - e1.clientY,
      X,
      Y,
    }
  })
}

