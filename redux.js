/*
 * redux的一些工具
 * TODO: 后续把react utils里的一些工具函数也迁移到这里来
 */

import { connect as _connect } from 'react-redux'

/*
 * 一个包装版的connect，传入一个对象取代原来的参数的目的是可以使用装饰器
 */
export const connect = ({s, d}) => Cmp => _connect(s, d)(Cmp)


