/*
 * 简单解析url query string里的参数
 */
import qs from 'query-string'

const para = qs.parse(window.location.search)
export {para}
