import {wash,} from '../modash.js'
import fromRegExp, {Line} from './fromRegExp.js'
import contain from './contain.js'

const Word = fromRegExp(/\S+/)
const Blank = fromRegExp(/\s+/)

const S = contain(Line, Word, Blank, Word)

function contain_read(str) {
  const s = new S()
  const res = s.read(str)
  return [res, s]
}

it('普通', () => {
  const para = [
    "aaaa     bbbb\nasdfafsafasf"
  ]
  const hope = [
    "asdfafsafasf",
    {
      "data": "aaaa     bbbb\n",
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
  const fact = contain_read(...para)
  /*
   * 注意，要wash之后再比较
   */
  expect(wash(fact)).toEqual(hope)
})
