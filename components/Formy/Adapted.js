/*
 * 应用了adaptor的一些原生控件
 */
import a, {advanced as x} from './adaptor.js'

export const Input = a(1, e=>e.target.value)('input')
export const Inputx = x(1, e=>([e.target.value, e.target.validity.valid]))('input')
