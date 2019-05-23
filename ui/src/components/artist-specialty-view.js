import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {
  Table, Row, Col, Panel, Nav, NavItem, MenuItem, Button, DropdownButton, Navbar, Form,
  FormGroup, ControlLabel, FormControl, PanelGroup
} from 'react-bootstrap';
import _ from 'lodash';
import {fetchArtist, checkLogin, fetchArtistByUserId,fetchAlbumJ,
  renameSongJ,renameArtistJ,updateArtistBioJ,removeSongJ,addSongJ,
  updateAlbumJ,changeArtistProfileJ,createAlbumJ,changePrivacyJ,addConcertJ,updateConcertJ,removeConcertJ} from "../actions/index";

let album = undefined;

class ArtistSpecialtyView extends Component{

  constructor(props) {
    super(props);
    this.getAlbumSongs = this.getAlbumSongs.bind(this);
    this.songOptionHandler=this.songOptionHandler.bind(this);
    this.renderSongs=this.renderSongs.bind(this);
    this.updateSongName=this.updateSongName.bind(this);
    this.handleNewNameChange=this.handleNewNameChange.bind(this);
    this.renderArtistName=this.renderArtistName.bind(this);
    this.changeArtistName=this.changeArtistName.bind(this);
    this.handleNewArtistName=this.handleNewArtistName.bind(this);
    this.handleBioChange=this.handleBioChange.bind(this);
    this.renderBio=this.renderBio.bind(this);
    this.updateArtistBio=this.updateArtistBio.bind(this);
    this.renderAddSongButton=this.renderAddSongButton.bind(this);
    this.handleAudioFileChange=this.handleAudioFileChange.bind(this);
    this.handleNewSongNameChange=this.handleNewSongNameChange.bind(this);
    this.handleNewSongLyricsChange=this.handleNewSongLyricsChange.bind(this);
    this.handleSongSubmit=this.handleSongSubmit.bind(this);
    this.renderArtistHeader=this.renderArtistHeader.bind(this);
    this.renderEditAlbum=this.renderEditAlbum.bind(this);
    this.handleAlbumNameChange=this.handleAlbumNameChange.bind(this);
    this.handleAlbumImageChange=this.handleAlbumImageChange.bind(this);
    this.handleEditAlbumSubmit=this.handleEditAlbumSubmit.bind(this);
    this.handleChangeProfile=this.handleChangeProfile.bind(this);
    this.handleNewProfile=this.handleNewProfile.bind(this);
    this.renderCreateAlbum=this.renderCreateAlbum.bind(this);
    this.handleCreateAlbumSubmit=this.handleCreateAlbumSubmit.bind(this);
    this.handleConcertDescription=this.handleConcertDescription.bind(this);
    this.handleConcertTime=this.handleConcertTime.bind(this);
    this.handleConcertAddress=this.handleConcertAddress.bind(this);
    this.handleConcertDate=this.handleConcertDate.bind(this);
    this.handleCreateConcertSubmit=this.handleCreateConcertSubmit.bind(this);
    this.renderConcertPanel=this.renderConcertPanel.bind(this);
    this.handleUpdateConcertSubmit=this.handleUpdateConcertSubmit.bind(this);
  }

    componentWillMount(){
        if(this.props.userId != undefined){
            console.log("if statement reached");
            this.props.fetchArtistByUserId(this.props.userId);
        }
      this.setState({SongNameInput:-1});
      this.setState({CurrentAlbumId:undefined});
      this.setState({renameArtist:undefined});
      this.setState({ArtistBio:undefined});
      this.setState({newSongForm:undefined});
      this.setState({editAlbum:undefined});
        album = undefined;
    }
    removeSong(songId){
      if(songId===undefined){
        console.log("SongId is undefined");
      }
      this.props.removeSongJ(songId);
      this.props.fetchAlbumJ(this.state.CurrentAlbumId);
    }

