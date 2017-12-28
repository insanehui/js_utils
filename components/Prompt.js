/*
 * 用react实现的window.prompt async版本
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import Modal from 'react-modal'
import {promisify} from '../modash.js'

// 先占位一个放置modal的dom元素
const dialog_div = document.createElement('div')
document.body.appendChild(dialog_div)

/*
 * 接收一个controlled的编辑器（value, onChange(支持v或者是event)）
 */
class Prompt extends PureComponent {

  constructor(p) {
    super(p)
    const {isOpen} = p
    this.state = {isOpen}
  }

  componentWillReceiveProps(np) {
    const {isOpen} = np
    this.setState({isOpen})
  }

  close = ()=>{
    this.setState({ isOpen : false })
  }

  render() {
    const {isOpen} = this.state
    const {onDone, value, Edit, modalProps} = this.props
    const {cancel} = this
    const modal = {
      ...modalProps,
      isOpen,
      appElement : document.body,
      onRequestClose : cancel,
    }

    const edit = {
      value,
      onChange : v=>{
        onDone(v)
        this.close()
      }
    }

    return <Modal {...modal}>
      <Edit {...edit}/>
    </Modal>
  }
}

function prompt_cb(resolve, reject, value, Edit, modalProps) {
  const props = {
    isOpen : true,
    value,
    onDone : resolve,
    Edit,
    modalProps,
  }

  render(<Prompt {...props}/>, dialog_div)
}

export const prompt = promisify(prompt_cb)
