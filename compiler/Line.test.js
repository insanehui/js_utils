import Line from './Line.js'

function line(str) {
  const line = new Line()
  const res = line.read(str)
  return [line.data, res,]
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
