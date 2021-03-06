/*
 * 基于react sortable hoc封装，最终成为一个标准的控件形态，使用更直接便捷
 * 省下了一系列hoc包装的过程
 * ps: react的controlled component的思想将'控件'的含义诠释到了极致！
 */
import React, { PureComponent, } from 'react'
import _ from 'lodash'

import {
  SortableContainer, SortableElement, arrayMove,
  SortableHandle,
} from 'react-sortable-hoc';

import {free as _free} from './Formy/uncontrolled.js'

export default class Sortable extends PureComponent {
  static defaultProps = {
    as : 'div', // 父容器的类型
    onChange : ()=>{},
    itemKey : null, // 获取key的方式，详见代码
  }

  children = ()=>{
    const {children} = this.props
    if ( !_.isArray(children) ) {
      return [children]
    } 
    return children
  }

  constructor(p) {
    super(p)
    const {as} = this.props
    const {children} = this
    this.Main = SortableContainer(as)
    for (const child of children()) {
      if ( _.isFunction(child) ) {
        /*
         * 给函数注入一个displayName，方便调试
         */
        child.displayName = 'renderFunc'
        this.Sub = SortableElement(child) // 只能有一个child是function
        break;
      } 
    }
  }

  getKey = (item, i)=>{
    const {itemKey} = this.props
    if ( !itemKey ) {
      return i
    } 
    if ( _.isFunction(itemKey) ) {
      return  itemKey(item)
    } 
    return _.get(item, itemKey)
  }

  Item = (item, i)=>{
    const {getKey, Sub} = this
    const {value, onChange} = this.props
    const props = {
      key : getKey(item, i),
      index : i,

      value : item,
      onChange : v=>{
        let newValue = [...value]
        newValue[i] = v
        onChange(newValue)
      },

      /*
       * 注入的删除操作。为什么不取名为onRemove是因为onChange是控件的约定命名，所以保留
       * 而remove是自定义的属性。则不需要定义为onRemove
       */
      remove : ()=>{ 
        let newValue = [...value]
        newValue.splice(i, 1)
        onChange(newValue)
      },
      sortIndex : i, // 由于key和index会被过滤掉，因此再另外注入一个sortIndex
    }
    return <Sub {...props}/>
  }

  render() {
    const {Main, Item, children} = this // sortable容器
    const {
      value, onChange, children:__, 
      as, itemKey, // filter
      ...rest,
    } = this.props

    const props = {
      ...rest,
      onSortEnd : ({oldIndex, newIndex}) => {
        if ( oldIndex !== newIndex ) {
          onChange(arrayMove(value, oldIndex, newIndex))
        } 
      },
    }

    return <Main {...props}>
      {children().map(child => {
        if ( _.isFunction(child) ) {
          return _.map(value, Item)
        } 
        return child
      })}
    </Main>
  }
}

export const free = _free(Sortable)

export const Handle = SortableHandle('div')
