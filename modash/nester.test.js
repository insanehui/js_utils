import nester from './nester.js'

it('nester', () => {
  const para = [
    "a(xb)as(d(fs)a)fc"
  ]
  const hope = [
    "a",
    [
      "xb"
    ],
    "as",
    [
      "d",
      [
        "fs"
      ],
      "a"
    ],
    "fc"
  ]
  const fact = nester(...para)
  expect(fact).toEqual(hope)
})
