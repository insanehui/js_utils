import {links2tree} from './geometry.js'

describe('links2tree', () => {
  it('links2tree', () => {
    const para = [
    [
      [
        "a",
        "b"
      ],
      [
        "c",
        "b"
      ],
      [
        "b",
        "e"
      ],
      [
        "d",
        "e"
      ]
    ]
  ]
    const hope = {
    "key": "e",
    "children": [
      {
        "key": "b",
        "children": [
          {
            "key": "a",
            "children": []
          },
          {
            "key": "c",
            "children": []
          }
        ]
      },
      {
        "key": "d",
        "children": []
      }
    ]
  }
    const fact = links2tree(...para)
    expect(fact).toEqual(hope)
  })
})
