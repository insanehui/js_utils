/*
 * _.merge的一个更简单粗暴的版本
 */
import _ from 'lodash'

export default (...p)=>{
  return _.merge({}, ...p)
}
