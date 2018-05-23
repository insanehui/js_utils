/*
 * 应用了adaptor的一些原生控件
 */
import a from './adaptor.js'

/*
 * 之所以用x||''，是为了防止出现从controlled到uncontrolled间切换的警告
 */
export const Input = a(x=>x||'', e=>e.target.value)('input')
