/*
 * 特殊处理muse的bug!
 */
import {fraction} from 'mathjs'

export default function handleBug(duration) {
  const {n,d} = duration
  if ( n === 5 ){
    return [
      fraction(1).div(d),
      fraction(4).div(d),
    ]
  } 
  else if ( n === 7 ){
    return [
      fraction(1).div(d),
      fraction(6).div(d),
    ]
  } 
  else if ( n === 9 ){
    return [
      fraction(1).div(d),
      fraction(8).div(d),
    ]
  } 
  else if (n === 11){
    return [
      fraction(1).div(d),
      fraction(2).div(d),
      fraction(8).div(d),
    ]
  }
  else if (n === 13){
    return [
      fraction(1).div(d),
      fraction(12).div(d),
    ]
  }
  else if ( n===15 ) {
    return [
      fraction(1).div(d),
      fraction(2).div(d),
      fraction(12).div(d),
    ]
  } 
  else {
    return [duration]
  }
}

