import React from "react";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importing all the components that are needed
import Redirect from "./Redirect";
import LeftApp from "./components/LeftSide_of_page/LeftApp";
import RightApp from "./components/RightSide_of_page/RightApp";

//Importing the css needed
import "./css/App.css";

//Main app that we use to render the page
function App() {
  return (
    <Router>
      {/* Using the react router for switching between different pages or redirects*/}
      <Switch>
        {/*If they just come to the website the roomID is generated on random and they are redirected to the new page*/}
        <Route  path='/' exact>
          <Redirect />  
        </Route>
        {/*This page will be available after the redirect or if they are joining a room*/}
        <Route  path='/:roomID' exact>
          {/* Using the react router for switching between different pages or redirects*/}
          <div style={{ display: "flex", overflowX: "hidden"}}>
            {/* LeftApp contains the componenets on the left side which are the code editor and the whiteboard and notepad*/}
            <LeftApp />
            {/* RightApp contains the componenets on the right side which are the chatwidget and the avatars for each person in the room*/}
            <RightApp />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
