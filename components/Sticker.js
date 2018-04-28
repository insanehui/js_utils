import React, { PureComponent } from 'react'
import {findDOMNode, createPortal} from 'react-dom'
import _ from 'lodash'

/*
 * 根据参考物的位置来决定自己的位置，并且通过定时的机制来自动跟随
 * 暂时固定为将同级的兄长作为参照物
 *
 * 为什么要用到portal？因为如果不用portal的话某些情况下无法摆脱zindex的限制，使得sticker在显示时无法盖住其后面的一些元素
 */
export default class Sticker extends PureComponent {

  constructor(p) {
    super(p)

    const el = document.createElement('div')
    document.body.appendChild(el)
    this.el = el
  }

  get hSide(){
    const {pos} = this.props
    return pos[0]
  }

  get vSide(){
    const {pos} = this.props
    return pos[2]
  }

  get hTarget(){
    const {pos} = this.props
    return pos[1]
  }

  get vTarget(){
    const {pos} = this.props
    return pos[3]
  }

  get portal(){
    return this.el.children[0]
  }

  get prev(){
    const {by} = this.props

    const me = findDOMNode(this)
    let ret = me
    for(let i = 0; i<by; i++){
      ret = ret.previousSibling
    }
    return ret
  }

  // 计算需要移的偏移量
  get offset(){
    const {portal, prev, hSide, hTarget, vSide, vTarget} = this
    const myPos = _.pick(portal.getBoundingClientRect(), 'left', 'bottom', 'top', 'right')
    const prevPos = _.pick(prev.getBoundingClientRect(), 'left', 'bottom', 'top', 'right')

    let dy, dx

    if ( hSide === 'right' ) {
      dx = myPos.left - prevPos[hTarget]
    } 
    else if(hSide === 'left') {
      dx = prevPos[hTarget] - myPos.right 
    }

    if ( vSide === 'bottom' ) {
      dy = myPos.top - prevPos[vTarget]
    } 
    else if ( vSide === 'top' ) {
      dy = prevPos[vTarget] - myPos.bottom
    } 

    return {dx, dy}
  }

  state = {
    /*
     * 初始的位置参数。最终只会取其中两个参数来确定位置，取决于pos属性
     */
    right : 0,
    bottom : 0,
    left : 0,
    top : 0,
  }

  static defaultProps = {
    // 是一个数字，表示向前找第by个兄弟作为参照物，缺省为1，见adjust函数
    by : 1,
    dx : 0,
    dy : 0,
    /*
     * 这里有两个关键dom元素：一个是在原dom树上的占位元素。因为占了位置才方便确定参照物
     * 另外就是portal的容器元素，为了代码上的便利，容器元素不直接取portal的根元素。而是再创建一个div
     */
    as : 'div', // 表示sticker的占位元素
    style : null, // 给portal的容器注入的样式
    /*
     * sticker的位置参数. TODO: 后续详细解释其含义
     */
    pos : ['right', 'left', 'bottom', 'bottom'],
  }

  componentDidMount(){
    this.sensor()
  }

  componentWillUnmount(){
    document.body.removeChild(this.el)
    this.el = null
  }

  adjust = () =>{
    const {dx, dy} = this.props
    const {hSide, vSide, offset} = this
    let {[hSide]:h, [vSide]:v} = this.state 

    h += (offset.dx + dx)
    h = Math.max(0, h)
    v += (offset.dy + dy)
    v = Math.max(0, v)
    this.setState({ [hSide]:h, [vSide]:v })
  }

  pickPosState = ()=>{
    return _.pick(this.state, this.hSide, this.vSide)
  }

  sensor = ()=>{ // 部署一个sensor监听画布的尺寸信息，以计算出工具栏应放置的位置
    window.requestAnimationFrame(()=>{
      if ( !this.el ) {
        return
      } 
      this.adjust()
      this.sensor()
    })
  }

  render() {
    const {children, as:As, style} = this.props

    const props = {
      style : {
        position : 'fixed',
        ...this.pickPosState(),
        ...style,
      },
    }

    return <As>
      {createPortal(<div {...props}>{children}</div>, this.el)}
    </As>
  }
}

