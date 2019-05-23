import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactHowler from 'react-howler';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {grey50,deepOrange500,indigo700} from 'material-ui/styles/colors';
import _ from 'lodash';

import {fetchSongToPlay} from "../actions/index";

let current =0;
class PlayBar extends Component{

  constructor (props) {
    super(props);

    this.state = {
      playing: false,
      loaded: true,
      loop: false,
      repeat:false,
      mute: false,
      volume: 1.0,
      min:0,
      sec:0,
      prev:false,
      next:false,
      shuffle:false,
      touched:false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleShuffle= this.handleShuffle.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleRoopToggle = this.handleRoopToggle.bind(this);
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
    this.checkState=this.checkState.bind(this);
    this.renderSeekPos = this.renderSeekPos.bind(this);
    this.handleVolumeChange=this.handleVolumeChange.bind(this);
  }

  leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
      output = '0' + output;
    }
    return output;
  }

  componentDidMount(){
    this.props.fetchSongToPlay(20);
  }

  componentWillReceiveProps(){
    this.setState({playing:false,loaded:true});
  }


  handleOnLoad () {
    this.setState({
      loaded: true,
      duration:this.player.duration(),
      min: this.leftPad(_.floor(this.player.duration()/60),2),
      sec: this.leftPad((this.player.duration()%60).toFixed(),2),
    });
    this.checkState();
  }

  handleOnEnd () {
    if(this.state.repeat){
      console.log('repeat triggered');
      this.player.seek(0);
    }
    else if(this.state.next){
      console.log('next triggered');
      this.handleNext()
    }
    else{
      console.log('else triggered');
      this.setState({
        playing: false
      });

    }
    this.checkState();
  }

  handleRoopToggle(){
    if(this.state.repeat){
      this.setState({repeat:false,loop:true});
    }
    else if(this.state.loop){
      this.setState({repeat:false,loop:false});
    }
    else{
      this.setState({repeat:true,loop:false});
    }
    this.checkState();
  }
  /*handleLoopToggle () {
    this.setState({
      loop: !this.state.loop,
      repeat: false
    });
    this.checkState();
  }

  handleRepeatToggle(){
    this.setState({
      repeat: !this.state.repeat,
      loop:true
    });
    this.checkState();
  }*/

  handleVolumeChange(number){
    if(number===0){
      this.setState({volume:number,mute:true});
    }
    else{
      this.setState({volume:number});
    }
  }
  handleMuteToggle () {
    this.setState({
      mute: !this.state.mute
    })
  }

  handleStop () {
    this.player.stop();
    this.setState({
      playing: false
    });
    this.renderSeekPos();
    this.checkState();
  }

  handleOnPlay () {
    this.setState({
      playing: true,
      touched:true
    });
    this.checkState();
    this.renderSeekPos();
  }


  handleToggle () {
    this.setState({
      playing: !this.state.playing,
      touched:true
    });
    this.checkState();
    this.renderSeekPos();
  }

  renderSeekPos () {
    this.setState({
      seek:this.player.seek(),
      seekMin: this.leftPad(_.floor(this.player.seek()/60),2),
      seekSec: this.leftPad((this.player.seek()%60).toFixed(),2)
    });
    if (this.state.playing) {
      requestAnimationFrame(this.renderSeekPos);
    }

  }

  checkState(){
    if(current+1>=this.props.queue.length && this.state.loop===false){
      this.setState({next:false});
    }
    else{
      this.setState({next:true});
    }
    if(current-1<0 && this.state.loop===false){
      this.setState({prev:false});
    }
    else{
      this.setState({prev:true});
    }
  }

  handleNext() {
    console.log('in handleNext\ncurrent:' + current + '\nlength:' + this.props.queue.length);
    if(this.state.repeat){
      this.setState({repeat:false});
    }
    else if(this.state.shuffle){
      current= Math.floor(Math.random()*this.props.queue.length);
    }
    else if (this.state.loop) {
      current = (current + 1) % this.props.queue.length;
    }
    else if (!this.state.loop && current < this.props.queue.length-1){
      current++;
    }
    this.checkState();
  }
  handlePrev(){
    console.log('in handlePrev\ncurrent:' + current + '\nlength:' + this.props.queue.length);
    if(this.state.repeat){
      this.setState({repeat:false});
    }
    if(this.state.loop){
      console.log('in if loop ON');
      current=(((current - 1) % this.props.queue.length)+this.props.queue.length) % this.props.queue.length;
      console.log('going to '+current);
      this.setState({playing: this.state.playing});
    }
    else if(!this.state.loop && current > 0){
      current--;
    }
    this.checkState();
  }
  handleShuffle(){
    this.setState({shuffle:!this.state.shuffle});
  }

  render(){
    //console.log("RENDER PLAYBAR");
    //console.log(this);
    if(this.props.queue[current]===undefined){
      console.log('null returned<><><><><>');
      return null;
    }
    return(
      <footer className={'playbar-footer'}>
        <div className={'playing-bar'}>
          <div className={'left'}>
            <div className={'left-side'}>
              <img className="oneBYone" src={this.props.queue[current].artSrc}/>
              <div className={'flex-col'}>
                <div className={'Psong-name'}>
                  <p>{this.props.queue[current].songName}</p>
                </div>
                <div className={'Partist-name'}>
                  <p>{this.props.queue[current].artistName}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={'middle'}>
            <div className={'middle-side'}>
              <ReactHowler
                src={this.props.queue[current].audioSrc}
                playing={this.state.playing}
                onLoad={this.handleOnLoad}
                onPlay={this.handleOnPlay}
                onEnd={this.handleOnEnd}
                mute={this.state.mute}
                volume={this.state.volume}
                ref={(ref) => (this.player = ref)}
              />
              <div className={'flex-grid-center'}>
                <div>
                  <IconButton tooltip={'shuffle'}  tooltipPosition={'top-center'} onClick={()=>this.handleShuffle()}>
                    <FontIcon className="material-icons" color={this.state.shuffle ? deepOrange500 :grey50}>shuffle</FontIcon>
                  </IconButton>
                </div>
                <div>
                  <IconButton tooltip={'Previous'}  disabled={!this.state.prev} tooltipPosition={'top-center'} onClick={()=>this.handlePrev()}>
                    <FontIcon className="material-icons" color={grey50}>skip_previous</FontIcon>
                  </IconButton>
                </div>
                <div>
                  <IconButton tooltip={(this.state.playing) ? 'Pause' : 'Play'}  tooltipPosition={'top-center'} onClick={()=>this.handleToggle()}>
                    <FontIcon className="material-icons" color={grey50}>{(this.state.playing) ? 'pause_circle_outline' : 'play_circle_outline'}</FontIcon>
                  </IconButton>
                </div>
                <div>
                  <IconButton tooltip={'Next'} disabled={!this.state.next} tooltipPosition={'top-center'} onClick={()=>this.handleNext()}>
                    <FontIcon className="material-icons" color={grey50}>skip_next</FontIcon>
                  </IconButton>
                </div>
                <div>
                  <IconButton tooltip={this.state.repeat ? 'repeat song' : 'loop song'}  tooltipPosition={'top-center'} onClick={()=>this.handleRoopToggle()}>
                    <FontIcon className="material-icons" color={this.state.loop || this.state.repeat ? deepOrange500 :grey50}>{this.state.repeat ? 'repeat_one' : 'repeat'}</FontIcon>
                  </IconButton>
                </div>
              </div>
              <div className={'scroll'}>
                <div>
                  <p className={'pPlayBar'}>{this.state.seekSec ? this.state.seekMin+':'+this.state.seekSec : '0:00'}</p>
                </div>
                <div className={'scroller'}>
                  <Slider min={0} max={this.state.loaded ? this.state.duration : 1} onChange={(e,number)=>this.player.seek(number)} value={this.state.seek !== undefined ? this.state.seek : 0}/>

                </div>
                <div>
                  <p className={'pPlayBar'}>{this.state.loaded ? this.state.min+':'+this.state.sec : ''}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={'right'}>
            <div>
              <IconButton tooltip={this.state.mute ? 'unmute' : 'mute' }  tooltipPosition={'top-center'} onClick={()=>this.handleMuteToggle()}>
                <FontIcon className="material-icons" color={this.state.mute ? deepOrange500 :grey50}>{this.state.mute ? 'volume_off' : this.state.volume <0.2 ? 'volume_mute' : this.state.volume <0.6? 'volume_down' : 'volume_up'}</FontIcon>
              </IconButton>
            </div>
            <div className={'volumeSlider'}>
              <Slider min={0} max={1} onChange={(e,number)=>this.setState({volume:number})} value={this.state.seek !== undefined ? this.state.volume : 1}/>
            </div>

          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state){
  return {queue:state.queue};
}

export default connect(mapStateToProps,{fetchSongToPlay})(PlayBar);

/*
<img className="play-buttons" src='/images/gui/play_buttons_static.png' />
<audio id="player" controls>
            <source src={this.props.queue.audioSrc} type="audio/mp4"/>
          </audio>*/

/*<LinearProgress mode={'determinate'} color={deepOrange500} min={0} max={this.state.loaded ? this.state.duration : 100} value={(this.state.seek !== undefined) ? this.state.seek : 0.00}/>*/