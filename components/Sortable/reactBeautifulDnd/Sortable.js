/*
 * 基于react-beautiful-dnd的sortable
 */
import React, { PureComponent} from 'react'
import _ from 'lodash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {free as _free} from '../../Formy/uncontrolled.js'

import {forwardable} from '../../utils/forward.js'

@forwardable
export default class Sortable extends PureComponent {
  static defaultProps = {
    as : 'div', // 父容器的类型
    onChange : ()=>{},
    children : null,
    value : null,
    itemKey : null, // 获取item key的方法，详见getKey
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
    for (const child of this.children()) {
      if ( _.isFunction(child) ) {
        /*
         * 给函数注入一个displayName，方便调试
         */
        child.displayName = 'renderFunc'
        this.Child = child
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
    const {Child} = this
    const key = this.getKey(item, i)

    return <Draggable key={key} draggableId={key} index={i}>
      {(provided, snapshot) => {
        const El = Child({
          provided, snapshot,
          value:item,
          sortIndex:i,
        })
        return React.cloneElement(El, {
          ...provided.draggableProps,
          ...provided.dragHandleProps,
        })
      }}
    </Draggable>
  }

  render() {
    const {as:Outer, value} = this.props
    return <DragDropContext onDragEnd={this.onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Outer ref={provided.innerRef} {...this.forwarded()} >
            {this.children().map(child=>{
              if ( _.isFunction(child) ) {
                return _.map(value, this.Item)
              } 
              return child
            })}
            {provided.placeholder}
          </Outer>
        )}
      </Droppable>
    </DragDropContext>
  }
}

export const free = _free(Sortable)
// export const Handle = SortableHandle('div')
