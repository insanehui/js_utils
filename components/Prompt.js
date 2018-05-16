/*
 * 用react实现的window.prompt async版本
 */
import React, { PureComponent } from 'react'
import {render,unmountComponentAtNode} from 'react-dom'
import Modal from 'react-modal'
import {promisify} from '../modash.js'

function prompt_cb(resolve, reject, value, Edit, modalProps) {
  /*
   * Edit为一个controlled的编辑器（value, onChange(支持v或者是event)）
   * 对话框关闭则销毁一切资源，"用完即走"，因此把类写在闭包里
   * 支持多重弹框
   */

  const dialog_div = document.createElement('div')
  document.body.appendChild(dialog_div)

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
      this.setState({ isOpen : false }, ()=>{
        /*
         * 手动unmount，就像小程序一样，用完即走
         */
        unmountComponentAtNode(dialog_div)
        document.body.removeChild(dialog_div)
      })
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
