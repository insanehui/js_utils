export function border(color = "black") {
  return {
    border: "1px solid " + color,
  }
}
Object.assign(border, border())

export function flex(v) { // 函数用于flex children
  return {
    flex: v
  }
}

Object.assign(flex, { // 对象用于flex容器
  display: "flex"
})

export const ptr = {
  cursor:"pointer",
}

export function bg(v) {
  return {
    background: v,
  }
}    

export function hsl(h, s, l, a){
  // 例：hsl(121, 48, 65) 将可得到 "hsl(121, 48%, 65%)"
  if( typeof(a) === "undefined" )
  {
    return "hsl(" + h + "," + s + "%, " + l + "%)";
  }
  else
  {
    return "hsla(" + h + "," + s + "%, " + l + "%, " + a + ")";
  }
}

export default { border, flex, ptr, bg, hsl, }
