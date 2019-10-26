/*
 * 解析msc的header
 */
import _ from 'lodash'
import yaml from 'js-yaml'

export default function parseHeader(a) {
  const header = yaml.load(a)
  const {tracks} = header
  header.tracksObj = _.mapKeys(tracks, v=>v.name)
  return header
}

