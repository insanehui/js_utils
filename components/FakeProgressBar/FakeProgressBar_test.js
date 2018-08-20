/*
 * 演示一个假进度条的使用
 */
import React from 'react';
import ReactDOM from 'react-dom'

import FakeProgressBar from './utils/components/FakeProgressBar/FakeProgressBar.js'

class Test extends React.PureComponent {
  state = {
    on : false,
  }

  render() {
    const {on} = this.state 
    return <div>
      <button onClick={()=>{this.setState({ on:!on })}}>toggle</button>
      <FakeProgressBar style={{width:200, height:20, border:'1px solid gray',}} show={on} time={60*1000} ></FakeProgressBar>
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
