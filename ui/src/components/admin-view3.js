import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table, Row, Col, Button, DropdownButton,MenuItem} from 'react-bootstrap';
import _ from 'lodash';


//import AdminTab from './admin_tab';

import { IndexLinkContainer } from 'react-router-bootstrap';

import {fetchAlbums2,actDeleteAlbum,fetchAlbumA,removeSongA} from '../actions/index'

class AdminView3 extends Component{
    constructor(props) {
        super(props);
        this.state={
            selectid3:undefined
        }
        this.confirmDeleteAlbum = this.confirmDeleteAlbum.bind(this);
        this.fetchingAlbum = this.fetchingAlbum.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
        this.clickCreateAlbum = this.clickCreateAlbum(this);
        this.cAlbum = this.cAlbum(this);
        this.testfunction = this.testfunction(this);
    }


    componentWillMount() {
        this.props.fetchAlbums2();
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.selectid2 != undefined) {
            fetchAlbumA(this.state.selectid2);
        }
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
                    <DropdownButton title="More" bsStyle="info">

                    </DropdownButton>
                </td>

            </tr>

        );
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


    render() {
        if(this.props.something ) {
            return <div>LOADING</div>
        }
        console.log("SIMON");
        console.log(this);
        //console.log("RENDERING MAIN ADMIN PG");
        return(
          <div className="container-fluid container-full">
              <Col xs={4} sm={4} md={4} lg={4}>
                <div>
                  Top 5 Most Played Songs
                </div>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <div>
                  Top 5 Most Popular Artists
                </div>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                <div>
                </div>
              </Col>
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
    return {amin2: state.amin2, amin3: state.amin3};
}

export default connect(mapStateToProps,{fetchAlbums2,actDeleteAlbum,fetchAlbumA,removeSongA})(AdminView3)