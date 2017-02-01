import React from 'react';
import {Entity} from 'aframe-react';

const Sky = (props) =>{
  return(
    <Entity
      geometry={{primitive: 'sphere', radius: 100}}
      material={{shader: 'flat', color:props.color}}
      scale="1 1 -1"/>
  )
}
export default Sky;
