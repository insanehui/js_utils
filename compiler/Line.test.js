import {Line} from './fromRegExp.js'
// import Line from './Line.js'

function line(str) {
  const l = new Line()
  const res = l.read(str)
  return [l.data, res,]
}

it('普通', () => {
  const para = [
    "abcde"
  ]
  const hope = [
    "abcde",
    ""
  ]
  const fact = line(...para)
  expect(fact).toEqual(hope)
})

it('多行', () => {
  const para = [
    "1 aaaaaa\nbbbb\n\ncc\nd"
  ]
  const hope = [
    "1 aaaaaa\n",
    "bbbb\n\ncc\nd"
  ]
  const fact = line(...para)
  expect(fact).toEqual(hope)
})

it('空行', () => {
  const para = [
    "\n1 aaaaaa\nbbbb\n\ncc\nd"
  ]
  const hope = [
    "\n",
    "1 aaaaaa\nbbbb\n\ncc\nd"
  ]
  const fact = line(...para)
  expect(fact).toEqual(hope)
})
