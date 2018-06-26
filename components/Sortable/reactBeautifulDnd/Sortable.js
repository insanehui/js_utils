/*
 * 基于react-beautiful-dnd的sortable
 */
import React, { PureComponent, } from 'react'
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
    itemKey : 'id', // 获取item key的方法，详见getKey
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
    const Child = this.props.children
    const key = this.getKey(item, i)

    <Draggable key={key} draggableId={key} index={i}>
      {(provided, snapshot) => (
        return <Child {...{
          provided, snapshot,
          value:item,
          sortIndex:i,
        }}/>
      )}
    </Draggable>
  }

  render() {
    const {as:Outer, value} = this.props

    <DragDropContext onDragEnd={this.onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Outer ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} >
            {_.map(value, (item, index) => this.Item)}
            {provided.placeholder}
          </Outer>
        )}
      </Droppable>
    </DragDropContext>
  }
}

export const free = _free(Sortable)
// export const Handle = SortableHandle('div')
