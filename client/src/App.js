import React from "react";
import logo from "./logo.svg";
import "../styles/App.css";
import Navbar from './Nav.js';
import Home from './Home.js';
import ErrorTemplate from './ErrorPages/ErrorTemplate.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [data, setData] = React.useState(null);
  if (window.location.protocol === 'http:' && window.location.href.substr(0, 21) != 'http://localhost:3000')
    window.location.protocol = 'https:';

  return (
    <Router>
      <div className="App">
        {/* <div class="divide-y-4 divide-yellow-600 divide-dashed"> */}
        <Navbar className="z-50" />
        {/* <div hidden={false} className="content bg-red-500 md:bg-yellow-500 lg:bg-yellow-100 xl:bg-green-200 2xl:bg-green-600"> */}
        <div hidden={false} className="z-10 content relative">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/">
              <ErrorTemplate />
            </Route>
          </Switch>
        </div>
        {/* </div> */}
        {/* <div hidden={true} className="content bg-red-500 md:bg-yellow-500 lg:bg-yellow-100 xl:bg-green-200 2xl:bg-green-600"></div> */}
      </div >
    </Router>
  );
}

export default App;