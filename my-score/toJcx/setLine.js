export default function setLine(line) {
  let {value, lyrics} = line
  value = value.join('')
  return [value, ...lyrics].join('\n')
}
