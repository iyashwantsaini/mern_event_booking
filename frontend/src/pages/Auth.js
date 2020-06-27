import React, {Component} from 'react';
import './Auth.css';

class AuthPage extends Component{
    render(){
        return(
            <form className="auth-form">
                <div className="form-control">
                    <label for="email">E-mail</label>
                    <input type="email" id="email"></input>
                </div>
                <div className="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password"></input>
                </div>
                <div className="form-actions">
                    <button type="button">Switch to SignUp</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        );
    }
}

export default AuthPage;