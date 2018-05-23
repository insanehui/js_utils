/*
 * 应用了adaptor的一些原生控件
 */
import a from './adaptor.js'

export const Input = a(1, e=>e.target.value)('input')
