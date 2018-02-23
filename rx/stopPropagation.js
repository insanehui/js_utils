import Rx from 'rxjs/Rx'

Rx.Observable.prototype.stop = function() {
  return this.map(e=>{ 
    e.stopPropagation()
    return e
  })
}

