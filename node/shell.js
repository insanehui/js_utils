import {exec} from 'shelljs'

export function tryExec(cmd, msg) {
  const {code} = exec(cmd)
  if ( code !== 0 ) {
    throw new Error(msg)
  } 
}
