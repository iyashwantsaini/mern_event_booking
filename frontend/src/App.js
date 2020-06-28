import React,{Component} from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainNavigation from "./components/navigation/MainNavigation";
import AuthContext from "./context/auth-context";

// Pages
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({token:null,userId:null});
  };

  render(){
  return (
    <BrowserRouter>
      {/* browser router can't have multiple children */}
      {/* So we add react.fragment as a shell on top of everything */}
      <React.Fragment>
        {/* AuthContext contains Token data */}
        {/* All components in between can access this context */}
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <MainNavigation />
          <main className="main-content">
            {/* Switch means only one route at a time */}
            <Switch>
              {/* redirect to events only if loggedin */}
              {this.state.token && 
                <Redirect from="/" to="/events" exact />
              }
              {this.state.token && 
                <Redirect from="/auth" to="/events" exact />
              }
              {!this.state.token && 
                <Redirect from="/bookings" to="/auth" exact />
              }

              {/* exact means that if exactly / then only redirect */}
              {/* only redirect of not loggedin */}
              {!this.state.token && 
                <Redirect from="/" to="/auth" exact />
              }
              {/* route auth available only if not loggedin */}
              {!this.state.token &&
              <Route path="/auth" component={AuthPage} />
              }
              <Route path="/events" component={EventsPage} />
              {/* show booking only if loggedin */}
              {this.state.token &&
              <Route path="/bookings" component={BookingsPage} />
              }
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  )};
}

export default App;
