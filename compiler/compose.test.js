import {wash,} from '../modash.js'
import fromRegExp, {Line} from './fromRegExp.js'
import compose from './compose.js'

const Word = fromRegExp(/\S+/)
const Blank = fromRegExp(/\s+/)

const S = compose(Word, Blank, Word)

function compose_read(str) {
  const s = new S()
  const res = s.read(str)
  return [res, s]
}

it('compose_read', () => {
  const para = [
  "aaaa     bbbb   cccc dddd"
]
  const hope = [
  "   cccc dddd",
  {
    "data": "aaaa     bbbb",
    "children": [
      {
        "data": "aaaa"
      },
      {
        "data": "     "
      },
      {
        "data": "bbbb"
      }
    ]
  }
]
  const fact = compose_read(...para)
  expect(wash(fact)).toEqual(hope)
})
