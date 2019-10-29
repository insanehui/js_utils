export default function groupTracks(score) {
  const tracks = {}
  // 按行拆分
  const lines = score.split('\n')
  let lastTrack = null // 保留上一个音轨. 用于收集歌词. 这里沿用了jcx的形式
  for (const line of lines) {
    // 如果是曲谱音轨
    const trackPre = /^<(\S+)>/
    const trackExec = trackPre.exec(line)
    const lyricsPre = /^w:/ // 注：前面的冒号可有可无
    if ( trackExec ) { // 是个音轨
      const name = trackExec[1]
      if ( !tracks[name] ) {
        tracks[name] = {
          name,
          lines : []
        }
      } 
      const score = line.replace(trackPre, '')
      tracks[name].lines.push(score)
      lastTrack = name
    } 
    else if ( lyricsPre.test(line) ) {
      tracks[lastTrack].lines.push(line) 
    } 
  }
  return tracks
}

