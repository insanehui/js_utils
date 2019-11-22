import _ from 'lodash'

let gNote // 全局变量，用来保存上一个音符

// 处理跨小节连音线
export default function setTiedNote(note) {
  if ( note.note !== '-' ) { 
    gNote = _.omit(note, 'duration')
    return note
  } 
  return {
    ...note,
    ...gNote,
    tied : true,
  }
}