    songOptionHandler(song,event){
      if(event==3){
        this.removeSong(song.id)
      }
      else if(event==2){
        console.log("Change Privacy");
        this.props.changePrivacyJ(song.id);
      }
      else if(event==1){
        console.log("Render input for rename");
        this.setState({SongNameInput:song.id});
        console.log(this);
      }
    }
    renderBio(artist){
      if(this.state.ArtistBio===undefined){
        console.log("Display artist bio");
        return(
          <div>
            <div className="pre-scrollable ArtistBioText">
              {artist.description}
            </div>
            <div>
              <Button className="EditArtistBioButton" onClick={()=>this.setState({ArtistBio:1})}>
                Edit
              </Button>
            </div>
          </div>
        );
      }
      console.log("edit artist bio");
      return(
        <div>
          <textarea className="ArtistBioTextArea" defaultValue={artist.description} onChange={this.handleBioChange}/>
          <div>
            <Button onClick={this.updateArtistBio}>
              Submit
            </Button>
            <Button onClick={()=> this.setState({ArtistBio:undefined})}>
              Cancel
            </Button>
          </div>
        </div>
      );
    }
    updateArtistBio(){
      if(this.state.newBio===undefined){
        console.log("Invalid Bio entry")
        this.setState({ArtistBio:undefined})
        return;
      }
      console.log("Updated Bio Entry");
      this.props.updateArtistBioJ(this.props.albums.id,this.state.newBio);
      this.setState({ArtistBio:undefined});
    }

    renderArtistName(artist){
      if(this.state.renameArtist===undefined){
        console.log("Display Artist Name")
        return(
          <div>
            <label>
              {this.props.albums.name}
            </label>
            <Button className="ArtistChangeNameButton" onClick={()=>(this.setState({renameArtist:1}))}>
              Change Name
            </Button>
          </div>
        );
      }
      console.log("Rename Artist")
      return(
        <div className="input-group">
          <input type="text" className="form-control ChangeArtistNameButton" defaultValue={artist.name}
                 value={this.state.value} onChange={this.handleNewArtistName}/>
          <div className="input-group-btn">
            <Button onClick={this.changeArtistName}>
              Submit
            </Button>
            <Button onClick={()=>(this.setState({renameArtist:undefined}))}>
              Cancel
            </Button>
          </div>
        </div>
      );
    }
    changeArtistName(){
      console.log(this.state.newArtistName);
      if(this.state.newArtistName===undefined ||
        this.state.newArtistName===""){
        console.log("Invalid Name Change");
        return;
      }
      this.props.renameArtistJ(this.props.albums.id,this.state.newArtistName);
      this.setState({renameArtist:undefined});
      this.props.checkLogin();
    }
    handleNewArtistName(event){
      this.setState({newArtistName:event.target.value})
    }

    renderSongName(song){
      if(this.state.SongNameInput!=song.id){
        console.log("Don't Show song name input");
        return(
          <div>
            {song.name}
          </div>
        )
      }
      var songToRename = song;
      return(
      <div className="input-group">
        <input type="text" className="form-control ChangeSongNameButton" defaultValue={song.name}
               value={this.state.value} onChange={this.handleNewNameChange}/>
        <div className="input-group-btn">
          <Button onClick={this.updateSongName.bind(songToRename,this.state.newSongName)}>
            Submit
          </Button>
          <Button onClick={()=>(this.setState({SongNameInput:-1}))}>
            Cancel
          </Button>
        </div>
      </div>
      );
    }
    handleBioChange(event){
      this.setState({newBio:event.target.value})
    }

    handleNewNameChange(event){
      this.setState({newSongName:event.target.value})
    }

    updateSongName(song){
      var newName = this.state.newSongName;
      if(newName===undefined || newName===""){
        console.log("Invalid Song Name")
        return;
      }
      console.log("Updating Song Name");
      console.log(newName);
      this.props.renameSongJ(this.state.SongNameInput,newName);
      this.props.fetchAlbumJ(this.state.CurrentAlbumId);
      console.log("Name Updated");
      this.setState({SongNameInput:-1});
    }

    getAlbumSongs(albumId){
      if(albumId === undefined){
        console.log("NO Songs")
        return <tr></tr>;
      }
      console.log("Test get Album")
      this.setState({CurrentAlbumId:albumId});
      this.props.fetchAlbumJ(albumId);
      console.log("Album Id was");
      console.log({albumId});
      console.log("new props");
      console.log(this);
      album = this.props.album;
    }

    renderAlbums(album){
        if(album == undefined){
            return
        }
        console.log(this);

        return(
          <NavItem key={album.id} eventKey={album.id}>
            <div>
              <Col>
                <img  src={album.artSrc} className="ArtistPageAlbumImg"/>
              </Col>
              <Col>
                {album.name}
              </Col>
            </div>
          </NavItem>
        );
    }

