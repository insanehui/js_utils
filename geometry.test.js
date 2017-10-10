import {links2tree} from './geometry.js'

describe('links2tree', () => {
  it('links2tree', () => {
    const para = [
    [
      [
        "bp12",
        "bp"
      ],
      [
        "bp3",
        "bp"
      ],
      [
        "bp4",
        "bp"
      ],
      [
        "bp1",
        "bp"
      ],
      [
        "bp2",
        "bp1"
      ],
      [
        "bp45",
        "bp4"
      ],
      [
        "bp123",
        "bp3"
      ],
      [
        "bp1234",
        "bp45"
      ]
    ]
  ]
    const hope = {
    "key": "bp",
    "children": [
      {
        "key": "bp12",
        "children": []
      },
      {
        "key": "bp3",
        "children": [
          {
            "key": "bp123",
            "children": []
          }
        ]
      },
      {
        "key": "bp4",
        "children": [
          {
            "key": "bp45",
            "children": [
              {
                "key": "bp1234",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "key": "bp1",
        "children": [
          {
            "key": "bp2",
            "children": []
          }
        ]
      }
    ]
  }
    const fact = links2tree(...para)
    expect(fact).toEqual(hope)
  })
})
