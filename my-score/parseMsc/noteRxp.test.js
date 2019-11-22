import {reg} from './splitNotes.js'

it('note reg', () => {
  expect(reg.test('a')).toEqual(false)
  expect(reg.test('#3.')).toEqual(true)
  expect(reg.test('#3.\'')).toEqual(false)
  expect(reg.test('-')).toEqual(true)
})
