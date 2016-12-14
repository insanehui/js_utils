export function border(color = "black") {
  return {
    border: "1px solid " + color,
  }
}
Object.assign(border, border())

export function flex() {
  return {
    display: "flex"
  }
}
Object.assign(flex, flex())

export const ptr = {
  cursor:"pointer",
}

export default { border, flex, ptr, }
