import deepMap from './deepMap.js'

it('deepMap', () => {
  const para = [
  {
    "1": {
      "2": "hello",
      "3": "world"
    },
    "2": "haha"
  },
  (v, k)=>{
    if ( typeof v === 'string' ) {
      return `[${v}]`
    }
    return v
  },
  ]
  const hope = {
  "1": {
    "2": "[hello]",
    "3": "[world]"
  },
  "2": "[haha]"
  }
  const fact = deepMap(...para)
  expect(fact).toEqual(hope)
})
