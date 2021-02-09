import React from 'react'
import _ from 'lodash'
import uuid from 'uuid/v1'
import {Input} from './adaptor.js'

export default function DataListInput({list, as = Input, ...rest}) {
  const As = as
  const id = uuid()
  return <>
    <As list={id} {...rest}/>
    <datalist id={id}>
      {_.map(list, (item, i ) => <option key={i} value={item} />)}
    </datalist>
  </>
}

