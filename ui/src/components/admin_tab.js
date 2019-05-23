import React, {Component} from 'react';
import {Row, Col, Nav, NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';

export default class AdminTab extends Component{

    render() {
        console.log("ADMIN TAB RENDER");
        console.log(this);
        return(
            <div>
                <div className="admin-tabs">
                    <Nav activeKey={this.props.currentAdminPage} bsClass="nav" bsStyle="pills" justified>
                        <IndexLinkContainer to={"/home/admin/accounts"}>
                            <NavItem eventKey={5} >
                                Accounts
                            </NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to={"/home/admin/acont"}>
                        <NavItem eventKey={6}>
                            Content
                        </NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to={"/home/admin/money"}>
                            <NavItem eventKey={7}>
                                Money
                            </NavItem>
                        </IndexLinkContainer>
                    </Nav>
                </div>
            </div>
        );
    }
}