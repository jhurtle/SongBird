import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {DropdownButton, MenuItem, FormGroup, Table, Button, Row, Col, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import AccountForm from './account-form';
import Modal from 'react-modal';
import CreditCardForm from './credit-card-form';
import {updateUser, deleteUser} from '../actions/index';

class AccountView extends Component{
    constructor(props){
        super(props);
        this.state={
            modalViewVisible: false,
            paymentInfoModalViewVisible: false,
            paymentInfo:{},
            paymentInfoCorrect: true
        }
        this.cancelModal = this.cancelModal.bind(this);
        this.confirmDeleteAccount = this.confirmDeleteAccount.bind(this);
        this.confirmPaymentInfo = this.confirmPaymentInfo.bind(this);
        this.openDeleteAccountModal = this.openDeleteAccountModal.bind(this);
        this.openPaymentInfoModal = this.openPaymentInfoModal.bind(this);
        this.openDowngradeAccountModal = this.openDowngradeAccountModal.bind(this);
        this.setUserDetails = this.setUserDetails.bind(this);
        this.renderPaymentInfoHelp = this.renderPaymentInfoHelp.bind(this);
        this.confirmDowngradeAccount = this.confirmDowngradeAccount.bind(this);
    }

    componentDidMount(){

    }

    componentWillReceiveProps(newProps){
        console.log("COMP WILL REC PROPS");
        console.log(newProps);
    }

    openDeleteAccountModal(){
        this.setState({modalViewVisible: true});
    }

    openPaymentInfoModal(){
        this.setState({paymentInfoModalViewVisible: true});
    }

    openDowngradeAccountModal(){
        this.setState({downgradeAccountViewVisible: true});
    }

    confirmDowngradeAccount(){
        this.props.updateUser({userId: this.props.user.userId, changeRole: true, role: 0});
    }



    confirmPaymentInfo(){
        if((this.state.paymentInfo.name_on_card != undefined) && (this.state.paymentInfo.card_number != undefined)
        && (this.state.paymentInfo.cvc != undefined) && (this.state.paymentInfo.exp_date != undefined)){
            if((this.state.paymentInfo.name_on_card != "") && (this.state.paymentInfo.card_number != "")
            && (this.state.paymentInfo.cvc != "") && (this.state.paymentInfo.exp_date != "")){
                if(this.state.paymentInfo.card_number.length === 16){
                    this.setState({paymentInfoCorrect: true});
                    this.props.updateUser({userId: this.props.user.userId, changeRole: true, role: 1});
                    return;
                }
            }
        }
        this.setState({paymentInfoCorrect: false});
    }

    confirmDeleteAccount(){
        this.props.deleteUser({userId: this.props.user.userId});
    }

    cancelModal(){
        this.setState({modalViewVisible: false, paymentInfoModalViewVisible: false, downgradeAccountViewVisible: false});
    }


    renderUser(){
        if(this.props.user != undefined){
            return(<p>{this.props.user.email}</p>)
        } else {
            return(<div>User is undefined</div>)
        }
    }

    renderRole(){
        var acctRole = '';
        if(this.props.user.role === 0){
            acctRole = 'a basic user'
        } else if(this.props.user.role === 1){
            acctRole = 'a premium user'
        } else if(this.props.user.role === 2){
            acctRole = 'an artist'
        } else if(this.props.user.role === 3){
            acctRole = 'an admin'
        }
        return(
            <p>You are {acctRole}.</p>
        );
    }

    renderGrade(){
        var buttonText = '';
        if(this.props.user.role > 1){
            return(
                <div></div>
            );
        }
        if(this.props.user.role === 0){
            buttonText = 'Upgrade account';
        } else if(this.props.user.role === 1){
            buttonText = 'Downgrade account';
        }
        return(
            <Button onClick={this.props.user.role === 0 ? this.openPaymentInfoModal : this.openDowngradeAccountModal}>{buttonText}</Button>
        );
    }

    renderField(field) {
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

    renderUserDetailsForm(){
        var first = "";
        var last = "";
        var email = "";

        return(
            <div>
                <AccountForm user={this.props.user}/>
            </div>
        );

    }

    renderPaymentInfoHelp(){
        if(!this.state.paymentInfoCorrect){
            return(<p>Payment information invalid</p>);
        } else {
            return(<div></div>);
        }
    }

    setUserDetails(account_details){
        this.setState({paymentInfo: account_details});
        this.setState({paymentInfoCorrect: true});        
    }

    render(){
        return(
            <div className='account-window'>
                <Modal ariaHideApp={false} className={{base: 'modal-display'}} isOpen={this.state.modalViewVisible}>
                    <div className="modal-display-inner-div">
                    <h1 className="modal-display-header-text">Delete Account</h1>
                    <p>Are you sure?</p>
                    <Button onClick={this.cancelModal} className="modal-display-button">Cancel</Button>
                    <Button onClick={this.confirmDeleteAccount} bsStyle="danger" className="modal-display-button modal-display-button-space">Delete</Button>
                    </div>
                </Modal>
                <Modal ariaHideApp={false} className={{base: 'modal-display-top'}} isOpen={this.state.paymentInfoModalViewVisible}>
                    <div className="modal-display-inner-div">
                    <h1 className="modal-display-header-text">Upgrade Account</h1>
                    {this.renderPaymentInfoHelp()}
                    <CreditCardForm setUserDetails={this.setUserDetails} user={this.props.user}/>
                    <Button onClick={this.cancelModal} className="modal-display-button">Cancel</Button>
                    <Button onClick={this.confirmPaymentInfo} bsStyle="danger" className="modal-display-button modal-display-button-space">Upgrade</Button>
                    </div>
                </Modal>
                <Modal ariaHideApp={false} className={{base: 'modal-display'}} isOpen={this.state.downgradeAccountViewVisible}>
                    <div className="modal-display-inner-div">
                    <h1 className="modal-display-header-text">Downgrade Account</h1>
                    <p>Are you sure?</p>
                    <Button onClick={this.cancelModal} className="modal-display-button">Cancel</Button>
                    <Button onClick={this.confirmDowngradeAccount} bsStyle="danger" className="modal-display-button modal-display-button-space">Downgrade</Button>
                    </div>
                </Modal>
                <Row>
                    <Col xs={12} sm={6} md={5} lg={5}>
                    <h1>Account</h1>
                        {this.renderRole()}
                        {this.renderGrade()}
                        <hr/>
                        {this.renderUserDetailsForm()}
                    </Col>
                    <Col xs={12} sm={6} md={7} lg={7}>
                    <h3>Premium Settings</h3>
                    <p>Custom Theme</p>
                        <DropdownButton title="Select Theme">
                            <MenuItem eventKey="1"><p className="color-select-blue">Blue (default)</p></MenuItem>
                            <MenuItem eventKey="2"><p className="color-select-red">Red</p></MenuItem>
                            <MenuItem eventKey="3"><p className="color-select-green">Green</p></MenuItem>
                            <MenuItem eventKey="4"><p className="color-select-white">White</p></MenuItem>
                            <MenuItem eventKey="5"><p className="color-select-black">Black</p></MenuItem>
                        </DropdownButton>
                        <p>Language</p>
                        <DropdownButton title="Select Language">
                            <MenuItem eventKey="1"><p className="">English</p></MenuItem>
                            <MenuItem eventKey="2"><p className="">Spanish</p></MenuItem>
                            <MenuItem eventKey="3"><p className="">French</p></MenuItem>
                            <MenuItem eventKey="4"><p className="">German</p></MenuItem>
                            <MenuItem eventKey="4"><p className="">Vietnamese</p></MenuItem>
                        </DropdownButton>
                        <p>Sound Quality</p>
                        <DropdownButton title="Select Quality">
                            <MenuItem eventKey="1"><p className="">Low</p></MenuItem>
                            <MenuItem eventKey="2"><p className="">High</p></MenuItem>
                        </DropdownButton>
                        <br/>
                        <div>
                            <div className="fa fa-facebook"></div>
                            <div className="fa fa-twitter"></div>
                            <div className="fa fa-google"></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} smPull={4} sm={4} smPush={4} mdPull={4} md={4} mdPush={4} lgPull={5} lg={2} lgPush={5}>
                        <Button onClick={this.openDeleteAccountModal} bsStyle="danger" className="margin-top-3 center-in-div fill-in-div-100" >Delete Account</Button>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

function FieldGroup({id, label, help, ...props}){
    return(
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
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
    return {}
}

/*
export default reduxForm({
    validate:validate,
    form:'loginForm'})(
    connect(mapStateToProps, {actLogin, actCreateAccount, checkLogin, logUserOut})(Login)
);
*/

export default connect(mapStateToProps,{updateUser, deleteUser})(AccountView);