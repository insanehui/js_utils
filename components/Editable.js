import React, { PureComponent } from 'react'
import _ from 'lodash'

class Editable extends PureComponent {
  getDefaultProps() {
    return {
      is_editing: false,
      value : "",
      onDone : _.noop,
    }
  }

  render() {
    const s = this.state 
    const p = this.props 
    let E;

    if( s.is_editing ) {
      E = <input 
        onBlur={this._done}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        onClick={this._onClick}
        value={s.value}
        ref={this.focus}
      />;
    } else {
      E = s.value;
    }

    return <span {...}>{E}</span>; 
  }
}

export default Editable