    renderSongs(song){
        if(song === undefined){
          return <tr></tr>;
        }
        return(
          <tr key={song.id} className="SongInfoRow">
            <td>{song.trackNumber}</td>
            <td>{this.renderSongName(song)}</td>
            <td>{song.plays}</td>
            <td>{song.rating}</td>
            <td>${song.plays * .01}</td>
            <td>{this.renderSongPrivacy(song.privacy)}</td>
            <td>{this.renderSongPending(song.pending)}</td>
            <td><DropdownButton eventKey={3} title=""
                                className="glyphicon glyphicon-option-horizontal"
                                onSelect={this.songOptionHandler.bind(this,song)}>
              <MenuItem eventKey='1'>Rename Song</MenuItem>
              <MenuItem eventKey='2'>{this.renderPrivatePublic(song.privacy)}</MenuItem>
              <MenuItem eventKey='3'>Remove Song</MenuItem>
            </DropdownButton>
            </td>
          </tr>
          );
    }
    renderPrivatePublic(privacy){
      if(privacy==1){
        return "Set Song to Public";
      }
      else{
        return "Set Song to Private";
      }
    }
  renderSongPrivacy(privacy){
    if(privacy==1){
      return "Yes";
    }
    else{
      return "No";
    }
  }
  renderSongPending(pending){
    if(pending==1){
      return "Yes";
    }
    else{
      return "No";
    }
  }
    renderAddSongButton(){
      if(this.state.CurrentAlbumId===undefined){
        return <div></div>
      }
      else if(this.state.newSongForm===undefined) {
        return (
          <Button onClick={()=>this.setState({newSongForm:1})}>
            Add Song
          </Button>
        );
      }
      const {handleSubmit}=this.props;
      return(
        <form onSubmit={this.handleSongSubmit}>
          <div>
            <div>
              Song Name
            </div>
            <input type="text" value={this.state.value} onChange={this.handleNewSongNameChange} className="SongNameInput"/>
          </div>
          <div>
            <div>
              Song Lyrics
            </div>
            <textarea onChange={this.handleNewSongLyricsChange} className="TextBox"/>
          </div>
          <div>
            Song File
            <input type="file"  encType="multipart" onChange={this.handleAudioFileChange}/>
          </div>
          <button type="submit">
            Submit
          </button>
          <button onClick={()=>this.setState({newSongForm:undefined})}>
            Cancel
          </button>
        </form>
      );
    }

    handleSongSubmit(e){
      e.preventDefault();
      if(this.state.newAudio===undefined || this.state.newSongName===undefined ||
        this.state.newSongLyric===undefined || this.state.CurrentAlbumId===undefined){
        console.log("Invalid Entry");
        return;
        }
      this.props.addSongJ(this.state.newAudio,
        this.state.newSongName,this.state.newSongLyric,this.state.CurrentAlbumId);
      this.setState({newSongForm:undefined});

    }

    handleAudioFileChange(e){
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend=()=>{
        this.setState({
          newAudio:file,
        });
      }
      reader.readAsDataURL(file);
    }

    handleNewSongNameChange(e){
      this.setState({newSongName:e.target.value});
    }
    handleNewSongLyricsChange(e){
      this.setState({newSongLyric:e.target.value});
    }

    getMonthlyAlbumPlays(album){
      if(album===undefined || album.songs===undefined){
        return 0;
      }
      var total=0;
      for(var i in album.songs){
        total=total+album.songs[i].plays;
      }
      return total;
    }
    getMonthlyAlbumRevenue(album){
      if(album===undefined){
        return 0;
      }
      var total=0;
      for(var i in album.songs){
        total=total+(album.songs[i].plays*.01)
      }
      return total.toFixed(2);
    }
    getArtistMonthlyPlays(artist){
      if(artist===undefined){
        return 0;
      }
      var total=0;
      for(var albumId in artist.albums){
        for(var songId in artist.albums[albumId].songs){
          total = total+artist.albums[albumId].songs[songId].plays;
        }
      }
      return total;
    }
  getArtistMonthlyRevenue(artist){
    if(artist===undefined){
      console.log("artist undefined")
      return 0;
    }
    var total=0;
    for(var albumId in artist.albums){
      for(var songId in artist.albums[albumId].songs){
        total = total+(artist.albums[albumId].songs[songId].plays*.01);
      }
    }
    return total.toFixed(2);
  }
  handleChangeProfile(e){
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend=()=>{
      this.handleNewProfile(file);
    }
    reader.readAsDataURL(file);
  }
  handleNewProfile(file){
    console.log("NewProfile");
    console.log(this.state);
    if(file===undefined){
      console.log("invalid profile entry")
      return;
    }
    console.log("ChangeProfile");
    this.props.changeArtistProfileJ(file,
      this.props.albums.id,this.props.albums.name);
  }

