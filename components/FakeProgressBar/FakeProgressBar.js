import React from 'react'
import Animate from 'react-move/Animate'

export default class FakeProgressBar extends React.PureComponent {
  static defaultProps = {
    show : true,
    time : 60*1000,
  }

  render() {
    const {show, time, style,...rest} = this.props
    return <Animate 
      show={show}
      start={{
      x : 0,
    }} enter={{
      x:[95],
      timing : {
        duration : time,
      },
    }}
    leave={{
      x:[100],
      timing : {
        duration : 200,
      },
    }}
    >
    {({x})=>
      <div {...{
      style : {
        backgroundImage : `linear-gradient(to right, green 0%, green ${x}%, transparent calc(${x}% + 1px), transparent 100%)`,
        ...style,
      },
      ...rest,
    }} />}
    </Animate>
  }
}

