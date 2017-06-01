/*
 * 用于freezer.js的一些便利工具
 */

export const rename = (state, a, b)=>{ // 将state的a属性改名为b
  return state.pivot().set({[b] : state[a]}).remove(a)
}
