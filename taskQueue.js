/*
 * 实现一个async的任务队列
 */
const EventEmitter = require('events')

export default function createTaskQueue(){
  /*
   * queue里的元素为无参函数，执行之后得到一个promise。所以其实就是一个async函数
   */
  let queue = []
  const event = 'task'
  const store = new EventEmitter()

  // 直接启动任务队列，永不停止
  ;(async ()=>{
    while(1){
      const task = queue.shift()
      if ( task ) {
        await task()
      } 
      else {
        await new Promise((ok, err)=>{
          store.once(event, ()=>{
            ok()
          })
        })
      }
    }
  })()

  function add(task) {
    queue.push(task)
    store.emit(event)
  }

  return add
}
