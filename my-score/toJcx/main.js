import makeHeader from './header.js'
import makeCustomChords from './customChords.js'
import makeTrackMeta from './trackMeta.js'
import makeTracks from './tracks.js'

export default function make(obj) {
  const header = makeHeader(obj)
  const customChords = makeCustomChords(obj)
  const trackMeta = makeTrackMeta(obj)
  const tracks = makeTracks(obj)

  return `%MUSE2
${header}
${customChords}
${trackMeta}
${tracks}
  `
}
