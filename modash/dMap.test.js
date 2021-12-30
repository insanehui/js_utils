import _ from 'lodash'
import dMap from './dMap.js'

it('基本', () => {
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

it('收集keys', () => {
  const para = [
  {
    "a": {
      "x": "hello",
      "y": "world"
    },
    "b": "haha"
  },
  (v,k)=>`${k.join('.')}v`,
  _.isString,
  ]

  const hope = {
    "a": {
      "x": "a.xv",
      "y": "a.yv"
    },
    "b": "bv"
  }
  const fact = dMap(...para)
  expect(fact).toEqual(hope)
})

