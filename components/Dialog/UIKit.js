/*
 * 代替window的alert, prompt, confirm方法
 * 除了自定义样式之外，也提供了一些初始样式
 */
import React, { PureComponent } from 'react'
import S from 'styled-components'

import '../../web/icon/iconfont.css' // 初始图标

// import {addProps} from '../utils.js'
import popup from './popup.js'
import suite from './Dialog.js'
// import chd from '../utils/injectChildren.js'
import props from '../utils/injectProps.js'

const Main0 = (S.div`
    min-width: 200px;
    max-width: 500px;
    border: 1px solid #bfbfbf;
    border-radius: 3px;
`)

const Title0 = (S.div`
    display : flex;
    align-items : center;
    color: white;
    height: 25px;
    padding: 0 3px;
    font-size: 12px;
    line-height: 25px;
    font-weight: 600;
    background-color: #b0b0b3;
`)

const Button = (S.button`
    color: #333;
    margin: 0 7px;
    border: 1px solid #d5d5d5;
    cursor: pointer;
    display: inline-block;
    padding: 3px 10px;
    font-size: 12px;
    white-space: nowrap;
    font-weight: 600;
    line-height: 20px;
    user-select: none;
    border-radius: 3px;
    vertical-align: middle;
    background-color: #eee;
    background-image: linear-gradient(#fcfcfc, #eee);
    &:hover {
        border: 1px solid #ccc;
        background-color: #ddd;
        background-image: linear-gradient(#eee, #ddd);
    }
`)

const Body = (S.div`
    padding: 10px;
    font-size: 14px;
    color: #5d5d5d;
`)

const Footer = (S.div`
    padding: 10px;
    padding-top: 0;
    display: flex;
`)

const Gap = (S.div`
    flex: 1;
`)

const Close = props({
  className : 'icon utils tc-close',
})(S.i`
&& {
    font-size: 8px;
    display: flex;
    width: 11px;
    height: 11px;
    align-items: center;
    justify-content: center;
    z-index: 2;
    cursor: pointer;
    &:hover {
        background: #ff6262;
        color: white;
    }
} 
`)

const {Main, Title, OK, Cancel} = suite()

export default ({
  main = Main0,
  title = Title0,
  ok = Button,
  cancel = Button,
  close = Close,
  input:Input = 'input',
} = {})=>{

  class Alert extends PureComponent {
    render() {
      const {onChange, value:msg} = this.props

      return <Main as={main} onChange={onChange}>
        <Title as={title}>
          提示
          <Gap />
          <Cancel as={close} />
        </Title>
        <Body>
          {msg}
        </Body>
        <Footer>
          <Gap />
          <OK as={ok}>确定</OK>
        </Footer>
      </Main>
    }
  }

  class Confirm extends PureComponent {
    render() {
      const {onChange, value:msg} = this.props

      return <Main as={main} onChange={onChange}>
        <Title as={title}>
          确认
          <Gap />
          <Cancel as={close} />
        </Title>
        <Body>
          {msg}
        </Body>
        <Footer>
          <Gap />
          <Cancel as={cancel} onClick={()=>onChange(false)}>取消</Cancel>
          <OK as={ok} onClick={()=>onChange(true)}>确定</OK>
        </Footer>
      </Main>
    }
  }

  class Prompt extends PureComponent {
    render() {
      const {onChange, value:{title:tip, text}} = this.props

      return <Main as={main} onChange={onChange}>
        <form onSubmit={e=>{
          e.preventDefault()
          onChange(this.input.value)
        }}>
          <Title as={title}>
            {tip}
            <Gap />
            <Cancel as={close} />
          </Title>
          <Body>
            <Input defaultValue={text} spellCheck={false} style={{width: 220}} required ref={el=>{if(el){
              /*
               * 开启之后好像会没有动画效果？先暂时关掉
               */
              // el.focus()
              // el.select()
              this.input = el
            }}} />
          </Body>
          <Footer>
            <Gap />
            <Cancel as={cancel}>取消</Cancel>
            <OK onClick={null} as={ok}>确定</OK>
          </Footer>
        </form>
      </Main>
    }
  }

  return {
    alert : msg=>popup(msg, Alert),
    confirm : msg=>popup(msg, Confirm),
    prompt : (title, text)=>{
      return popup({title, text}, Prompt)
    },
  }
}

