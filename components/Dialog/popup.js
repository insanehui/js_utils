import _ from 'lodash'
import prompt from '../Prompt.js'

import {css} from '../../cssobj.js'

const frame = 'dialog20180506'

css({
  '@global' : {
    [`@keyframes ${frame}`] : {
      from : {
        transform : 'scale(0)',
      },
    },
  },
})

export default _.bind(prompt, null,  _, _, {
  style : {
    overlay : {
      display : 'flex',
      justifyContent : 'center', 
      alignItems : 'center', 
      backgroundColor : 'transparent',
    },
    content : {
      position : 'fixed',
      top : 0,
      left : 0,
      right : 0,
      bottom : 0,
      border: 'none',
      backgroundColor : 'transparent',

      display : 'flex',
      justifyContent : 'center', 
      alignItems : 'center', 

      animation : `${frame} 0.1s ease-out`,
    },
  }
})

