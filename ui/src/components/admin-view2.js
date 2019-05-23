import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table, Row, Col, Button, DropdownButton,MenuItem} from 'react-bootstrap';
import _ from 'lodash';


//import AdminTab from './admin_tab';

import { IndexLinkContainer } from 'react-router-bootstrap';

import {fetchAlbums2,actDeleteAlbum,fetchAlbumA,removeSongA,fetchArtists2,createAlbumA,changePendingA} from '../actions/index'

class AdminView2 extends Component{
    constructor(props) {
        super(props);
        this.state={
            selectid2:undefined
        }
        this.confirmDeleteAlbum = this.confirmDeleteAlbum.bind(this);
        this.fetchingAlbum = this.fetchingAlbum.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
        this.clickCreateAlbum = this.clickCreateAlbum(this);
        this.cAlbum = this.cAlbum(this);
        this.testfunction = this.testfunction(this);
        this.renderAddAlbum=this.renderAddAlbum.bind(this);
        this.handleAlbumNameChange=this.handleAlbumNameChange.bind(this);
        this.handleAlbumImageChange=this.handleAlbumImageChange.bind(this);
        this.handleAlbumImageChange=this.handleAlbumImageChange.bind(this);
        this.selectAlbumArtist=this.selectAlbumArtist.bind(this);
        this.handleCreateAlbum=this.handleCreateAlbum.bind(this);
        this.setSongPending=this.setSongPending.bind(this);
    }


