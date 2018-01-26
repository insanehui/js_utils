/*
 * 基于react sortable hoc封装，最终成为一个标准的控件形态，使用更直接便捷
 * 省下了一系列hoc包装的过程
 * ps: react的controlled component的思想将'控件'的含义诠释到了极致！
 */
import React, { PureComponent } from 'react'
import _ from 'lodash'

import {
  SortableContainer, SortableElement, arrayMove,
  // SortableHandle,
} from 'react-sortable-hoc';

export default class Sortable extends PureComponent {
  static defaultProps = {
    as : 'div', // 父容器的类型
  }

  constructor(p) {
    super(p)
    const {as, children} = this.props
    this.Main = SortableContainer(as)
    this.Sub = SortableElement(children)
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
    }
    return <Sub {...props}/>
  }

  render() {
    const {Main, Item} = this // sortable容器
    const {
      value, onChange, 
      as, children, itemKey, // filter
      ...rest,
    } = this.props

    const props = {
      ...rest,
      onSortEnd : ({oldIndex, newIndex}) => {
        onChange(arrayMove(value, oldIndex, newIndex))
      },
    }

    return <Main {...props}>
      {_.map(value, Item)}
    </Main>
  }
}

