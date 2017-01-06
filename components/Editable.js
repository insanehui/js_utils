import React, { PureComponent } from 'react'
import _ from 'lodash'
import KeyCode from '../keycode.js'

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
    multi_line : bool,
    value : string, 
    onDone : func, 
  }

  static defaultProps = {
    is_editing: false,
    multi_line: false,
    value : "",
    onDone : _.noop,
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
      if ( p.multi_line ) {
        E = <textarea {...edit_p} />
        
      } else {
        edit_p = {...edit_p, 
          onKeyDown : this._onKeyDown, 
          // TODO: 这里研究一下如何控制尺寸
        }
        E = <input {...edit_p}/>
      }
    } else {
      E = s.value
    }

    const rest_p = _.omit(p, _.keys(Editable.propTypes))
    if ( p.multi_line ) {
      return <pre {...rest_p}>
        {E}
      </pre>
    } else {
      return <span {...rest_p}>{E}</span> 
    }
  }

  focus(el) {
    if(el)
    {
      console.log("Begin Edit input")
      el.focus() 
      el.select()
    }
    else
    {
      console.log("Destroy input")
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