    componentWillMount() {
      this.props.fetchAlbums2();
      this.props.fetchArtists2();
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.selectid2 != undefined) {
            fetchAlbumA(this.state.selectid2);
        }
        this.setState({createAlbum:undefined});
    }

    /*componentDidUpdate() {

    }*/

    testfunction() {
        console.log("Hello");
    }

    selectOption(id, event) {
        if(event == 1) {
            console.log("Upgrade to Artist selected");
            console.log(id);
            {this.confirmUpgradeUser2Artist(id)}
        }

        else if(event == 2) {
            console.log("Upgrade to Premium selected");
            console.log(id);
        }

        else if(event == 3) {
            console.log("Ban User selected");
            console.log(id);
            //{this.confirmDowngradeArtist(id)}
        }
    }

    confirmDeleteAlbum(id) {
        console.log("DELETE ALBUM OPTION SELECTED");
        console.log(id);
        this.props.actDeleteAlbum(id);
        this.setState({});
    }

    clickCreateAlbum() {
        console.log("CREATE ALBUM CLICKED");
        //this.setState({create:1});
    }

    cAlbum() {
        if(this.state.create === undefined) {
            return;
        }
        console.log("CREATE ALBUM STUFF GOES HERE");
        return(
            <div>
                <h1>CREATE ALBUM STUFF</h1>
            </div>
        );
    }

    deleteSong(id) {
        console.log("DELETE SONG SELECTED");
        console.log(id);
        this.props.removeSongA(id);
    }


    renderSongs() {
        if(this.state.selectid2 === undefined) {
            console.log("State not active rn");
            return;
        }
        console.log("GOOD");
        console.log(this.state.selectid2);
        console.log(this.props.amin3.songs);
        /*
                    <div>
                {_.map(this.props.amin3, this.displaySongs,this)}
            </div>
         */
        //this.props.amin3.songs;
        return(
            <div>
                <h1>{this.props.amin3.name}</h1>
                <Table hover>
                    <thead>
                    <tr>
                        <th>
                            Delete Song
                        </th>
                        <th>
                            Song ID
                        </th>
                        <th>
                            Song
                        </th>
                        <th>
                            More Options
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(this.props.amin3.songs,this.displaySingleSong,this)}
                    </tbody>
                </Table>
            </div>
        );

    }

    displaySingleSong(song) {
        //console.log("DISPLAYING SONGSSSS");
        //console.log(album);
        return(
            <tr>
                <td>
                    <Button bsStyle="danger" onClick={() => {this.deleteSong(song.id)}}>Delete</Button>
                </td>
                <td>
                    {song.id}
                </td>
                <td>
                    {song.name}
                </td>
                <td>
                    <DropdownButton title="More" bsStyle="info" onSelect={this.setSongPending}>
                      <MenuItem eventKey={song.id}>{this.changeSongPending(song.pending)}</MenuItem>
                    </DropdownButton>
                </td>

            </tr>

        );
    }
    setSongPending(songId){
      if(songId===undefined){
        console.log("invalid song entry");
        return;
      }
      this.props.changePendingA(songId);
    }
    changeSongPending(pending){
      if(pending==1){
        return "Approve Song";
      }
      return "Block Song";
    }



    fetchingAlbum(album) {
        this.props.fetchAlbumA(album);
        console.log("IN PARSE ALBUM");
        console.log(this);
        this.setState({selectid2:album});
    }

    renderAlbums(albums) {
        if (albums === undefined) {
            console.log("No Albums Here");
        }
        //console.log("JAKE");
        //console.log(albums);
        //<tr onClick={() => {this.setState({selectid2:albums.id})}}>
        //<tr onClick={() => {this.props.fetchAlbumA(albums.id)}}>
        //console.log("ERIK");
        return (
            <tr onClick={() => {this.fetchingAlbum(albums.id)}}>
                <td>
                    <Button bsStyle="danger" onClick={() => {this.confirmDeleteAlbum(albums.id)}}>Delete</Button>
                </td>
                <td>
                    {albums.name}
                </td>
                <td>
                    {albums.artist.name}
                </td>
                <td>
                    MORE STUFF
                </td>
            </tr>
        );
    }
    renderAddAlbum(){
        if(this.state.createAlbum===undefined){
          return(
            <Button bsStyle="success" onClick={() => {this.setState({createAlbum:1})}}>
              Add Album
            </Button>
          );
        }
        return(
          <div>
            <div>
              <div>
                Album Name
              </div>
              <input type="text" value={this.state.value} onChange={this.handleAlbumNameChange} className="AlbumNameInput"/>
            </div>
            <div>
              Album Image
              <input type="file"  encType="multipart" onChange={this.handleAlbumImageChange}/>
            </div>
            <div>
              <DropdownButton title="" className="glyphicon glyphicon-option-horizontal" onSelect={this.selectAlbumArtist}>
                {_.map(this.props.amin,this.artistMenuItems)}
              </DropdownButton>
            </div>
            <button onClick={this.handleCreateAlbum}>
              Submit
            </button>
            <button onClick={()=>this.setState({createAlbum:undefined})}>
              Cancel
            </button>
          </div>
        );
    }
    handleCreateAlbum(){
      if(this.state.albumName===undefined || this.state.newAlbumImage===undefined
        || this.state.artistAlbum===undefined) {
        console.log("Invalid album entry")
        return;
      }
      this.props.createAlbumA(this.state.newAlbumImage,this.state.albumName,this.state.artistAlbum);
      this.setState({createAlbum:undefined});
    }
    selectAlbumArtist(artistId){
      this.setState({artistAlbum:artistId});
    }
    artistMenuItems(artist){
      if(artist===undefined){
        return;
      }
      return(
        <MenuItem eventKey={artist.id}>
          {artist.name}
        </MenuItem>
      );
    }
    handleAlbumNameChange(event){
      this.setState({albumName:event.target.value})
    }
  handleAlbumImageChange(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend=()=>{
      this.setState({
        newAlbumImage:file,
      });
    }
    reader.readAsDataURL(file);
  }

    render() {
        if(this.props.something ) {
            return <div>LOADING</div>
        }
        console.log("SIMON");
        console.log(this);
        //console.log("RENDERING MAIN ADMIN PG");
        return(
            <div className='adminmainpg'>
                <h1>Admin Music Page</h1>
                <Row className=''>
                    <Col xs={6} sm={4} md={4} lg={3}>
                        <h1>Album List</h1>
                      {this.renderAddAlbum()}
                        <Table hover>
                            <thead>
                            <tr>
                                <th>
                                    Delete Album
                                </th>
                                <th>
                                    Album
                                </th>
                                <th>
                                    Artist
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {_.map(this.props.amin2, this.renderAlbums,this)}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={6} sm={8} md={8} lg={9}>
                        {this.renderSongs()}
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state){
    /*if(state.albums.lastName) {
        return {something : ''};
    }*/
    console.log("ADMIN 2 MAP STATE PROPS");
    console.log(state);
    return {amin2: state.amin2, amin3: state.amin3, amin: state.amin};
}

export default connect(mapStateToProps,{fetchAlbums2,
  actDeleteAlbum,fetchAlbumA,removeSongA,fetchArtists2,createAlbumA,changePendingA})(AdminView2)