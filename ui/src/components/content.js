import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Row, Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {fetchArtists, fetchAlbums, fetchAlbum, fetchSongs} from '../actions/index'
import {Link } from 'react-router-dom';
import TopTab from './top_tab';

import AlbumView from './album-view';
import ArtistView from './artist-view';
import AdminView from './admin-view';
import AdminView2 from './admin-view2';
import AdminView3 from './admin-view3';
import AccountView from './account-view';
import ArtistSpecialtyView from './artist-specialty-view';

import { IndexLinkContainer } from 'react-router-bootstrap';
import { debug } from 'util';
import { Z_ASCII } from 'zlib';


class Content extends Component {
    constructor(props){
      super(props);
      this.state={
        artistArray: []
      }
      this.tabClickHandler = this.tabClickHandler.bind(this);
      this.renderAlbums = this.renderAlbums.bind(this);
      if(props.subpage != undefined){
      }
    }

    tabClickHandler(e){
      if(e === 1){
        this.props.fetchArtists();
        this.setState({subpage: 'artists'});
      } else if(e === 2){
        this.props.fetchAlbums();
        this.setState({subpage: 'albums'});
      } else if(e === 3){
        this.props.fetchSongs();
        this.setState({subpage: 'songs'});
      } else if(e === 4){
        this.setState({subpage: 'playlists'});
      }
    }

    componentDidMount(){
      if(this.props.subpage==="songs"){
        this.props.fetchSongs();
        this.setState({subpage: 'songs'});
      } else if(this.props.subpage==="albums"){
        this.props.fetchAlbums();
        this.setState({subpage: 'albums'});
      } else if(this.props.subpage==="artists"){
        this.props.fetchArtists();
        this.setState({subpage: 'artists'});
      } else if(this.props.subpage==="playlists"){
        
      } else if(this.props.subpage==="admin"){
        this.setState({subpage: 'admin'});
      } else if(this.props.subpage==="admin2") {
        this.setState({subpage: 'admin2'});
      } else if(this.props.subpage==="admin3") {
          this.setState({subpage: 'admin3'});
      } else if(this.props.subpage==="artist"){
        this.setState({subpage: 'artist'});
      }
      else if(this.props.subpage==="account"){
        this.setState({subpage: 'account'});
      }
    }

    componentWillReceiveProps(newProps){
      if(newProps.subpage === this.props.subpage){
        return;
      }
      if(newProps.subpage==="songs"){
        this.props.fetchSongs();
        this.setState({subpage: 'songs'});
      } else if(newProps.subpage==="albums"){
        this.props.fetchAlbums();
        this.setState({subpage: 'albums'});
      } else if(newProps.subpage==="artists"){
        this.props.fetchArtists();
        this.setState({subpage: 'artists'});
      } else if(newProps.subpage==="playlists"){
        
      } else if(newProps.subpage==="albumPage"){
          this.setState({subpage: 'albumPage', currentViewId: newProps.thisMatch.match.params.id});
      } else if(newProps.subpage==="artistPage"){
        this.setState({subpage: 'artistPage', currentViewId: newProps.thisMatch.match.params.id});
      } else if(newProps.subpage==="admin"){
        this.setState({subpage: 'admin', currentViewId: 0});
      } else if(newProps.subpage==="admin2") {
        this.setState({subpage: 'admin2', currentViewId: 0});
      } else if(newProps.subpage==="admin3") {
          this.setState({subpage:'admin3', currentViewId: 0});
      } else if(newProps.subpage==="artist"){
        this.setState({subpage: 'artist', currentViewId: 0});
      } else if(newProps.subpage==="account"){
        this.setState({subpage: 'account', currentViewId: 0});
      } 
    }

 renderSubpage(subpage){


  console.log("RENDERING SUBPAGE");
  console.log(this);
  //debugger;
  if(subpage==="songs"){
    return(
      this.renderSongs(this.props.albums)
    );
  } else if(subpage==="albums"){
    return(
      <div className={'flex-grid'}>
        {_.map(this.props.albums,this.renderAlbums)}
      </div>
    );
  } else if(subpage==="artists"){
    return(
      <div className={'flex-grid'}>
        {_.map(this.props.albums,this.renderArtists)}
      </div>
     ) 
  } else if(subpage==="playlists"){
    <div className={'flex-grid'}></div>
  }
  else if(subpage==="albumPage"){
    return(<AlbumView keyId={this.state.currentViewId}/>);
  }
  else if(subpage==="artistPage"){
    return(<ArtistView keyId={this.state.currentViewId}/>);
  } else if(subpage==="admin"){
    return(<AdminView/>);
  } else if(subpage==="admin2") {
    return (<AdminView2/>);
  } else if(subpage==="admin3") {
    return (<AdminView3/>);
  } else if(subpage==="artist"){
    return(<ArtistSpecialtyView userId={this.props.user.userId}/>);
  }
  else if(subpage==="albumPage"){
    return(<AlbumView keyId={this.state.currentViewId}/>);
  }
  else if(subpage==="artistPage"){
    return(<ArtistView keyId={this.state.currentViewId}/>);
  } else if(subpage==="admin"){
    return(<AdminView/>);
  }
  else if(subpage==="account"){
    console.log("SUBPAGE ACCOUNT RENDER PROPS");
    console.log(this);
    return(
      <AccountView user={this.props.user}/>
    );
  }

  console.log("DONE RENDERING SUBPAGE");
 }

