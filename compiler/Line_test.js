/*
 * 这里很多工作未完成
 */
import Line from './utils/compiler/Line.js'

// const str = `1 aaaaaa
// bbbb

// cc
// d`
const str = 'aaaaaa'
const line = new Line()
const res = line.read(str)
console.log('res', res)
console.log('line.data', line.toString())

