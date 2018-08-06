import React from 'react'
import name from '../displayName/hoc.js'
import merge from '../../modash/merge.js'

export default (children, props) => Cmp =>{ 
  class New extends React.PureComponent {
    displayName = name(Cmp, 'injectChildren')

    render() {
      return <Cmp {...merge(props, {children}, this.props)} />
    }
  }
  return New
}