  renderArtistHeader(artist){
    return(
      <div>
        <img src={artist.artSrc} className="ArtistProfile"/>
        {this.renderArtistName(artist)}
        <form>
          <input type="file" encType="multipart" onChange={this.handleChangeProfile} />
        </form>
      </div>
    );
  }
  handleAlbumNameChange(e){
    this.setState({newAlbumName:e.target.value})
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
  handleEditAlbumSubmit(e){
    e.preventDefault();
    if((this.state.newAlbumImage===undefined && this.state.newAlbumName) ||
      this.state.CurrentAlbumId===undefined){
      console.log("Invalid Entry for Album");
      return;
    }
    this.props.updateAlbumJ(this.state.newAlbumImage,this.state.newAlbumName,this.state.CurrentAlbumId)
    this.setState({editAlbum:undefined});

  }
  renderEditAlbum(){
    if(this.state.editAlbum===undefined) {
      var active;
      if (this.state.CurrentAlbumId === undefined) {
        active = true;
      }
      else {
        active = false;
      }
      return (
        <div>
          <button disabled={active} onClick={() => this.setState({editAlbum: 1})}>
            Edit Album
          </button>
        </div>
      );
    }
      return(
        <form onSubmit={this.handleEditAlbumSubmit}>
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
          <button type="submit">
            Submit
          </button>
          <button onClick={()=>this.setState({editAlbum:undefined})}>
            Cancel
          </button>
        </form>
      );
  }
  renderCreateAlbum(){
    if(this.state.createAlbum===undefined){
      return(
        <div>
          <button onClick={()=>this.setState({createAlbum:1})}>
            Create Album
          </button>
        </div>
      );
    }
    return(
      <div>
        <form onSubmit={this.handleCreateAlbumSubmit}>
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
          <button type="submit">
            Submit
          </button>
          <button onClick={()=>this.setState({createAlbum:undefined})}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
  handleCreateAlbumSubmit(e){
    e.preventDefault();
    if((this.state.newAlbumImage===undefined && this.state.newAlbumName)){
      console.log("Invalid Entry for Album");
      return;
    }
    this.props.createAlbumJ(this.state.newAlbumImage,this.state.newAlbumName,this.props.albums.id);
    this.setState({createAlbum:undefined});

  }
  renderConcertPanelGroup(){
    return(
      <PanelGroup>
        {_.map(this.props.albums.concerts,this.renderConcertPanel)}
        {this.renderCreateConcertPanel()}
      </PanelGroup>
    );
  }
  renderCreateConcertPanel(){
    return(
      <Panel collapsible header="Create Concert" className="ConcertPanel">
          <div>
            Date
            <input type="text" className="ConcertInput" value={this.state.value} onChange={this.handleConcertDate}/>
            Time
            <input type="text" value={this.state.value} onChange={this.handleConcertTime}/>
            Address
            <input type="text" value={this.state.value} onChange={this.handleConcertAddress}/>
          </div>
          Description
          <textarea className="TextBox" onChange={this.handleConcertDescription}/>
          <button onClick={this.handleCreateConcertSubmit}>
            Submit
          </button>
      </Panel>
    );
  }
  renderConcertPanel(concert){
    return(
      <Panel collapsible header={concert.date} className="ConcertPanel" eventKey={concert.id}>
        <div>
          Date
          <input type="text" className="ConcertInput"
                 defaultValue={concert.date} value={this.state.value} onChange={this.handleConcertDate}/>
          Time
          <input type="text" value={this.state.value}
                 defaultValue={concert.time} onChange={this.handleConcertTime}/>
          Address
          <input type="text" value={this.state.value}
                 defaultValue={concert.address} onChange={this.handleConcertAddress}/>
        </div>
        Description
        <textarea className="TextBox"
                  defaultValue={concert.description} onChange={this.handleConcertDescription}/>
      </Panel>
    );
  }
  handleConcertDate(event){
    this.setState({concertDate:event.target.value})
  }
  handleConcertTime(event){
    this.setState({concertTime:event.target.value})
  }
  handleConcertAddress(event){
    this.setState({concertAddress:event.target.value})
  }
  handleConcertDescription(event){
    this.setState({concertDescription:event.target.value})
  }
  handleCreateConcertSubmit(e){
    if(this.state.concertDate===undefined || this.state.concertDescription===undefined ||
      this.state.concertTime===undefined || this.state.concertAddress===undefined){
      console.log("Invalid Entry for Concert");
      return;
    }
    console.log("Add concert Info");
    this.props.addConcertJ(this.props.albums.id,this.state.concertDate,
      this.state.concertTime,this.state.concertAddress,this.state.concertDescription);
  }
  handleUpdateConcertSubmit(concertId) {
    if (this.state.concertDate === undefined || this.state.concertDescription === undefined ||
      this.state.concertTime === undefined || this.state.concertAddress === undefined) {
      console.log("Invalid Entry for Concert");
      return;
    }
    console.log("Add concert Info");
    this.props.updateConcertJ(this.props.albums.id, concertId, this.state.concertDate,
      this.state.concertTime, this.state.concertAddress, this.state.concertDescription);
    this.setState({concertDate: undefined});
    this.setState({concertAddress: undefined});
    this.setState({concertDescription: undefined});
    this.setState({concertTime: undefined});
  }



    render(){
        console.log(this);
        console.log(this.props.albums);
        const artist = this.props.albums;
        album = this.props.album;
        console.log(album);

        return(
            <div className="container-fluid container-full ArtistSpecialtyContent">
              <Col xs={4} sm={4} md={4} lg={4} >
                {this.renderArtistHeader(artist)}
                {this.renderEditAlbum()}
                <div className="pre-scrollable AlbumColumn">
                  <Nav onSelect={this.getAlbumSongs}>
                    {_.map(artist.albums,this.renderAlbums)}
                    </Nav>
                </div>
                {this.renderCreateAlbum()}
              </Col>
              <Col xs={8} sm={8} md={8} lg={8} className="">
                <div className="pre-scrollable songTableDiv">
                  <table className="SongTable" >
                    <tbody>
                    <tr>
                      <td>
                        Track
                      </td>
                      <td>
                        Name
                      </td>
                      <td>
                        Plays
                      </td>
                      <td>
                        Rating
                      </td>
                      <td>
                        Revenue
                      </td>
                      <td>
                        Private
                      </td>
                      <td>
                        Pending
                      </td>
                    </tr>
                    {_.map(album.songs,this.renderSongs)}
                    </tbody>
                  </table>
                </div>
                <div>
                  {this.renderAddSongButton()}
                </div>
                <br/>
                <div className="container AlbumStatsContainer">
                  <Row className="row">
                    <Col xs={6} sm={6} md={6} lg={6} className="col">
                      Album Monthly Plays: {this.getMonthlyAlbumPlays(album)}
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} className="col">
                      Album Monthly Revenue: ${this.getMonthlyAlbumRevenue(album)}
                    </Col>
                  </Row>
                </div>
                <br/>
                <div className="container ArtistStatsContainer">
                  <Row className="row">
                    <Col xs={4} sm={4} md={4} lg={4} className="col">
                      Artist Monthly Plays: {this.getArtistMonthlyPlays(artist)}
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} className="col">
                      Artist Monthly Revenue: ${this.getArtistMonthlyRevenue(artist)}
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4} className="col">
                      Number of Followers: {artist.followers}
                    </Col>
                  </Row>
                </div>
                <br/>
                <div>
                  <Row className="container">
                    <Col>
                      <div>
                        <label>
                          Artist Description
                        </label>
                      </div>
                      {this.renderBio(artist)}
                      <div>
                        {this.state.imageSrc}
                      </div>
                    </Col>
                  </Row>
                  Concert Information
                  {this.renderConcertPanelGroup()}
                </div>
              </Col>
             </div>
         );
    }
}
function mapStateToProps(state){
  return {album : state.album, albums : state.albums};
}


export default connect(mapStateToProps,{fetchArtist,checkLogin,
  fetchArtistByUserId,fetchAlbumJ,renameSongJ,renameArtistJ,
  updateArtistBioJ,removeSongJ,addSongJ,updateAlbumJ,
  changeArtistProfileJ,createAlbumJ,changePrivacyJ,addConcertJ,updateConcertJ,removeConcertJ})(ArtistSpecialtyView)