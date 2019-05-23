import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';

export default class GoodAfternoon extends Component {
    render(){
        (this)        
        if(this.props.name == undefined){
            return(<Redirect push to="/login"/>);
        }
        return(
            <div className="good-afternoon-header">
                <div className="good-afternoon-time">Good Afternoon</div>
                <IndexLinkContainer to={"/home/account"}>
                    <div className="good-afternoon-name">{this.props.name}</div>
                </IndexLinkContainer>
                <div className="good-afternoon-listen">What would you like to listen to?</div>
            </div>
        );
    }
}