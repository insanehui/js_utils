/*
 * 配置参数
 * 优先级：命令行 > 配置文件 > 缺省值
 */
import _ from 'lodash'
const argv = require('yargs').argv // 这种动态的node模块，还是使用require更简洁
const path = require('path')

/*
 * 使用方法：const {xx, xxx} = args({..这里是缺省的配置...})
 * 或者是 args(cfg_file_name, defaults)
 */
export function args(a1, a2){

  let defaults, config_file_name
  if ( !a1 ) {
    return argv // 直接返回yargs解析的结果
  } 

  if ( _.isObject(a1) ) {
    defaults = a1
  } 
  else {
    config_file_name = path.resolve(a1) // 这里要转成绝对路径。否则会取相对本文件的路径，而非调用环境的路径
    defaults = a2
  }

  const file_cfg = config_file_name ? require(config_file_name) : null
  return _.defaults(argv, file_cfg, defaults)
}

