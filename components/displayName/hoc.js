/*
 * displayName的包装，用于hoc的设计中
 */
import displayName from './get.js'
import isDev from '../../web/is_dev.js'

export default (Cmp, name, name_prod = name[0]) => {
  name = isDev ? name : name_prod
  return `${displayName(Cmp)}@${name}`
}
