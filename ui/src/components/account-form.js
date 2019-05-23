import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form';
import { Button } from 'react-bootstrap';
import {updateUser} from '../actions/index';

class AccountForm extends Component {
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

    onEmailChange(event){
        this.setState({email: event.target.value});
    }

    onSubmit(values){
        this.props.updateUser({userId: this.props.user.userId, email: this.state.email, first_name: this.state.first_name, last_name: this.state.last_name, password: this.state.password, password_confirm: this.state.password_confirm});
    }

    render(){
        const {handleSubmit}=this.props;
        console.log("AAAAAAAAAA");
        console.log(this);
        return(
            <div className="account-form">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name={'first_name'} text={this.state.first_name} label={'First'} component={this.renderField}/>
                <Field name={'last_name'} text={this.state.last_name} label={'Last'} component={this.renderField}/>
                <Field name={'email'} text={this.state.email} label={'Email'} component={this.renderField}/>
                <Field name={'password'} text={this.state.password} label={'Change Password'} component={this.renderField}/>
                <Field name={'password_confirm'} text={this.state.password_confirm} label={'Change Password (confirm)'} component={this.renderField}/>
                <Button type="submit" className="fill-in-div-100">Save Account Changes</Button>
            </form>
            </div>
        );
    }

    onInputChange(name, value){
        console.log("name: " + name);
        console.log("value: " + value);
        if(name === 'first_name'){
            this.setState({first_name: value});
        } else if(name === 'last_name'){
            this.setState({last_name: value});
        } else if(name === 'email'){
            this.setState({email: value});
        } else if(name === 'password'){
            this.setState({password: value});
        } else if(name === 'password_confirm'){
            this.setState({password_confirm: value});
        }
        console.log(this)
    }

    renderField(field) {
        console.log("RENDER FIELD");
        console.log(field);
        console.log(this);
        const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger':''}`;
        const fieldType= (field.label ==='Change Password' || field.label === 'Change Password (confirm)') ? 'password' : 'text'; 
        var renderValue  = "";
        if(field.input.name === 'first_name'){
            renderValue = this.state.first_name;
        } else if(field.input.name === 'last_name'){
            renderValue = this.state.last_name;
        } else if(field.input.name === 'email'){
            renderValue = this.state.email;
        } else if(field.input.name === 'password'){
            renderValue = this.state.password;
        } else if(field.input.name === 'password_confirm'){
            renderValue = this.state.password_confirm;
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
    return {errors};
}

function mapStateToProps(state){
    return {user: state.user};
}

export default reduxForm({
    validate:validate,
    form:'loginForm'
})(
    connect(mapStateToProps, {updateUser})(AccountForm)
);