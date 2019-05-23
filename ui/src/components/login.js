import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

import {actLogin, actCreateAccount, checkLogin, logUserOut} from '../actions/index'

class Login extends Component{
    constructor(props){
        super(props);   
        this.state =
        {
            email: '',
            password: '',
            password_confirm: '',
            first_name: '',
            last_name: '',
            formDisplay: 'login'
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.checkUserLogin = this.checkUserLogin.bind(this);
        this.logMeOut = this.logMeOut.bind(this);
        this.goBackClick = this.goBackClick.bind(this);
        this.goToCreateAccountPageClick = this.goToCreateAccountPageClick.bind(this);
        this.renderCreateAccount = this.renderCreateAccount.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.checkUserLogin();
    }

    componentWillReceiveProps(newProps){
        console.log("cmponent receiveed props");
        console.log(newProps);
        if(newProps.startState==='logout'){
            if(newProps.user.message != 'User logged out.'){
                this.logMeOut();
            }
        }

        if(newProps.user.userLoggedIn != undefined){
            if(newProps.user.userLoggedIn == true && newProps.user.email != "anonymousUser"){
                    //this.props.history.push('/home/albums');
                    this.setState({redir: '/home/albums'});
                    return;
            } else {
            }
            if(!newProps.user.userLoggedIn){
                if(newProps.user.message === 'Email not found' || newProps.user.message === 'User could not be authenticated' ||
                    newProps.user.message=='User is banned'){
                    this.setState({credentialsValid: false});
                    return;
                }
            }
            this.setState({credentialsValid: true});
        }

        if(newProps.user.userCreated != undefined){
            if(newProps.user.userCreated === true){
                this.setState({formDisplay: 'login'});
            }
        }
    }


    logMeOut(){
        this.props.logUserOut();
        console.log("LOGGIN ME OUT");
    }


    onEmailChange(event){
        this.setState({email: event.target.value, credentialsValid:true});
    }

    onPasswordChange(event){
        this.setState({password: event.target.value, credentialsValid:true});
    }

    onFormSubmit(event){
        event.preventDefault();
        this.props.logUserIn(this.state.email);
    }

    renderField(field) {
        console.log("RENDERING FIELD");
        console.log(field);
        const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger':''}`;
        const fieldType= (field.label ==='password' || field.label === 'password confirm') ? 'password' : 'text'; 
        return (
            <div className={className}>
                <label className='form-login-text'>{field.label}</label>
                <input
                    className={'form-control'}
                    type={fieldType}
                    {...field.input}
                />
                <div className={'text-help'}>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }


    goBackClick(){
        console.log("GO BACK");
        this.setState({formDisplay: 'login'});
    }

    goToCreateAccountPageClick(){
        console.log("GO TO CREATE ACCOUNT");
        this.setState({formDisplay: 'createAccount'});
    }

    checkUserLogin(){
        this.props.checkLogin();
    }

    onSubmit(values){
        console.log(values);
        if(this.state.formDisplay === 'createAccount'){
            console.log("VALUES");
            console.log(values);
            this.props.actCreateAccount(values);
        } else {
            this.props.actLogin(values);
        }
    }

    renderLogin(){
        const {handleSubmit}=this.props;
        var cred = null;
        if(this.state != undefined){
            if(this.state.credentialsValid!=undefined){
                if(!this.state.credentialsValid){
                    cred = 'invalid login credentials';
                }
            }
        }
        return(
            <Row className="fill-width">
                <Col xs={12} sm={8} smPush={2} 
                smPull={2} md={6} mdPush={3}
                mdPull={3} lg={4} lgPush={4} 
                lgPull={4} className="">
                    <p className="text-help text-center">{cred}</p>
                    <form
                    className="input-group login-form"
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            name={'email'}
                            label={'email'}
                            component={this.renderField}
                        />
                        <Field
                            name={'password'}
                            label={'password'}
                            component={this.renderField}
                        />
                        <span className="">
                            <button
                            type="submit"
                            className="btn btn-secondary button-space login-button push-down login-form-button"
                            >Log In</button>
                            <button
                            className="btn btn-secondary login-button push-down login-form-button" onClick={this.goToCreateAccountPageClick.bind()}
                            >Create Account</button>
                        </span>
                    </form>
                </Col>
            </Row>
        );
    }
        
    renderCreateAccount(){
        const {handleSubmit}=this.props;
        var cred = null;
        if(this.state != undefined){
            if(this.state.credentialsValid!=undefined){
                if(!this.state.credentialsValid){
                    cred = 'invalid login credentials';
                }
            }
        }
        return(
            <Row className="fill-width">
                <Col xs={12} sm={8} smPush={2} 
                smPull={2} md={6} mdPush={3}
                mdPull={3} lg={4} lgPush={4} 
                lgPull={4} className="">
                    <p className="text-help text-center">{cred}</p>
                    <form
                    className="input-group login-form"
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            name={'first_name'}
                            label={'first name'}
                            component={this.renderField}
                        />
                        <Field
                            name={'last_name'}
                            label={'last name'}
                            component={this.renderField}
                        />
                        <Field
                            name={'email'}
                            label={'email'}
                            component={this.renderField}
                        />
                        <Field
                            name={'password'}
                            label={'password'}
                            component={this.renderField}
                        />
                        <Field
                            name={'password_confirm'}
                            label={'password confirm'}
                            component={this.renderField}
                        />
                        <span className="">
                            <button
                            className="btn btn-secondary button-space login-button push-down login-form-button" onClick={this.goBackClick.bind()}
                            >Go Back</button>
                            <button
                            type="submit"
                            className="btn btn-secondary login-button push-down login-form-button"
                            >Create Account</button>
                        </span>
                    </form>
                </Col>
            </Row>  
        );
    }
        
    render(){
        console.log("RENDER");
        console.log(this);
        if(this.state.redir != undefined){
            return(<Redirect push to={this.state.redir}/>);
        }
        return(
            <div className="fill-width">
                <Row className="fill-width">
                    <Col xs={10} xsPush={1} xsPull={1} sm={8} smPush={2} 
                    smPull={2} md={6} mdPush={3}
                    mdPull={3} lg={4} lgPush={4} 
                    lgPull={4} className="top-margin-logo">
                        <img className="logo-login" src='/images/logo_bird_dark_small_trimmed.png' />
                    </Col>
                </Row>
                {this.state.formDisplay==='createAccount' ? this.renderCreateAccount() : this.renderLogin()}
            </div>
        );
    }
}





function validate(values){
    console.log("VALIDATING");
    console.log(values);
    console.log(this);
    const errors={};
    //do some validation
    if(!values.email){
        errors.email='enter an email';
    }
    if(!values.password){
        errors.password='enter your password';
    }
    // if errors is {} the form is valid else it failed validation therefore do not submit
    return errors;
}

function mapStateToProps(state){
    return {albums: state.albums, user: state.user};
}

export default reduxForm({
    validate:validate,
    form:'loginForm'
})(
    connect(mapStateToProps, {actLogin, actCreateAccount, checkLogin, logUserOut})(Login)
);