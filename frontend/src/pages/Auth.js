import React, { Component } from "react";
import "./Auth.css";
import AuthContext from "../context/auth-context";

class AuthPage extends Component {
  state = {
    isLoggedIn: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailElement = React.createRef();
    this.PasswordElement = React.createRef();
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLoggedIn: !prevState.isLoggedIn };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.emailElement.current.value;
    const password = this.PasswordElement.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let reqBody = {
      query: `
                query{
                    login(email:"${email}",password:"${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
    };

    // if not logged in so change query to signup
    if (!this.state.isLoggedIn) {
      // req to bckend
      // console.log(email);
      // console.log(password);

      reqBody = {
        query: `
                mutation{
                    createUser(userInput:{email:"${email}",password:"${password}"}){
                        _id
                        email
                    }
                }
            `,
      };
    }

    fetch("http://localhost:3001/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        // here we get our token
        // send this token to parent using context
        // console.log(resData);
        // if(this.state.isLoggedIn){}
        // OR
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" ref={this.emailElement}></input>
        </div>
        <div className="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            ref={this.PasswordElement}
          ></input>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLoggedIn ? "Signup" : "Login"}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
