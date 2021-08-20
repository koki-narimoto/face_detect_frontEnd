import React from 'react';
import './Register.css'

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: '',
            name: ''
        }
    }
    onNameChange = (event) => {
        this.setState({name : event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email : event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({pass : event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.pass,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    } 
    render(){
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                                onChange = {this.onNameChange} type="text" name="name"  id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                                onChange = {this.onEmailChange} type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
                                onChange = {this.onPasswordChange} type="password" name="password"  id="password" />
                            </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer">
                                <input type="checkbox"/> 
                                Remember me 
                            </label> */}
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib" 
                            onClick = {this.onSubmitSignIn}
                            type="submit" value="Register" />
                        </div>
                        <div className="lh-copy mt3">
                        </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default Register;