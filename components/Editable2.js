/*
 * 一个新的Editable
 */
import React, { PureComponent } from 'react'

import KeyCode from '../keycode.js'

class Editable extends PureComponent {

  state = {
    is_editing : false,
  }

  static defaultProps = {
    tag : 'span',
  }

  on = ()=>this.setState({ is_editing : true })

  off = ()=>this.setState({ is_editing : false })

  editKeyDown = e=>{
    const {keyCode} = e
    const {ENTER, ESC} = KeyCode

    if (keyCode === ENTER ) {
      this.off()
    }
    else if (keyCode === ESC ) {
      console.log("esc")
      this.off()
    }
  }

  Input = ()=>{
    const {value} = this.props
    const input = {
      defaultValue : value,
      onKeyDown : this.editKeyDown,
      style : {
        fontSize : 'inherit',
        fontFamily : 'inherit',
        border : 'none',
        outline : 'none',
      }
    }
    return <input {...input}/>
  }

  render() {
    const {tag, value, ...forward} = this.props
    const {is_editing} = this.state 
    const Tag = tag

    const props = {
      ...forward,
      onClick : ()=>this.setState({ is_editing : true }),
    }

    return <Tag {...props}>
      {is_editing ? this.Input() : value}
    </Tag>
  }
}

export default Editable

