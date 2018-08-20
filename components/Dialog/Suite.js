/*
 * 对话框套件
 */
import React, { PureComponent } from 'react'
import S from 'styled-components'
import chd from '../utils/injectChildren.js'
import Draggable from '../Draggable/Basic.js'
import Form from '../Formy/Form.js'

export default ()=>{
  const {Provider, Consumer} = React.createContext()
  /*
   * 外包组件
   */
  class Main extends PureComponent {
    state = {
      dx : 0, // 用来实现拖动功能
      dy : 0,
      value : this.props.value,
    }

    static defaultProps = {
      as : 'div',
      value : undefined,
      onChange : ()=>{},
      // onClose : x=>x,
    }

    move = ({x, y})=>{
      let {dx, dy} = this.state 
      dx+=x
      dy+=y
      this.setState({ dx, dy })
    }

    onChange = value=>{
      this.setState({ value })
    }

    render() {
      const {value, onChange, as:As, ...rest} = this.props
      const {dx, dy, value:_value,} = this.state 
      const {move, onChange:_onChange} = this

      return <Provider value={{onChange, value, _value, _onChange, move, }}>
        <As style={{ transform : `translate(${dx}px, ${dy}px)`, }} {...rest} />
      </Provider>
    }
  }

  class Title extends PureComponent {
    static defaultProps = {
      as : 'div',
    }

    render() {
      const {as:As, ...rest} = this.props
      return <Consumer>
        {({move})=>{
          return <Draggable onDragging={move}>
            <As {...rest} />
          </Draggable>
        }}
      </Consumer>
    }
  }

  class Content extends React.PureComponent {
    static defaultProps = {
      as : Form,
    }
    render() {
      const {as:As, ...rest} = this.props
      return <Consumer>
        {({_value, _onChange})=>{
          return <As value={_value} onChange={_onChange} {...rest} />
        }}
      </Consumer>
    }
  }

  class Confirm extends React.PureComponent {
    static defaultProps = {
      as : 'div',
    }
    render() {
      const {as:As, ...rest} = this.props
      return <Consumer>
        {({_value, onChange})=>{
          return <As onClick={()=>onChange(_value)} {...rest} />
        }}
      </Consumer>
    }
  }

  class Cancel extends React.PureComponent {
    static defaultProps = {
      as : 'div',
    }
    render() {
      const {as:As, ...rest} = this.props
      return <Consumer>
        {({onChange})=>{
          return <As onClick={()=>onChange(null)} {...rest} />
        }}
      </Consumer>
    }
  }

  return {Main, Title, Cancel, Confirm, Content}
}
