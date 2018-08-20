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
    close = ()=>{
      /*
       * 手动unmount，就像小程序一样，用完即走
       */
      unmountComponentAtNode(dialog_div)
      document.body.removeChild(dialog_div)
    }

    render() {
      const modal = {
        ...modalProps,
        isOpen:true,
        appElement : document.body,
      }

      const edit = {
        value,
        onChange : v=>{
          resolve(v)
          this.close()
        }
      }

      return <Modal {...modal}>
        <Edit {...edit}/>
      </Modal>
    }
  }

  render(<Prompt />, dialog_div)
}

export const prompt = promisify(prompt_cb) // [deprecated]
export default prompt
