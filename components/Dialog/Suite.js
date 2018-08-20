/*
 * 对话框套件
 */
import React, { PureComponent } from 'react'
import S from 'styled-components'
import chd from '../utils/injectChildren.js'
import Draggable from '../Draggable/Basic.js'

const Close = chd('x')(S.div`
    background : transparent;
`)

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
      // onClose : x=>x,
    }

    move = ({x, y})=>{
      let {dx, dy} = this.state 
      dx+=x
      dy+=y
      this.setState({ dx, dy })
    }

    render() {
      const {onClose, as:As} = this.props
      const {dx, dy} = this.state 
      const {move} = this

      /*
       * 坑：这里不能用_.merge来合并react的组件属性，会丢失数据，比如key。所以只能人肉合并
       */
      return <Provider value={{onClose, move}}>
        <As style={{ transform : `translate(${dx}px, ${dy}px)`, }} {...this.props} />
      </Provider>
    }
  }

  class Title extends PureComponent {
    static defaultProps = {
      as : 'div',
    }

    render() {
      const {children, as:As, ...rest} = this.props
      return <Consumer>
        {({move, onClose})=>{
          return <Draggable onDragging={move}>
            <As {...rest}>
              <div style={{flex:1}} >
                {children}
              </div>
              {onClose && <Close onClick={()=>onClose(null)}/>}
            </As>
          </Draggable>
        }}
      </Consumer>
    }
  }

  return {Dialog, Title}
}
