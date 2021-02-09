import React from 'react'

const ClosableCtrl =  (Edit, Switch) => {
  class Ctrl extends React.PureComponent {
    static defaultProps = {
      defaultOn : false, // 缺省
    }

    constructor(p) {
      super(p)
      const {defaultOn} = this.props
      this.state = {
        on : defaultOn,
      }
    }
    
    render() {
      const {value, onChange} = this.props

      const {defaultOn, // filter
        ...rest} = this.props

      const {on} = this.state 

      const Main = on && <Edit {...rest}/>

      return <>
        {Main}
        <Switch value={on} onChange={x=>{
          this.setState({ on : x }, ()=>{
            if ( !x ) {
              if ( value !== null ) {
                onChange(null)
              } 
            } 
          })
        }}/>
      </>
    }
  }

  return Ctrl
}

export default ClosableCtrl

