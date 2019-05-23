import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Tabs, Tab} from 'material-ui/Tabs';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {fetchArtist} from "../actions/index";

const loadingStyle = {
  container: {
    position: 'absolute',
    width:'1 videoWidth'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    paddingRight:'auto',
    paddingLeft:'auto'
  },
};

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class ArtistView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  componentWillMount(){
    if(this.props.keyId != undefined){
      this.props.fetchArtist(this.props.keyId);
    }
  }

  renderSongs(){
    return(
      <div>
      <li >Song name</li>
        <li >Song name</li>
        <li >Song name</li>
        <li >Song name</li>
        <li >Song name</li>
        <li >Song name</li>
        <li >Song name</li>
        <li >Song name</li>
        <li >Song name</li>
        <li >Song name</li>
      </div>
    );
  }
  renderAlbums(album){
    return(
      <div key={album.id} className={'col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 pad-sides'}>
        <div className={'media-object'}>
          <img className="twoBYtwo" src={album.artSrc} />
        </div>
        <div className={'mo-info'}>
          <p>{album.name}</p>
        </div>
        <div className={'text-center'}>
          <p>{album.artist.name}</p>
        </div>
      </div>
    );
  }

  render(){
    const artist=this.props.artist;
    if(artist.followers===undefined){
      console.log('was in if staement');
      return (
        <div style={loadingStyle.container}>
          <RefreshIndicator
            size={400}
            left={70}
            top={0}
            loadingColor="#1db954"
            status="loading"
            style={loadingStyle.refresh}
          />
        </div>
      );
    }
    return(
      <div>
        <section>
          <header className={'artist-header'}>
            <span className={'followers'}>{`${artist.followers} FOLLOWERS`}</span>
            <h1 className={'artist-name'}>{artist.name}</h1>
            <div className={'header-buttons'}>
              <button className={'btn-blue'}>PLAY</button>
              <button className={'btn-black'}> FOLLOW</button>
            </div>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              className="dashboard-tabs"
            >
              <Tab label="OVERVIEW" value="a">
                <div className={'text-center'}>
                  <section className={'artist-music'}>
                    <div className={'row'}>
                      <h1 className={'subheading'}>Popular</h1>
                      <section className={'contentSpacing col-sm-12 col-md-10 artist-toptracks'}>
                        <section style={{display:'block'}}>
                          <ol className={'songlist'}>
                            {this.renderSongs}
                          </ol>
                        </section>
                      </section>
                    </div>
                  </section>
                  <section className={'artist-music'}>
                    <div  className={'contentSpacing'}>
                      <h1 className={'subheading'}>Albums</h1>
                      <div className={'container-fluid'}>
                        <div className={'flex-grid'}>
                          {_.map(artist.albums,this.renderAlbums)}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </Tab>
              <Tab label="RELATED ARTISTS" value="b">
                <div>

                </div>
              </Tab>
              <Tab label="ABOUT" value="c">
                <div className={'about-container'}>
                  <div className={'rowe'}>
                    <section className={'col-md-12 about-artist'}>
                      <p style={{paddingLeft:'12%',paddingRight:'10%'}}>{artist.description}</p>
                    </section>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </header>

        </section>
      </div>
    );

  }
}

function mapStateToProps(state){
  return {artist: state.albums};
}

export default connect(mapStateToProps,{fetchArtist})(ArtistView)


    /*<nav className={'artist-nav'}>
              <ul className={'navlist'}>
                <li className={'navitem'}>
                  <a>OVERVIEW</a>
                </li>
                <li className={'navitem'}>
                  <a>RELATED ARTISTS</a>
                </li>
                <li className={'navitem'}>
                  <a>ABOUT</a>
                </li>
              </ul>
            </nav>*/