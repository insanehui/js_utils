/*
 * 将数组分块地reduce
 */
export default function chunkReduce(arr, fn, con = fn) {
  const res = []
  let sum
  for (const item of arr) {
    if ( sum === undefined ) {
      sum = item
      continue
    } 
    if ( !con(sum, item) ) {
      res.push(sum)
      sum = item
      continue
    } 
    sum = fn(sum, item)
  }
  if ( sum !== undefined ) {
    res.push(sum)
  } 
  return res
}

// const res = chunkReduce([1,3,5,-1,-3, 6,7,-2,-4], (a,b)=>a+b, (a,b)=>a*b>0)
// console.log('res', res)

