/*
 * 把音轨分离
 */
export default function groupTracks(score) {
  const tracks = {}
  // 按行拆分
  const lines = score.split('\n')
  let lastLine = null 
  for (const line of lines) {
    const trackPre = /^<(\S+)>/
    const trackExec = trackPre.exec(line)
    const lyricsPre = /^w:/ // 注：前面的冒号可有可无
    if ( lyricsPre.test(line) ) { // 如果是歌词
      lastLine && lastLine.lyrics.push(line) 
    } 
    else { // 是个音轨
      const name = trackExec ? trackExec[1] : 'A'
      if ( !tracks[name] ) {
        tracks[name] = {
          name,
          lines : []
        }
      } 
      const score = line.replace(trackPre, '') // 去掉前缀
      lastLine = {
        type : 'line',
        value : score,
        lyrics : [],
      }

      tracks[name].lines.push(lastLine)
    }
  }
  return tracks
}

