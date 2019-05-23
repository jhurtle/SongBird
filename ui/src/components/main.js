import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import Sidebar from './sidebar';
import {fetchAlbums, fetchArtists} from '../actions/index';
import Cbar from './cbar';
import Content from './content';
import PlayBar from './playbar';
import AlbumView from './album-view';

let counter =4;

class Main extends Component {

  componentDidMount(){
  }

  render() {
    return (
      <div className='container-fluid container-full'>
        <Row>
            <Col xs={2} sm={2} md={2} lg={2} className="sidebar-fixed">
                <Cbar/>
              </Col>
              <Col xs={10} sm={10} md={10} lg={10} className="fill-div">
               <Content subpage={this.props.subpage} thisMatch={this.props.thisMatch}/>
                <PlayBar/>
              </Col>
          </Row>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {albums: state.albums};
}

export default connect(mapStateToProps,{fetchAlbums,fetchArtists})(Main);