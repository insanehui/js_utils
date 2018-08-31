import _ from 'lodash'

const input = document.createElement('input')
input.setAttribute('type', 'file')

export function fileDialog() {
  return new Promise((ok)=>{
    input.dispatchEvent(new MouseEvent('click'))
    input.onchange = e=>{
      const file = _.get(e, 'target.files.0')
      // 重置
      e.target.type = ''
      e.target.type = 'file'
      ok(file)
    }
  })
}

export function readFile(file, readAs = 'text') {
  return new Promise((ok, err)=>{
    const reader = new FileReader()
    reader.onload = ev=>{
      ok(ev.target.result)
    }
    reader[`readAs${_.capitalize(readAs)}`](file)
  })
}

export async function readFileDialog(readAs) {
  const file = await fileDialog()
  return readFile(file, readAs)
}

export default readFileDialog
