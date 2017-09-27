import Rx from 'rxjs/Rx'

// 为rx编写一个用于鼠标拖动的"插件"
Rx.Observable.prototype.mouseDxy = function() {
  let input = this
  return input.pairwise().map(([e1, e2])=>({
    x : e2.clientX - e1.clientX,
    y : e2.clientY - e1.clientY,
  }))
}

