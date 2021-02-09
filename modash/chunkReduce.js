/*
 * 将数组分块地reduce。即对数组进行"结块"，把满足一定条件的连续段合并起来
 * 比如下面这个数组：我们对连续的符号相同的元素进行求和，然后构成新的数组：
 * [1,3,5,-1,-3, 6,7,-2,-4] => [8, -4, 13, -6]
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

