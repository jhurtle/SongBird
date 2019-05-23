import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form';
import { Row, Col, Button } from 'react-bootstrap';

class CreditCardForm extends Component {
    constructor(props){
        super(props)
        this.state = {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirm: '',
                role: 0
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.renderField = this.renderField.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount(){
        this.setState({first_name: this.props.user.first_name});
        this.setState({last_name: this.props.user.last_name});
        this.setState({email: this.props.user.email});
        this.setState({password: ''});
        this.setState({password_confirm: ''});
        this.setState({role: this.props.user.role});
    }

    componentWillReceiveProps(newProps){

    }

    componentDidUpdate(){
        var userDetails = {
            name_on_card: this.state.name_on_card,
            exp_date: this.state.exp_date,
            card_number: this.state.card_number,
            cvc: this.state.cvc
        }
        this.props.setUserDetails(userDetails);
        console.log(this);
    }

    onFormSubmit(event){
        event.preventDefault();
    }

    onEmailChange(event){
        this.setState({email: event.target.value});
    }

    onSubmit(values){
        if(this.state.formDisplay === 'createAccount'){
            console.log("VALUES");
            console.log(values);
            this.props.actCreateAccount(values);
        } else {
            this.props.actLogin(values);
        }
    }

    render(){
        const {handleSubmit}=this.props;
        console.log("AAAAAAAAAA");
        console.log(this);
        return(
            <div className="account-form">
            <form className="form-padding-20" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Row>
                    <Col xs={12} sm={9} md={9} lg={9} className="">
                        <Field name={'name_on_card'} text={this.state.name_on_card} label={'Name on Card'} component={this.renderField}/>
                    </Col>
                    <Col xs={12} sm={3} md={3} lg={3} className="">
                    <Field name={'exp_date'} text={this.state.exp_date} label={'Expiration'} component={this.renderField}/>
                    </Col>                    
                    <Col xs={12} sm={8}md={8} lg={8} className="">
                        <Field name={'card_number'} text={this.state.card_number} label={'Card Number'} component={this.renderField}/>
                    </Col>
                    <Col xs={12} sm={4}md={4} lg={4} className="">
                        <Field name={'cvc'} text={this.state.cvc} label={'CVC'} component={this.renderField}/>
                    </Col>
                </Row>
            </form>
            </div>
        );
    }

    onInputChange(name, value){
        console.log("name: " + name);
        console.log("value: " + value);
        if(name === 'name_on_card'){
            this.setState({name_on_card: value});
        } else if(name === 'exp_date'){
            this.setState({exp_date: value});
        } else if(name === 'card_number'){
            this.setState({card_number: value});
        } else if(name === 'cvc'){
            this.setState({cvc: value});
        }


        console.log(this)
    }

    renderField(field) {

        const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger':''}`;
        const fieldType= (field.label ==='Change Password' || field.label === 'Change Password (confirm)') ? 'password' : 'text'; 
        var renderValue  = "";
        if(field.input.name === 'name_on_card'){
            renderValue = this.state.name_on_card;
        } else if(field.input.name === 'exp_date'){
            renderValue = this.state.exp_date;
        } else if(field.input.name === 'email'){
            renderValue = this.state.email;
        } else if(field.input.name === 'card_number'){
            renderValue = this.state.card_number;
        } else if(field.input.name === 'cvc'){
            renderValue = this.state.cvc;
        }  
        return (
            <div className={className}>
                <label className='account-form-text'>{field.label}</label>
                <input
                    className={'form-control'}
                    type={fieldType}
                    {...field.input}
                    value={renderValue}
                    onChange={event => this.onInputChange(field.input.name, event.target.value)}
                />
                <div className={'text-help'}>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }
}

function validate(values){
    console.log("VALIDATING");
    console.log(values);
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
    return {user: state.user};
}

export default reduxForm({
    validate:validate,
    form:'loginForm'
})(
    connect(mapStateToProps, {})(CreditCardForm)
);