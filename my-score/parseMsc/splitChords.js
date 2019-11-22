/*
 * 分离和弦，和弦以 "Em" 这种形式来表示
 */
import _ from 'lodash'

import deepMap from '../../modash/deepMap.js'
import splitMap from '../../modash/splitMap.js'

export default function splitChords(obj) {
  return deepMap(obj, v=>{
    const type = _.get(v, 'type')
    if (type !== 'bar') {
      return v
    } 

    const {value} = v
    return {
      ...v,
      value : splitMap(value, /("\w+")|=/, (a,b)=>{
        if ( !a || a === '=' ) {
          return {
            type : 'piece',
            value : b,
          }
        } 
        return {
          type : 'chord',
          chord : a,
          value : b,
        }
      })
    }
  })
}
