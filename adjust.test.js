import {adjust} from './adjust.js'

function check(i) {
  return i-8.5
}

describe('adjust', () => {
  it('adjust', async () => {
    const r = await adjust(check, 99999)
    expect(r).toBe(8)
  })
})
