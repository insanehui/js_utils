import React, { PureComponent } from 'react'
import {findDOMNode, createPortal} from 'react-dom'
import _ from 'lodash'


/*
 * 通过自身的位置和参数物的位置计算出需要偏移的量: my - ref = {dx, dy}
 * my和ref是dom元素
 */
function calcOffset(my, ref) {
  /*
   * 暂时只考虑右边和下方是否越界
   */
  const myPos = _.pick(my.getBoundingClientRect(), 'left', 'bottom', 'top', 'right')
  const prevPos = _.pick(ref.getBoundingClientRect(), 'left', 'bottom', 'top', 'right')

  /*
   * 算出要往"上"挪的距离
   */
  const dy = myPos.top - prevPos.bottom

  /*
   * 算出要往"左"挪的距离
   */
  const dx = myPos.left - prevPos.left

  return {dx, dy}
}

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

  setOffset = offset =>{
    let {right, bottom} = this.state 
    const {dx, dy} = this.props
    right += (offset.dx + dx)
    right = Math.max(0, right)
    bottom += (offset.dy + dy)
    bottom = Math.max(0, bottom)
    this.setState({ right, bottom })
  }

  adjust = ()=>{
    const {by} = this.props

    const me = findDOMNode(this)
    let prev = me
    for(let i = 0; i<by; i++){
      prev = prev.previousSibling
    }

    /*
     * 暂时只考虑右边和下方是否越界
     */
    const offset = calcOffset(this.el.children[0], prev)

    this.setOffset(offset)
  }

  pickPosState = ()=>{
    const {pos} = this.props
    return _.pick(this.state, pos[0], pos[2])
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

