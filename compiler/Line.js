import Base from './Base.js'

export default class Line extends Base {
  read = str=>{
    /*
     * 这里有个陷阱，正好歪打正着：如果str里没有包含换行，则会consume掉整个字符串
     * 因为下面的正则没有匹配到，所以str原样返回
     */
    const match = str.replace(/(^.*\n)[^]*/, '$1')
    this.data = match
    return str.slice(match.length)
  }
}
