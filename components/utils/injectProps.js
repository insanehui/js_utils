import React from 'react'
import name from '../displayName/hoc.js'
import merge from '../../modash/merge.js'

export default (props, children) => Cmp =>{ 
  class New extends React.PureComponent {
    displayName = name(Cmp, 'injectProps')

    render() {
      return <Cmp {...merge(props, {children}, this.props)} />
    }
  }
  return New
}
