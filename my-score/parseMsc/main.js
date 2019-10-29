/*
 * 整体解析music文件
 */
import parseHeader from './header.js'
import groupTracks from './groupTracks.js'

export default function parse(file) {
  // 先分成两部分，按 ==========（三个以上） 区分
  const [a, b] = file.split(/===+\n/)
  const header = parseHeader(a)
  const tracks = groupTracks(b)
  return {
    header,
    tracks,
  }
}
