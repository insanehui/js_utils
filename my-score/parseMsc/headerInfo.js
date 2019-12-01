/*
 * 读取简短的header
 */
import _ from 'lodash'

function findTimeSign(pieces) { // 找到拍号，会改变pieces的值
  const timeSign = _.find(pieces, x=>/^\d+\/\d+$/.test(x))
  _.pull(pieces, timeSign)
  return timeSign
}

function line0(line) {
  const pieces = line.split(/\s+/)
  const timeSign = findTimeSign(pieces)

  let res = {}
  if ( timeSign ) {
    res.timeSign = timeSign
  } 
  res.title = pieces

  return res
}
function line1(line) {
  if ( !line ) {
    return null
  } 
  const pieces = line.split(/\s+/)
  return {
    ...(pieces[0] && {artist:pieces[0]}),
    ...(pieces[1] && {info:pieces[1]}),
  }
}


export default function headerInfo(a) {
  const lines = a.split('\n')
  return {
    ...line0(lines[0]),
    ...line1(lines[1])
  }
}
