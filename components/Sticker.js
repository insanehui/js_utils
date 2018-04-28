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
    // 初始先放到最"右下角"
    right : 0,
    bottom : 0,
  }

  static defaultProps = {
    // 是一个数字，表示向前找第by个兄弟作为参照物，缺省为1，见adjust函数
    by : 1,
    dx : 0,
    dy : 0,
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
    const {style, 
      by, 
      /*
       * sticker所在的方位，缺省在下方
       */
      side = 'bottom',
      ...forward} = this.props
    const {right, bottom} = this.state 

    /*
     * 注：这种通过forward的方式传属性的方式尽量还是不要采用了
     * 而且style的合并也晦涩，增加逻辑负担
     * TODO: 后续有时间将其改掉
     */
    const props = {
      ...forward,
      style : {
        position : 'fixed',
        right, bottom,
        ...style,
      },
    }

    return <div>
      {createPortal(<div {...props} />, this.el)}
    </div>
  }
}

