/*
 * 用来监听窗口的滚动事件的组件，传入一个参数onScroll
 */
import { PureComponent } from 'react'

export default class ScrollSensor extends PureComponent {
  componentDidMount(){
    const {onScroll} = this.props
    window.addEventListener('scroll', ()=>{
      onScroll(window.scrollY)
    })
  }

  componentWillUnmount(){
    const {onScroll} = this.props
    window.removeEventListener('scroll', onScroll)
  }

  render() {
    return null
  }
}

