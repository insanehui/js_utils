/*
 * 在ctg的项目中提炼出来的常用主题样式
 */
import {styler} from './utils.js'
import {hsl} from '../cssobj.js'

const box_gap = 10 // 盒子的间隔

const sbox = {
  backgroundColor: '#fff',
  border: `1px solid ${hsl(220, 4, 87)}`,
  borderRadius : 4,
  margin : `0 ${box_gap/2}px ${box_gap}px ${box_gap/2}px`,
}

const svbox = {
  display : 'flex',
  flexDirection : 'column',
  ...sbox,
}

const shbox = {
  display : 'flex',
  ...sbox,
}

export const box = styler(sbox)

export const vbox = styler(svbox)

export const hbox = styler(shbox)

export const Box = box('div', 'Box')

export const VBox = vbox('div', 'VBox')

export const HBox = hbox('div', 'HBox')

export const BoxHeader = styler({
  display : 'flex',
  alignItems : 'center',
  color : 'white',
  height : '25px',
  lineHeight : '25px',
  padding : '0 3px',
  backgroundColor : '#b0b0b3',
  fontSize : 12,
  fontWeight : 600,
}, 'BoxHeader')()

export const BoxBody = styler({
  flex : 1,
  overflow : 'auto',
}, 'BoxBody')()