 renderIndividualSong(song){
  if(song === undefined){
    return(<tr></tr>);
  }
  if(song.album === undefined){
    return(<tr></tr>);
  }
  return(
    <tr key={song.id} className="">
      <td>{song.name}</td>
      <td>{song.album.name}</td>
      <td>{song.album.artist.name}</td>
      <td>{song.runtime}</td>
    </tr>
  );
}

pushIndividualSong(song){
  var newArtistArray  = this.props.artistArray;
  newArtistArray.push();
  setState({});
}

 renderSongs(albums){
   return(
     <div className="song-table">
     <Table hover>
        <tbody>
          {_.map(this.props.albums,this.renderIndividualSong)}
        </tbody>
      </Table>
     </div>
   );
 }

  renderAlbums(album){
    console.log("RENDERING ALBUMS");
    //debugger;
    console.log(album)
    console.log("THIS");
    console.log(this);
    if(album == undefined){
      return(<div></div>);
    }
    if(album.artist == undefined){
      return(<div></div>);
    }
    return(
    <Col key={album.id} xs={6} sm={4} md={3} lg={2} xl={2} className="album-box">
      <div  className={'media-object'}>
        <li className="album-row album-image-wrapper">
        <IndexLinkContainer to={`/album/${album.id}`}>
          <img className="album-img" src={album.artSrc}/>
        </IndexLinkContainer>
        </li>
        <li className="album-row">
          <Link to={`/album/${album.id}`}>
            <p className="list-row-detail-text" >{album.name}</p>
          </Link>
        </li>
        <li className="album-row">
          <Link to={`/artist/${album.artist.id}`}>
            <p className="list-row-detail-text">{album.artist.name}</p>
          </Link>
        </li>
      </div>
      </Col>
    );
  }

  renderAdvertisement(){
    console.log("RENDER ADVERTISEMENT");
    console.log(this);
    var imageLinkBeginning = "../../../images/advertisements/ad_";
    var randomNumber = Math.floor(Math.random() * 7);
    var imageLinkEnd = ".png";
    var imageLink = imageLinkBeginning + randomNumber + imageLinkEnd;
    if(this.props.user.role > 0){
      return(<div></div>);
    } else {
      return(<div><a href="https://www.marketingprofsu.com"><img className="advertisement" src={imageLink}></img></a></div>);
    }
  }

  renderArtists(artist){
    return(
      <Col key={artist.id} xs={6} sm={4} md={3} lg={2} xl={2} className="album-box">
        <div  className={'media-object'}>
          <li className="album-row album-image-wrapper rounded">
            <IndexLinkContainer className="" to={`/artist/${artist.id}`}>
              <img className="album-img" src={artist.artSrc}/>
            </IndexLinkContainer>
          </li>
          <li className="artist-row">
            <Link to={`/artist/${artist.id}`}>
              <p className="list-row-detail-text" >{artist.name}</p>
            </Link>
          </li>
          <li className="artist-row">
            <p className="list-row-detail-text">Followers:{artist.followers}</p>
          </li>
        </div>
      </Col>
    );
  }
  setCurrentPage(){
    if(this.props.subpage==="songs"){
      return 3;
    } else if(this.props.subpage==="albums"){
      return 2;
    } else if(this.props.subpage==="artists"){
      return 1;
    } else if(this.props.subpage==="playlists"){
      return 4;
    }
  }
  renderTopTab(){
    if(this.props.subpage==='account'){
      return(
        <div></div>
      );  
    }
    return(
      <TopTab tabClickHandler = {this.tabClickHandler} currentPage={this.setCurrentPage}/>
    );
  }
  render(){
      return (
        <div className='content-window'>
              {this.renderTopTab()}
              {this.renderAdvertisement()}
              <Row className = "content-row">
                  <section className={''}>
                      {this.renderSubpage(this.props.subpage)}
                  </section>
              </Row>
            </div>
        );
    }
}


function mapStateToProps(state){
  return {albums: state.albums, user: state.user};
}

export default connect(mapStateToProps,{fetchAlbums, fetchArtists, fetchSongs})(Content);

/*
<div className='playbar-footer'>
                  <img className="play-buttons" src='/images/gui/play_buttons_static.png' />
                  <div className='right-content'></div>
              </div>
*/