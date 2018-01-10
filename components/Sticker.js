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

  state = {
    // 初始先放到最"右下角"
    right : 0,
    bottom : 0,
  }

  componentDidMount(){
    this.sensor()
  }

  componentWillUnmount(){
    document.body.removeChild(this.el)
    this.el = null
  }

  adjust = ()=>{
    let {right, bottom} = this.state 
    const {by = 1, dy = 0} = this.props

    const me = findDOMNode(this)
    let prev = me
    for(let i = 0; i<by; i++){
      prev = prev.previousSibling
    }

    /*
     * 暂时只考虑右边和下方是否越界
     */

    const myPos = _.pick(this.el.children[0].getBoundingClientRect(), 'left', 'bottom', 'top', 'right')
    const prevPos = _.pick(prev.getBoundingClientRect(), 'left', 'bottom', 'top', 'right')

    /*
     * 算出要往"上"挪的距离，不能为负
     */
    bottom += myPos.top - prevPos.bottom - dy
    bottom = Math.max(0, bottom)

    /*
     * 算出要往"左"挪的距离，同样也不能为负
     */
    right += myPos.left - prevPos.left
    right = Math.max(0, right)

    this.setState({ bottom, right })
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
      by, // 是一个数字，表示向前找第by个兄弟作为参照物，缺省为1，见adjust函数
      /*
       * 默认情况下Sticker会紧贴着其参照物，可以通过设置dy来控制偏移间隔
       */
      dy,
      ...forward} = this.props
    const {right, bottom} = this.state 

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
