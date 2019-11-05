import splitMap from './splitMap.js'

it('splitMap', () => {
  const para = [
  "\"Em\"这是开头\"G\"这是第一句\"C\"这是第二句",
  /"\w+"/,
]
  const hope = [
  [
    "\"Em\"",
    "这是开头"
  ],
  [
    "\"G\"",
    "这是第一句"
  ],
  [
    "\"C\"",
    "这是第二句"
  ]
]
  const fact = splitMap(...para)
  expect(fact).toEqual(hope)
})
