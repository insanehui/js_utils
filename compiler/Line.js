import {testify,} from '../modash.js'
import Base from './Base.js'

export default class Line extends Base {
  read = str=>{
    const match = /.*\n?/y.exec(str)[0]
    this.data = match
    return str.slice(match.length)
  }
}
