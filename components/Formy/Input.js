/*
 * [deprecated] adaptor.js里已经实现
 * formy形式的input
 */
import adaptor from './adaptor.js'

export default adaptor(1, e=>e.target.value)('input')
