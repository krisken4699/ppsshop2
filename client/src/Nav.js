import styled from 'styled-components';
import $ from 'jquery';
import React from "react";

function Navbar() {
  const [data, setData] = React.useState(null);

  function dropdown() {
    const dropdownE = $('#dropdown-menu');
    console.log('test')
    if (dropdownE.css('display') !== 'none')
      dropdownE.fadeOut();
    else {
      dropdownE.fadeIn();
    }
  }
  $('#dropdown-menu').hide();
  return (
    <div className="Navbar fixed">
      <Nav className="z-50 transform -translate-x-1/2 left-1/2 navbar px-10 py-4 bg-F7F5F2 hover:shadow-md">
        <div>
          <div className="grid grid-cols-11 gap-x-0">
            <div className="col-start-1 col-span-1">
              <Title>PANGCU</Title>
            </div>
            <div className="nav-collapse hidden lg:col-start-3 col-span-10 lg:grid grid-cols-7 gap-0 content-center text-center">
              <div className="a col-start-1 col-span-1 flex"><a className="self-center text-center w-full link" href="#1">Home</a></div>
              <div className="a col-start-2 col-span-1 flex"><a className="self-center text-center w-full link" href="#2">Chat</a></div>
              <div className="a col-start-3 col-span-1 flex"><a className="self-center text-center w-full link" href="#3">Page 3</a></div>
              <div className="a col-start-4 col-span-1 flex"><a className="self-center text-center w-full link" href="#4">Page 4</a></div>
              <div className="col-start-11 col-end-12 flex">
                <button className="focus:outline-none text-black bg-F9C74F focus:ring rounded-xl text-xs py-2 px-4 self-center Poppins mr-2">Sign up</button>
                <button className="focus:outline-none text-gray-450 border-gray-350 border focus:ring rounded-xl text-xs py-2 px-4 self-center Poppins">Sign in</button>
              </div>
            </div>
            <div className="relative text-left col-start-13 flex">
              <div className="flex self-center justify-self-aut">
                <button onClick={() => {
                  dropdown()
                }} type="button"
                  className="
                            hidden self-center justify-self-auto min-w-8 p-2 h-full justify-center rounded-md 
                            border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 
                            hover:bg-gray-50 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  id="options-menu" aria-expanded="true" aria-haspopup="true">
                  <svg className="self-center justify-self-auto h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg>
                </button>
              </div>
            </div>
            {/* rounded-md ring-1 shadow-lg ring-black ring-opacity-5 */}
            <div id="dropdown-menu" className="lg:hidden block origin-top-right right-0 mt-2 w-56 bg-F7F5F2 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="py-1" role="none">
                <a onClick={dropdown} href="#1" className="block px-4 py-2 text-sm text-gray-700 bg-gradient-to-r hover:from-gray-100 hover:to-transparent hover:text-gray-900 hover:border-l-4 border-yellow-300" role="menuitem">Home</a>
                <a onClick={dropdown} href="#2" className="block px-4 py-2 text-sm text-gray-700 bg-gradient-to-r hover:from-gray-100 hover:to-transparent hover:text-gray-900 hover:border-l-4 border-yellow-300" role="menuitem">Chat</a>
                <a onClick={dropdown} href="#3" className="block px-4 py-2 text-sm text-gray-700 bg-gradient-to-r hover:from-gray-100 hover:to-transparent hover:text-gray-900 hover:border-l-4 border-yellow-300" role="menuitem">License</a>
                <a onClick={dropdown} href="#4" className="block px-4 py-2 text-sm text-gray-700 bg-gradient-to-r hover:from-gray-100 hover:to-transparent hover:text-gray-900 hover:border-l-4 border-yellow-300" role="menuitem">Something else</a>
              </div>
            </div>

          </div>
        </div>
      </Nav>
    </div>
  );
}

export default Navbar;

const Title = styled.h1`
  font-family: Poppins;
  font-size: 30px;
  font-style: bold;
  font-weight: 900;
  letter-spacing: 0em;
  text-align: left;
`;

const Nav = styled.nav`
  transition:0.5s;
  display: block;
  position:fixed;
  margin-left: auto;
  margin-right: auto;
  margin:auto;
  width:100vw;
`;