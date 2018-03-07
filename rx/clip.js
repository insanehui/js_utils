/*
 * 用两个流来剪切一个流
 */
import Rx from 'rxjs/Rx'

Rx.Observable.prototype.clip = function($1, $2) {
  const res$ = this.windowToggle($1, ()=>$2)
  return res$.concatAll()
}

