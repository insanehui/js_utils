import React from 'react'
import Animate from 'react-move/Animate'

export default class FakeProgressBar extends React.PureComponent {
  static defaultProps = {
    show : true,
    time : 60*1000,
    leaveTime : 200,
    children : x=>`${~~x}%`,
  }

  render() {
    const {show, time, leaveTime, style, children, ...rest} = this.props
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
        duration : leaveTime,
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
      }}>{children(x)}</div>}
    </Animate>
  }
}

