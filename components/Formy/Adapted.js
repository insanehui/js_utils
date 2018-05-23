/*
 * 应用了adaptor的一些原生控件
 * TODO: 到底要保留adapted还是Input等一个个散装？
 */
import a from './adaptor.js'

export const Input = a(1, e=>e.target.value)('input')
