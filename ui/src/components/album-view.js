import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table, Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey50,deepOrange500,indigo700} from 'material-ui/styles/colors';

import {fetchAlbum,fetchAlbumToPlay} from "../actions/index";

class AlbumView extends Component{
  componentWillMount(){
    console.log('in album will mount KEY ID= '+ this.props.keyId);
    console.log(this.props);
    if(this.props.keyId !== undefined){
      this.props.fetchAlbum(this.props.keyId);
    }
    console.log(this);
  }

  renderSongs(song){
    return(
      <li key={song.id} className={'songlist'}>
        <div className={'songlist-item'}>
            <IconButton>
              <FontIcon className="material-icons" color={grey50}>play_arrow</FontIcon>
            </IconButton>
            <p>{song.name}</p>
                <p>{song.runtime}</p>
              <IconMenu
                iconButtonElement={<IconButton><FontIcon className="material-icons" color={grey50}>more_vert</FontIcon></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="view Lyrics" />
                <MenuItem primaryText="Save to Your Music" />
                <MenuItem primaryText="Add to Playlist" />
              </IconMenu>
        </div>
      </li>
    );
  }
  onPlay(){
    this.props.fetchAlbumToPlay(this.props.keyId);
  }
  render(){
    console.log("Render albumView");
    console.log(this);
    const album=this.props.album;
    console.log(this.props);
    if(!album.id){
      return(<div>Loading...</div>);
    }
    console.log("AlbumView");
    return(
      <Row>
        <Col xs={12} sm={4} md={4} lg={3}>
          <Row className=''>
            <img className={"new-image-fix"} src={album.artSrc} />
          </Row>
          <Row>
            <Col>
              <div className={'text-center'}>
                <h3 className={'artist-name-album'}>{album.name}</h3>
                <div className={'Psong-name'}>
                  <p>{album.artist.name}</p>
                  <p>{album.songs.length} SONGS</p>
                </div>
                <button onClick={()=>this.onPlay()} className={'btn-blue'}>PLAY</button>
                <button className={'btn-transparent'}> SAVE</button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={8} md={8} lg={9}>
          <ol className={'flex-col'}>
            {_.map(album.songs,this.renderSongs)}
          </ol>
        </Col>
      </Row>
    );
  }
}
function mapStateToProps(state){
  return {album : state.albums};
}

export default connect(mapStateToProps,{fetchAlbum,fetchAlbumToPlay})(AlbumView)