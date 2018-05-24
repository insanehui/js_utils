/*
 * _.bind的一个更简单粗暴的版本
 */
import _ from 'lodash'

/*
 * 由于是两个bind，因此要预传两个参数
 */
export default _.bind(_.bind, null, _, null)
