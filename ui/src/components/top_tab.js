import React, {Component} from 'react';
import {Row, Col, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';

export default class TopTab extends Component{

  render(){
        //activeKey={1}
      //console.log("REGULAR TAB RENDER");
      //console.log(this);
        return(
            <div>
                <div className="top-tabs">
                    <Nav activeKey={this.props.currentPage} bsClass="nav" bsStyle="pills" justified>
                    <IndexLinkContainer to={"/home/artists"}>
                        <NavItem eventKey={1} >
                            Artists
                        </NavItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to={"/home/albums"}>
                        <NavItem eventKey={2} >
                            Albums
                        </NavItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to={"/home/songs"}>
                        <NavItem eventKey={3}>
                            Songs
                        </NavItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to={"/home/playlists"}> 
                        <NavItem eventKey={4}>
                            Playlists
                        </NavItem>
                    </IndexLinkContainer>
                    </Nav>
                </div>
            </div>
        );
    }
    
}


/*

<NavItem eventKey={1} href="/home/artists">Artists</NavItem>
                        <NavItem eventKey={2} href="/home/albums">Albums</NavItem>
                        <NavItem eventKey={3} href="/home/songs">Songs</NavItem>
                        <NavItem eventKey={4} href="/">Playlists</NavItem>


*/

/*

                        <NavItem eventKey={1} onClick = {() => this.props.tabClickHandler(1)}>Artists</NavItem>
                        <NavItem eventKey={2} onClick = {() => this.props.tabClickHandler(2)}>Albums</NavItem>
                        <NavItem eventKey={3} onClick = {() => this.props.tabClickHandler(3)}>Songs</NavItem>
                        <NavItem eventKey={4} onClick = {() => this.props.tabClickHandler(4)}>Playlists</NavItem>
                    

*/