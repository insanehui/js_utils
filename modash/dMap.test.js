import dMap from './dMap.js'

it('dMap', () => {
  const para = [
  {
    "1": {
      "2": "hello",
      "3": "world"
    },
    "2": "haha"
  },
  v=>`[${v}]`,
  v=> typeof v === 'string',
  ]

  const hope = {
  "1": {
    "2": "[hello]",
    "3": "[world]"
  },
  "2": "[haha]"
  }
  const fact = dMap(...para)
  expect(fact).toEqual(hope)
})
