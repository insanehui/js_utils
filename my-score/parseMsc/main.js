import _ from 'lodash'
import {compose as C} from 'ramda'

import process from '../../modash/deepProcess.js'
// import copyJson from '../../debug/copyJson.js'

import parseHeader from './header.js'
import groupTracks from './groupTracks.js'
import splitBars from './splitBars.js'
import parseBrackets from './parseBrackets.js'
import parseHarmony from './parseHarmony.js'

import expandMacros from './expandMacros.js'
import splitChords from './splitChords.js'
import splitNotes from './splitNotes.js'
import parseNote from './parseNote.js'
import setTiedNote from './setTiedNote.js'
import attachEffect from './attachEffect.js'
import setDuration from './setDuration.js'

import collectDuration from './collectDuration.js'

import {isValueOf, back, and, isPCValue} from '../predicates.js'
import compact from './compact.js'

const isNoteText = and(C(_.isArray, back()),  _.isString)

export default function parse(file) {
  let [header, t] = parseHeader(file)

  /*
   * 把所有宏都替换，支持深度
   */
  t = expandMacros(t, header.patterns)

  /*
   * 把谱面的音轨剥离，按行分开（包括歌词）
   */
  t = groupTracks(t)

  /*
   * 分离小节
   */
  t = splitBars(t)

  /*
   * 分离和弦
   */
  t = splitChords(t)

  /*
   * 解析( )
   */
  t = parseBrackets(t)

  /*
   * 解析[ ]
   */
  t = parseHarmony(t)

  t = process(t, _.flatten, isPCValue)

  /*
   * 分离单个音符
   */
  t = splitNotes(t)

  t = compact(t)

  /*
   * 将音符字符串解析成结构
   */
  t = process(t, parseNote, isValueOf('piece'), isNoteText)
  t = process(t, parseNote, isValueOf('chord'), and(isNoteText, x=>_.includes(x, '@')))

  /*
   * 处理一些吉他技巧效果
   */
  t = attachEffect(t)

  /*
   * 生成chordNote
   */
  t = process(t, x=>{
    return {
      type : 'chordNote',
      note : x,
    }
  }, isValueOf('chord'), isNoteText)

  t = setDuration(t)

  // 计算完时值之后，可以完全flatten了
  t = process(t, _.flattenDeep, isPCValue)

  // 合并时值
  t = collectDuration(t)

  // 设置跨小节的连音线
  t = process(t, setTiedNote, x=>(x.type === 'note'))

  return {
    header,
    tracks : t,
  }
}
