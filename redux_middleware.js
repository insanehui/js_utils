/**
 * 支持将 promise 作为action被发起
 * 如果这个 promise 被 resolved，他的结果将被作为 action 发起。
 * 这个 promise 会被 `dispatch` 返回，因此调用者可以处理 rejection。
 */
export const promise = store => next => action => {

  // 普通的action，直接放过
  if (typeof action.then !== 'function') {
    return next(action)
  }

  // 如果action是一个promise或者是thenable
  // 那就先then它，将结果重新作为一个action来dispatch
  // !注：这里需要依赖 store.dispatch，而不是next
  // 如果是用next的话，仅仅是本次生效，而使用store.dispatch，则可以产生递归的效果
  return Promise.resolve(action).then(store.dispatch)
}

