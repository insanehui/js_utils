import {parse_svg_transform} from './utils.js'

describe('parse_svg_transform', () => {
  
  it('basic', () => {
    const para = [
    "tr() haha()"
  ]
    const hope = {
    "tr": "tr()",
    "haha": "haha()"
  }
    const fact = parse_svg_transform(...para)
    expect(fact).toEqual(hope)
  })

});
