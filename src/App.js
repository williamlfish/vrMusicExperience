import React, { Component } from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';

class App extends Component {
  render() {
    return (
      <Scene>
        <Entity  geometry={{primitive: 'sphere'}} scale={[.5, .5, .5]}material="color: red" position={[0, 1, -5]} move/>
        <Entity geometry={{primitive: 'plane', width:15, height:15}} rotation={[-90, 0, 0]} material="color: #6D797D" position={[0, 0, 0]}/>
        <a-sky src={space} />
      </Scene>
    );
  }
}

export default App;
