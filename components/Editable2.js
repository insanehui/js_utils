/*
 * 一个新的Editable
 */
import React, { PureComponent } from 'react'

import KeyCode from '../keycode.js'
import {eclose} from '../modash.js'

import domAttrs from '../react-dom-attrs/index.js'

class Editable extends PureComponent {

  state = {
    is_editing : false,
  }

  static defaultProps = {
    tag : 'span',
    autoSelect : true, // 激活输入模式是否自动选择
    onChange : ()=>{},
    trigger : 'onClick',
    blurConfirm : false, // blur时是否确认修改
  }

  on = eclose(()=>this.setState({ is_editing : true }))

  off = ()=>this.setState({ is_editing : false })

  confirm = ()=>{
    this.off()
    const {input} = this
    const {value, onChange} = this.props
    if ( value !== input.value ) {
      onChange(input.value)
    } 
  }

  editKeyDown = e=>{
    e.stopPropagation()
    const {keyCode} = e
    const {ENTER, ESC} = KeyCode

    if (keyCode === ENTER ) {
      this.confirm()
    }
    /*
     * esc键会自动触发blur消息.  
     * 坑：如果chrome启用了vimium插件，ESC键的功能将不起作用
     */
    else if ( keyCode === ESC ) { 
      this.off()
    } 
  }

  input_ref = el=>{ 
    const {autoSelect} = this.props
    if ( el ) {
      this.input=el
      if ( autoSelect ) {
        el.select()
      } 
    } 
  } 

  Input = ()=>{
    const {value, blurConfirm} = this.props
    const input = {
      defaultValue : value,
      style : {
        fontSize : 'inherit',
        fontFamily : 'inherit',
        border : 'none',
        outline : 'none',
      },
      ref : this.input_ref,
      onKeyDown : this.editKeyDown,
      onBlur : blurConfirm ? this.confirm : this.off,
    }
    return <input {...input}/>
  }

  render() {
    const {tag:Tag, value,  
      trigger,
      autoSelect, onChange, blurConfirm, // filter
      ...forward} = this.props
    const {is_editing} = this.state 

    const props = {
      ...domAttrs(forward),
      [trigger] : this.on,
    }

    return <Tag {...props}>
      {is_editing ? this.Input() : 
        <span>
          {value}
        </span>
      }
    </Tag>
  }
}

export default Editable

