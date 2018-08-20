/*
 * 对话框套件
 */
import React, { PureComponent } from 'react'
import S from 'styled-components'
import chd from '../utils/injectChildren.js'
import Draggable from '../Draggable/Basic.js'

export default ()=>{
  const {Provider, Consumer} = React.createContext()
  /*
   * 外包组件
   */
  class Dialog extends PureComponent {
    state = {
      dx : 0, // 用来实现拖动功能
      dy : 0,
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

    render() {
      const {value, onChange, as:As, ...rest} = this.props
      const {dx, dy} = this.state 
      const {move} = this

      return <Provider value={{onChange, value, move}}>
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

  class Close extends React.PureComponent {
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


  return {Dialog, Title, Close}
}
