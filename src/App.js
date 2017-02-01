import React, { Component } from 'react';
import 'aframe';
import './App.css'
import axios from 'axios';
import {AFRAME, Entity, Scene} from 'aframe-react';
import Sky from './elements/Sky.js'
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      show:false,
      soundUrl:'',
      sounds:[]
    }
    this.getMusic = this.getMusic.bind(this)
  }
  componentWillMount(){
    if(this.state.show){
      this.getMusic()
    }
  }
  seaPlay(){
    this.setState({
      soundUrl:'seaOfVapors.mp3',
      show:true
    })
    this.getMusic()
  }
  churchPlay(){
    this.setState({
      soundUrl:'Church.mp3',
      show:true
    })
    this.getMusic()
  }
  getMusic(){
    setTimeout(()=>{
      const axiosSoundGetter = axios.create({
        responseType:'arraybuffer'
      });
      //we init the AudioContext
      const audio = new (window.AudioContext || window.webkitAudioContext)();
      console.log(audio.sampleRate);
      //this analyser is used to get data
      const analyser = audio.createAnalyser()
      analyser.fftSize = 1024;
      const buffer = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(buffer - 320);
      let freqSize = (audio.sampleRate)/analyser.fftSize;
      console.log(freqSize);
      //make call to get sound
      axiosSoundGetter.get(this.state.soundUrl).then(res=>{
        console.log(res);
        audio.decodeAudioData(res.data, (buffer)=>{
          const source = audio.createBufferSource();
          source.buffer = buffer
          source.connect(analyser);
          analyser.connect(audio.destination)
          if(source){
            source.start()
            setInterval(()=>{
              analyser.getByteFrequencyData(dataArray);
              let freqarry = [];
              dataArray.forEach((d, i)=>{
                freqarry.push(d)
              })
              this.setState({sounds:freqarry})
            },40)
          }
        })
      })

    }, 10)

}
  render() {
    if(this.state.show){
      return(
      <Scene >
          <Sky  color='#8DD9E3' />
            <Entity position={[-30,0,-50]}>
          {this.state.sounds.map((item, i)=>{
            let ele;
            if(i<64){
              ele = (<Entity
                      key={i}
                      geometry='primitive: box;'
                      material='color:#ED7D40; opacity:.7'
                      position={[i,item/50,item/5]}
                    />)
            }else if(i>128){
              ele = (<Entity
                     key={i}
                     geometry='primitive: box;'
                     material='color:#ED4F8E; opacity:.7'
                     position={[i - 128,i/25,item/3]}
                   />)
            }else{
              ele = (<Entity
                     key={i}
                     geometry='primitive: box;'
                     material='color:#15EBB9; opacity:.7'
                     position={[i-64,item/18,item/6]}
                   />)
            }
            return ele
          })}
        </Entity>
        </Scene>)
    }else{
      return (
        <div className='all'>
          <div className='vapors' onClick={this.seaPlay.bind(this)} >
            <h1 className='start' >Play seaOfVapors</h1>
          </div>
          <div className='church' onClick={this.churchPlay.bind(this)} >
            <h1 className='start' >Play Church</h1>
          </div>

        </div>
      )
    }

  }
}

export default App;
