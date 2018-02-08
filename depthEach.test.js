import {depthEach} from './depthEach.js'

it('depthEach', () => {

  const a = {
    aa : {
      name : 'guanghui',
      age : 32,
    },
    bb : {
      name : 'tcli',
      age : 18,
      skill : {
        guitar : 'good',
        maths : 'excellent',
      }
    },
    cc : 'abcd',
  }

  const res = []

  depthEach(a, 2, (v, k)=>{
    res.push(k, v)
  })

  expect(res).toEqual([
    ["aa", "name"], 'guanghui',
    ["aa", "age"], 32,
    ["bb", "name"], 'tcli',
    ["bb", "age"], 18,
    ["bb", "skill"], {guitar: "good", maths: "excellent"},
    ["cc", 0], 'a',
    ["cc", 1], 'b',
    ["cc", 2], 'c',
    ["cc", 3], 'd',
  ])

})
