/*
 * 用来判断浏览器类型的工具
 */

export function is_ie(){ // 是否为ie
  /*
   * 依赖一些潜规则，在需要精准判断的场合不适合使用
   */
  return !!navigator.msLaunchUri
}
