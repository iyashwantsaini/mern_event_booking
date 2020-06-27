import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainNavigation from "./components/navigation/MainNavigation";

// Pages
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";

function App() {
  return (
    <BrowserRouter>
      {/* browser router can't have multiple children */}
      {/* So we add react.fragment as a shell on top of everything */}
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          {/* Switch means only one route at a time */}
          <Switch>
            {/* exact means is exactly / then only redirect */}
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/bookings" component={BookingsPage} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
