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
      {/* <div class="divide-y-4 divide-yellow-600 divide-dashed"> */}
      <Navbar className="z-50" />
      {/* <div hidden={false} className="content bg-red-500 md:bg-yellow-500 lg:bg-yellow-100 xl:bg-green-200 2xl:bg-green-600"> */}
      <div hidden={false} className="z-10 content relative">
        <Home />
      </div>
      {/* </div> */}
      {/* <div hidden={true} className="content bg-red-500 md:bg-yellow-500 lg:bg-yellow-100 xl:bg-green-200 2xl:bg-green-600"></div> */}
    </div >
  );
}

export default App;