import _ from 'lodash'

export default function makeCustomChords(obj) {
  const chords = _.get(obj, 'header.customChords')
  let res = ''
  _.each(chords, (definition, name) => {
    res += `%%gchord ${name}=${definition}\n`
  })
  return res
}

