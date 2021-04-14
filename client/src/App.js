import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from './Nav.js';
import Home from './Home.js';


function App() {
  const [data, setData] = React.useState(null);
  if (window.location.protocol === 'http:' && window.location.href.substr(0, 21) != 'http://localhost:3000')
    window.location.protocol = 'https:';

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;