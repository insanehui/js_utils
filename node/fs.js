/*
 * fs的一些工具
 */
const fs = require('fs-extra')

export const stat = (()=>{
  const lib = {}
  const methods = [
    'isFile', 'isDirectory',
  ]

  methods.map(name => {
    lib[name] = (path, ...para) => fs.statSync(path)[name](...para)
  })

  return lib
})()
