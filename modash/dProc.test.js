import dProc from './dProc.js'

xit('dProc', () => {
  const para = [
    {
      "tracks": [
        {
          "name": "guitar",
          "format": "tab",
          "data": {
            "name": "guitar",
            "lines": [
              {
                "type": "line",
                "value": [
                  {
                    "type": "bar",
                    "value": [
                      {
                        "type": "piece",
                        "value": [
                          {
                            "type": "harmony",
                            "value": [
                              "1",
                              "5"
                            ]
                          },
                          [
                            "2"
                          ],
                          [
                            [
                              "3",
                              "4"
                            ]
                          ],
                          "-",
                          "-"
                        ]
                      }
                    ]
                  }
                ],
                "lyrics": []
              }
            ]
          },
          "key": "guitar0",
          "type": "track"
        },
      ]
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
