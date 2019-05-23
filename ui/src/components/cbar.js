import React, {Component} from 'react';
import {Nav, NavItem, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import BlockButton from './block-button';
import GoodAfternoon from './good-afternoon';
import SearchBar from './search-bar';
import { IndexLinkContainer } from 'react-router-bootstrap';

class Cbar extends Component{

    renderSpecialtyButtons(){
        console.log("RENDER SPECIALTY BUTTONS");
        console.log(this);
        if(this.props.user.role === 2){
            return(
            <IndexLinkContainer to={"/home/artist"}>
                    <Button className="specialty-button">Artist</Button>
                </IndexLinkContainer>
            );
        } else if (this.props.user.role === 3){
            return(
                <div>
                <IndexLinkContainer to={"/home/admin"}>
                    <Button className="specialty-button">Admin - Users</Button>
                </IndexLinkContainer>
                <IndexLinkContainer to={"/home/admin2"}>
                        <Button className="specialty-button">Admin - Music</Button>
                </IndexLinkContainer>
                    <IndexLinkContainer to={"/home/admin3"}>
                        <Button className="specialty-button">Admin - Statistics</Button>
                    </IndexLinkContainer>
                </div>
            );
        }

    }

    render(){
        return( 
            <div className="sidebar-wrapper">
              <img className="logo-sidebar" src='/images/logo_wide_white.png' />
                <GoodAfternoon name={this.props.user.first_name}/>
              <Nav bsSize="pills" stacked activeKey={1}>
                <IndexLinkContainer to={"/home/albums"}>
                    <NavItem eventKey={1} >Your Music</NavItem>
                </IndexLinkContainer>

                <IndexLinkContainer to={"/home/songs"}>
                <NavItem eventKey={2} >Party Music</NavItem>
                </IndexLinkContainer>

                <IndexLinkContainer to={"/home/songs"}>
                <NavItem eventKey={3} >Chill Beats</NavItem>
                </IndexLinkContainer>

                <IndexLinkContainer to={"/home/songs"}>
                <NavItem eventKey={5} >Relaxing</NavItem>
                </IndexLinkContainer>
                
                <IndexLinkContainer to={"/home/songs"}>
                <NavItem eventKey={6} >Study Tunes</NavItem>
                </IndexLinkContainer>
                
                <IndexLinkContainer to={"/home/songs"}>
                <NavItem eventKey={7} >Workout Mix</NavItem>
                </IndexLinkContainer>
                
                <IndexLinkContainer to={"/home/songs"}>
                <NavItem eventKey={8} >More Playlists*</NavItem>
                </IndexLinkContainer>
                
              </Nav>
                <div className="cbar-bottom-buttons">
                <Nav>
                <IndexLinkContainer to={"/home/addPlaylist"}>
                        <Button className="add-playlist-button">Add Playlist</Button>
                    </IndexLinkContainer>
                {this.renderSpecialtyButtons()}
                    
                <IndexLinkContainer to={"/logout"}>
                        <Button className="add-playlist-button">Logout</Button>
                    </IndexLinkContainer>
                </Nav>
                </div>
            </div>

        );
    }
}

/*


<IndexLinkContainer to={"/logout"}>
                    <NavItem eventKey={2} >Logout</NavItem>
                </IndexLinkContainer>

*/

function mapStateToProps(state){
    return {user: state.user}
}

export default connect(mapStateToProps, {})(Cbar)