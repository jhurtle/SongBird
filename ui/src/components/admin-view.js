import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {Table, Row, Col, Button, DropdownButton,MenuItem,Form} from 'react-bootstrap';
import _ from 'lodash';


//import AdminTab from './admin_tab';

import { IndexLinkContainer } from 'react-router-bootstrap';

import {fetchUsers,fetchArtists2,actDeleteUser,upgradeUser2Artist,downgradeArtist,actDeleteArtist,actCreateAccountA,
    banUser} from '../actions/index'

class AdminView extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selectedid: undefined,
          email: '',
          password: '',
          password_confirm: '',
          first_name: '',
          last_name: ''
        };
        this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
        this.confirmDeleteArtist=this.confirmDeleteArtist.bind(this);
        this.confirmUpgradeUser2Artist = this.confirmUpgradeUser2Artist.bind(this);
        this.confirmDowngradeArtist = this.confirmDowngradeArtist.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.selectArtistOption = this.selectArtistOption.bind(this);
        this.outputRole = this.outputRole.bind(this);
        this.createUser = this.createUser.bind(this);
        this.clickCreate = this.clickCreate.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlecPassword = this.handlecPassword.bind(this);
        this.submitting = this.submitting.bind(this);
        this.banning = this.banning.bind(this);
    }

    componentWillMount() {
        //this.setState({selectedid: undefined});
        this.props.fetchUsers();
        this.props.fetchArtists2();
        //console.log("CHECKING");
    }

    confirmDeleteUser(id) {
        //console.log(event);
        //event.preventDefault();
        console.log("DELETE USER OPTION SELECTED");
        console.log(id);
        this.props.actDeleteUser(id);
        console.log("DELETED USER");
    }

    submitting() {
        console.log("SUBMIT button was pressed");
        console.log(this);
        this.props.actCreateAccountA(
            {
                "email": this.state.email,
                "password": this.state.password,
                "password_confirm":this.state.password_confirm,
                "first_name": this.state.first_name,
                "last_name": this.state.last_name
            }
        );
        this.setState({selectedid:undefined});
        this.props.fetchUsers();
        this.props.fetchArtists2();
        //this.setState({});
    }

    confirmDowngradeArtist(id) {
        console.log("DOWNGRADE ARTIST OPTION SELECTED");
        console.log(id);
        this.props.downgradeArtist(id);
        console.log("DOWNGRADING ARTIST");
        //console.log(this);
        //this.props.fetchUsers();
        //this.props.fetchArtists2();
        //this.forceUpdate();
        this.props.fetchUsers();
        this.props.fetchArtists2();
        //console.log("AFTER DOWN");
        //console.log(this);
        //this.setState({});
    }

    confirmDeleteArtist(id) {
        console.log("DELETE ARTIST OPTION SELECTED");
        console.log(id);
        this.props.actDeleteArtist(id);
    }

    banning(id) {
        console.log("BANNNING ACTION");
        console.log(id);
        this.props.banUser(id);
        this.props.fetchUsers();
        this.props.fetchArtists2();
    }

    onSubmit(values) {
        console.log("READY TO SUBMIT");
        this.props.actCreateAccount(values);
        console.log("SUBMITTED");
    }

    handleFirstName(event) {
        //event.preventDefault();
        this.setState({first_name:event.target.value})
    }

    handleLastName(event) {
        this.setState({last_name:event.target.value})
    }

    handleEmail(event) {
        this.setState({email:event.target.value})
    }

    handlePassword(event) {
        this.setState({password:event.target.value})
    }

    handlecPassword(event) {
        this.setState({password_confirm:event.target.value})
    }

    createUser() {
        if(this.state.selectedid === undefined) {
            return;
        }
        /*
        <div>
                <h1>Create an Account</h1>
                <div>
                First Name
                <input type="text" className="FieldTextAdmin" onChange={this.handleFirstName}/>
                </div>
                <div>
                Last Name
                <input type="text" className="FieldTextAdmin" onChange={this.handleLastName}/>
                </div>
                <div>
                    Email
                    <input type="text" className="FieldTextAdmin" onChange={this.handleEmail}/>
                </div>
                <div>
                    Password
                    <input type="text" className="FieldTextAdmin" onChange={this.handlePassword}/>
                </div>
                <div>
                    Password Confirm
                    <input type="text" className="FieldTextAdmin" onChange={this.handlecPassword}/>
                </div>
            </div>
         */
        console.log("CREATE USER STUFF GOES HERE:");
        return (
            <div>
                <h1>Create an Account</h1>
                <div>
                First Name
                <input type="text" className="FieldTextAdmin" onChange={this.handleFirstName}/>
                </div>
                <div>
                Last Name
                <input type="text" className="FieldTextAdmin" onChange={this.handleLastName}/>
                </div>
                <div>
                    Email
                    <input type="text" className="FieldTextAdmin" onChange={this.handleEmail}/>
                </div>
                <div>
                    Password
                    <input type="text" className="FieldTextAdmin" onChange={this.handlePassword}/>
                </div>
                <div>
                    Password Confirm
                    <input type="text" className="FieldTextAdmin" onChange={this.handlecPassword}/>
                </div>
                <div>
                    <Button onClick={() => {this.submitting()}}>Submit</Button>
                </div>
            </div>

        );
    }

    clickCreate() {
        console.log("CREATE USER WAS CLICKED");
        this.setState({selectedid:1});
    }

    confirmUpgradeUser2Artist(id) {
        console.log("UPGRADE TO ARTIST OPTION SELECTED");
        this.props.upgradeUser2Artist(id);
        console.log("UPGRADING TO ARTIST");
        //console.log(this);
        //this.props.fetchUsers();
        this.forceUpdate();
        this.props.fetchArtists2();
        this.props.fetchUsers();
        //this.props.fetchArtists2();
        //console.log("AFTER UPGRADE");
        //console.log(this);
        //this.setState({});
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
            {this.banning(id)}
            //{this.confirmDowngradeArtist(id)}
        }
    }

    selectArtistOption(artist, event) {
        if(event == 8) {
            console.log("Downgrade Artist selected");
            {this.confirmDowngradeArtist(artist.user.id)}
        }
    }

    outputRole(role) {
        if(role == 0) {
            //console.log("BASIC");
            return (
                <p>Basic</p>
            );
        }
        else if(role == 1) {
            //console.log("PREMIUM");
            return (<p>Premium</p>);
        }
        else if(role == 2) {
            //console.log("ARTIST");
            return (<p>Artist</p>);
        }
        else if(role == 3) {
            //console.log("ADMIN");
            return (<p>Admin</p>);
        }

    }

    renderUsers(users) {
        console.log("JOHNNY ")
        console.log(users);
        //this.setState({});
        if(users==undefined) {
            console.log("NOTHING HERE");
            //return <tr></tr>

        }

        if(this === undefined) {
           // return <div></div>
            console.log("UNDEF");
        }

        if(users.id === this.props.user.userId) {
            console.log("ADMIN SKIP");
            return;
        }

        if(users.banned == 1) {
            return(
                <tr className="banned-user-row">
                    <td>
                        <Button bsStyle="danger" onClick={() => {this.confirmDeleteUser(users.id)}}>Delete</Button>
                    </td>
                    <td>
                        {users.email}
                    </td>
                    <td>
                        {this.outputRole(users.role)}
                    </td>
                    <td>
                        <DropdownButton title="More" bsStyle="info" onSelect={this.selectOption.bind(this,users.id)}>
                            <MenuItem eventKey="1" >Upgrade to Artist</MenuItem>
                            <MenuItem eventKey="2">Upgrade to Premium</MenuItem>
                            <MenuItem eventKey="3">UnBan User</MenuItem>
                        </DropdownButton>
                    </td>
                </tr>
            );
        }
        //console.log(users.role);
        return(
            <tr>
                <td>
                    <Button bsStyle="danger" onClick={() => {this.confirmDeleteUser(users.id)}}>Delete</Button>
                </td>
                <td>
                    {users.email}
                </td>
                <td>
                    {this.outputRole(users.role)}
                </td>
                <td>
                    <DropdownButton title="More" bsStyle="info" onSelect={this.selectOption.bind(this,users.id)}>
                        <MenuItem eventKey="1" >Upgrade to Artist</MenuItem>
                        <MenuItem eventKey="2">Upgrade to Premium</MenuItem>
                        <MenuItem eventKey="3">Ban User</MenuItem>
                    </DropdownButton>
                </td>
            </tr>
        );
    }

    renderArtists(arti) {
        if(arti===undefined) {
            console.log("NO ARTISTS HERE");

        }
        console.log("RENDERING ARTIST");
        //console.log(arti);
        //console.log(arti.name);
        return(
            <tr>
                <td>
                    <Button bsStyle="danger" onClick={() => {this.confirmDeleteArtist(arti.id)}}>Delete</Button>
                </td>
                <td>
                    {arti.name}
                </td>
                <td>
                    <DropdownButton title="More" bsStyle="info" onSelect={this.selectArtistOption.bind(this,arti)}>
                        <MenuItem eventKey="8">Downgrade Artist</MenuItem>
                    </DropdownButton>
                </td>
            </tr>
        );
    }

    render() {
        console.log("RENDERING MAIN ADMIN PAGE");
        console.log(this);
        return(
                <div className='adminmainpg'>
                    <h1>Admin Main Page</h1>
                    <Row className=''>
                    <Col xs={6} sm={4} md={4} lg={3}>
                        <h1>User List</h1>
                        <Button bsStyle="success" onClick={() => {this.clickCreate()}}>Add User</Button>
                        <div>{this.createUser()}</div>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>
                                    Delete User
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Role
                                </th>
                                <th>
                                    More Options
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {_.map(this.props.albums, this.renderUsers, this)}
                            </tbody>
                        </Table>
                    </Col>
                        <Col xs={6} sm={8} md={8} lg={9}>
                            <h1>Artist List</h1>
                            <Table hover>
                                <thead>
                                <tr>
                                    <th>
                                        Remove Artist
                                    </th>
                                    <th>
                                        Artist Name
                                    </th>
                                    <th>
                                        More Options
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    {_.map(this.props.amin, this.renderArtists, this)}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
        );
    }
}

function mapStateToProps(state){
  return {albums: state.albums,amin: state.amin, amin4:state.amin4, user:state.user};
}


export default connect(mapStateToProps,{fetchUsers,actDeleteUser,fetchArtists2,
    upgradeUser2Artist,downgradeArtist,actDeleteArtist,actCreateAccountA,banUser})(AdminView)