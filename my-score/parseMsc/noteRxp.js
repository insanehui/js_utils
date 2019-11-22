/*
 * 音符的正则表达式
 */
// sign, note, octave, string, tie
const reg = /(#|b)?(\d)(['.]*)(@[1-6]?)?|(-)|\^|v/
// const reg = /(#|b)?(\d)(['.]*)|(-)|\^/
export default reg


