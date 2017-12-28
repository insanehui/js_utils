/*
 * 能自动伸缩的textarea
 * 坑：由于设计上的原因，不能通过className来设置其样式，后续想办法解决
 */

import React, { PureComponent } from 'react'
import _ from 'lodash'
import css from 'dom-css'

import {merge_props as P} from './utils.js'

class Textarea extends PureComponent {

  state = {} // state用来存储动态的style

  update_shadow = np =>{ // 根据主输入框value的变化，更新shadow
    let {value} = np
    const {style} = this.props
    const {shadow, textarea} = this

    // shadow会沿用textarea一些关键的样式配置
    let keys = [
      'fontSize', 'fontFamily', 'whiteSpace', 'wordWrap', 
      'boxSizing', 
      'borderTopStyle', 'borderLeftStyle', 'borderRightStyle', 'borderBottomStyle',
      'borderTopColor', 'borderLeftColor', 'borderRightColor', 'borderBottomColor',
      'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom',
      /*
       * 不需要取 'minWidth', 'maxWidth' ，因为这些属性只支持绝对值，如果传calc这样的表达式，将不能正常工作
       */
    ]

    /*
     * 如果外面指定了width，则表示width可以是一个表达式（如calc），因此需要取得其真正值
     * 如果外面没有指定width，则表示textarea的width需要通过参考获得，因此不能在开始就将width定死
     */
    if ( _.has(style, 'width') ) { keys.push('width') } 

    const text_style = _.pick(window.getComputedStyle(textarea), keys)

    css(shadow, {
      ...style,
      ...text_style,

      position: 'absolute',
      top: -9999,

      // 以下是临时测试
      // border : `1px solid gray`,
      // top : 300,
      // left : 300,
      // backgroundColor : 'lightblue',
    })

    value = value || ''
    if ( value.endsWith('\n') || !value ) { // 如果末尾有空行，或者为空
      value += ' ' // 多加一个空格
    } 

    shadow.innerHTML = value
    const shadow_style = window.getComputedStyle(shadow)
    // console.log("computed", shadow_style)
    const {height, width} = shadow_style
    this.setState({ height, width })
  }

  componentDidMount(){
    // 部署一个辅助div
    const shadow = document.createElement('div')
    document.body.appendChild(shadow)
    this.shadow = shadow

    // 更新
    this.update_shadow(this.props)
  }

  componentWillUnmount(){
    document.body.removeChild(this.shadow)
  }

  componentWillReceiveProps(np){
    if ( np.value === this.props.value ) {
      return
    } 
    this.update_shadow(np)
  }

  ref = el=>{ this.textarea = el }

  get value(){
    return _.get(this, ['textarea', 'value'])
  }

  focus = ()=>{ // focus方法
    let {textarea} = this
    textarea && textarea.focus()
  }

  blur = ()=>{ // blur方法
    let {textarea} = this
    textarea && textarea.blur()
  }

  render() {
    const props = P({
      style:{
        ...this.state,
        overflow : 'hidden',
        resize : 'none',
      },
      spellCheck : false,
    }, this.props)
    return <textarea {...props} ref={this.ref}/>
  }
}

export default Textarea

