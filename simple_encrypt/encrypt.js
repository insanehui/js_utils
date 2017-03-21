/*
 * 网上找的一个简单的加密算法，用于临时应对一些场景，后续再加强这一块
 */
const ts="8ABC7DLO5MN6Z9EFGdeJfghijkHIVrstuvwWSTUXYabclmnopqKPQRxyz01234"

export function encode(n){
  var nl=n.length,t=[],a,b,c,x,m=function(y){t[t.length]=ts.charAt(y)},N=ts.length,N2=N*N,N5=N*5
  for(x=0;x<nl;x++) {
    a=n.charCodeAt(x)
    if(a<N5)m(Math.floor(a/N)),m(a%N)
    else m(Math.floor(a/N2)+5),m(Math.floor(a/N)%N),m(a%N)
  }
  var s=t.join("")
  return String(s.length).length+String(s.length)+s
}

export function decode(n){
  var c=n.charAt(0)*1
  if(isNaN(c))return ""
  c=n.substr(1,c)*1
  if(isNaN(c))return ""
  var nl=n.length,t=[],a,f,b,x=String(c).length+1,m=function(y){return ts.indexOf(n.charAt(y))},N=ts.length
  if(nl!=x+c)return ""
  while(x<nl) {
    a=m(x++)
    if(a<5)f=a*N+m(x)
    else f=(a-5)*N*N+m(x)*N+m(x+=1)
    t[t.length]=String.fromCharCode(f)
    x++
  }
  return t.join("")
}
