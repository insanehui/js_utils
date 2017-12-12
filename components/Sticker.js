import React, { PureComponent } from 'react'
import {render, findDOMNode} from 'react-dom'
import _ from 'lodash'

/*
 * 根据参考物的位置来决定自己的位置，并且通过定时的机制来自动跟随
 * 暂时固定为将前一个兄弟作为参照物
 */
export default class Sticker extends PureComponent {

  state = {
    // 初始先放到最"右下角"
    right : 0,
    bottom : 0,
  }

  componentDidMount(){
    this.mounted = true
    // this.sensor()
    this.adjust()
  }

  componentWillUnmount(){
    this.mounted = false
  }

  adjust = ()=>{
    let {right, bottom} = this.state 

    const me = findDOMNode(this)
    const prev = me.previousSibling

    /*
     * 暂时只考虑右边和下方是否越界
     */

    const myPos = _.pick(me.getBoundingClientRect(), 'left', 'bottom', 'top', 'right')
    const prevPos = _.pick(prev.getBoundingClientRect(), 'left', 'bottom', 'top', 'right')

    /*
     * 算出要往"上"挪的距离，不能为负
     */
    const dy = Math.max(0, myPos.top - prevPos.bottom)
    bottom += dy

    /*
     * 算出要往"左"挪的距离，同样也不能为负
     */
    const dx = Math.max(0, myPos.left - prevPos.left)
    right += dx

    this.setState({ bottom, right })

    // console.log('vdiff', dy)
  }

  sensor = ()=>{ // 部署一个sensor监听画布的尺寸信息，以计算出工具栏应放置的位置
    window.requestAnimationFrame(()=>{
      if ( !this.mounted ) {
        return
      } 

      this.sensor()
    })
  }

  render() {
    const {style, ...forward} = this.props
    const {right, bottom} = this.state 

    const props = {
      ...forward,
      style : {
        position : 'fixed',
        right, bottom,
        ...style,
      },
    }
    return <div {...props} />
  }
}

