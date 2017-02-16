/*
 * 可编辑的文本显示
 * TODO: 增加支持“非空”选项，空值为无效的修改
 */
import React, { PureComponent } from 'react'
import _ from 'lodash'
import KeyCode from '../keycode.js'
import {pre, border, inblock, rel, abs, sz} from '../cssobj.js'

const { bool, string, func  } = React.PropTypes

class Editable extends PureComponent {
  constructor(p) {
    super(p)

    this.On = this.On.bind(this) // 导出方法

    this.focus = this.focus.bind(this)
    this._done = this._done.bind(this)
    this._onChange = this._onChange.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
    this._onClick = this._onClick.bind(this)

    this.state = {...p}
  }

  static propTypes = {
    is_editing : bool, 
    multiline : bool,
    value : string, 
    onDone : func, // (string)
  }

  static defaultProps = {
    is_editing: false,
    multiline: false,
    value : "",
    onDone : _.noop,
  }

  _size = { // 用来缓存尺寸信息
    width:0,
    height:0,
  }

  updateSize() {
    const s = this.state 
    if ( !s.is_editing ) { // 更新一下尺寸
      const r = this.refs
      const rect = r.edit.getBoundingClientRect()
      const height = s.multiline ? rect.height : r.ruler.offsetHeight
      this._size = {
        width : rect.width, 
        height, 
      }
    } 
  }

  componentDidMount(){
    const s = this.state 
    this.updateSize()
    if ( !s.is_editing && !s.multiline ) {
      this.forceUpdate()
    } 
  }

  componentDidUpdate(pp, ps, pc){
    this.updateSize()
  }

  componentWillReceiveProps(np) {
    this.setState({ ...np })
  }

  render() {
    const s = this.state 
    const p = this.props 
    let E

    let edit_p = {
      onBlur : this._done,
      onChange : this._onChange,
      onClick : this._onClick,
      value : s.value,
      ref : this.focus,
    }

    if( s.is_editing ) {
      if ( p.multiline ) {
        E = <textarea {...edit_p} 
          style={{...this._size}} 
          />
        
      } else {
        E = <input {...edit_p}
          onKeyDown={this._onKeyDown}
          style={{...this._size}} 
          />
      }
    } else {
      E = s.value
    }

    const main_p = { 
      // 如果外部没有传入onClick，缺省使用一个
      onClick : this.On,

      ..._.omit(p, 'style', ..._.keys(Editable.propTypes)) 
    }

    const st = { // 预置的样式
      ...border,
      ...pre,
      ...(s.multiline? null : { // 单行文本框默认样式
        ...inblock,
        ...sz(80, this._size.height), // 缺省给个80的宽度。为什么不缺省为100%是因为这样更接近缺省的input的行为
        ...rel,
      })
    }

    return <div {...main_p} style={{...st, ...p.style}} 
      ref='edit'
    >
      {E}
      {/*隐藏，用于当初始值为空时，占着位置，以测量出高度，然后再触发一次render，更新父组件的高度*/}
      {s.multiline ? null : <div style={{...abs, top:0, left:0, visibility:'hidden'}} ref='ruler'>0</div>}
    </div>
  }

  focus(el) {
    if(el) {
      // console.log("Begin Edit input")
      el.focus() 
      const s = this.state 
      if ( !s.multiline ) { // 单行文本，缺省选中
        el.select()
      } // 如果是多行文本，先缺省不选中
      // TODO: 后续可让用户来配置
    }
    else {
      // console.log("Destroy input")
    }
  }

  On() {
    let s = this.state
    this._value = s.value // 缓存修改之前的value
    this.setState({ is_editing: true })
  }

  _done(is_valid) {
    let s = this.state

    // 如果确认修改，并且新值不等于原值
    if( is_valid !== false && s.value !== this._value )
    {
      // 才触发回调
      this.props.onDone( s.value )
    }
    else
    {
      this.setState({ value: this._value })
      delete this._value
    }
    this.setState({ is_editing: false })
  }

  _onChange(/*object*/ event) {
    this.setState({ value: event.target.value })
  }

  _onKeyDown(event) {
    if (event.keyCode === KeyCode.ENTER ) 
    {
      this._done()
    }
    else if (event.keyCode === KeyCode.ESC ) 
    {
      this._done(false)
    }
  }

  _onClick(e) {
    e.stopPropagation()
  }
}

export default Editable

