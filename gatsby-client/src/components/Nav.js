
import Loading from './Loading';
import { Link } from "gatsby";
import styled from 'styled-components';
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import Burger from './Burger';
import $ from 'jquery';
import isActive from './isActive';
import { useCookies } from 'react-cookie';
import anime from 'animejs';


function Navbar() {
  const dropdownRef = useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [shown, setShown] = useState(false);

  const toggleDropdown = () => {
    setShown((prev) => !prev);
    $(".burger").toggleClass('not-active');
    $(".burger").toggleClass('active');
  };
  function signUp() {
    // console.log('click')
    if (cookies.user) {
      console.log('logout')
      removeCookie('user');
    }
    else {
      console.log("signup")
      setCookie('user', { name: "", password: "" }, { path: '/', expires: new Date(new Date().getTime() + 86400000) })
      anime({
        targets: "#darkScreen",
        opacity: {
          value: '.6',
          duration: 200
        },
      }).finished.then(function () {
        $('#darkScreen').removeClass('hidden')
      })
      anime({
        targets: "#signUp",
        // width: {
        //   easing: 'easeOutElastic',
        //   value: ["+0","+=100","-=100"]
        // },
        translateX: {
          value: ['100%', '0%'],
          duration: 400,
        },
        easing: 'easeOutElastic'
      })
    }
  }
  useLayoutEffect(() => {
    if (!dropdownRef.current)
      return;

    const el = dropdownRef.current;
    requestAnimationFrame(() => {
      if (shown) {
        // el.style.display = "block";
        el.style.transition = "max-height 0.5s"
        el.style.maxHeight = "220px";
      } else {
        // el.style.display = "none"
        el.style.transition = "max-height .5s"
        el.style.maxHeight = "0px";
      }
    })
  })
  return (
    <Nav className="z-50 transform -translate-x-1/2 left-1/2 fixed px-10 transition-all duration-500">
      <div>
        <div className="grid grid-cols-11 gap-x-0 ">
          <div className='col-start-1 col-span-1 flex items-center justify-center'>
            <Link to='/' style={{ color: "black", fontFamily: "Metric-Medium" }} className="link text-black align-baseline">PPSSHOP</Link>
          </div>
          <div className="nav-collapse hidden lg:col-start-3 col-span-10 lg:grid grid-cols-7 gap-0 content-center text-center">
            <div className="a col-start-1 col-span-1 flex"><Link getProps={isActive} className="self-center text-center px-3 link" to="/" href="#1">Home</Link></div>
            <div className="a col-start-2 col-span-1 flex"><Link getProps={isActive} className="self-center text-center px-3 link" to="/page-2/" href="#2">Chat</Link></div>
            <div className="a col-start-3 col-span-1 flex"><Link getProps={isActive} className="self-center text-center px-3 link" to="#3" href="#3">Page 3</Link></div>
            <div className="a col-start-4 col-span-1 flex"><Link getProps={isActive} className="self-center text-center px-3 link" to="#4" href="#4">Page 4</Link></div>
            <div className="col-start-11 col-end-12 flex">
              <a onClick={signUp} className="self-center text-center px-3 font-Metric-Medium tracking-1px text-xs cursor-pointer uppercase text-333 hover:text-A29F9A font-500">{cookies.user ? "Logout" : "Sign up"}</a>
              <a className="self-center text-center px-3 font-Metric-Medium tracking-1px text-xs uppercase text-333 hover:text-A29F9A font-500">{cookies.Items ? cookies.Items : "0"} in cart</a>
              {/* <button className="focus:outline-none text-black bg-F9C74F focus:ring rounded-xl text-xs py-2 px-4 self-center Poppins mr-2">Sign up</button>
              <button className="focus:outline-none text-gray-450 border-gray-350 border focus:ring rounded-xl text-xs py-2 px-4 self-center Poppins">Sign in</button> */}
            </div>
          </div>
          <div className="relative text-left col-start-11 flex">
            {/* <div className="flex self-center justify-self-auto"> */}
            {/* <button onClick={() => {
                toggleDropdown()
              }} type="button"
                className="
                  hidden self-center justify-self-auto min-w-8 p-2 h-full justify-center rounded-md 
                  border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 
                  hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="options-menu" aria-expanded="true" aria-haspopup="true">
                </button> */}
            <Burger id="options-menu" className="hidden absolute top-1/2 -translate-y-1/2 right-0 transform" style={{ maxHeight: "28px" }} onClick={() => { toggleDropdown() }} />
            {/* </div> */}
          </div>
          {/* rounded-md ring-1 shadow-lg ring-black ring-opacity-5 */}
          <div ref={dropdownRef} id="dropdown-menu" className="max-h-screen overflow-y-hidden lg:inline origin-top-right right-0 mt-0 w-56 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="py-1" role="none">
              <Link getProps={isActive} onClick={toggleDropdown} href="#1" className="link block px-4 py-2" role="menuitem" to="/">Home</Link>
              <Link getProps={isActive} onClick={toggleDropdown} href="#2" className="link block px-4 py-2" role="menuitem" to="/page-2/">Chat</Link>
              <Link getProps={isActive} onClick={toggleDropdown} href="#3" className="link block px-4 py-2" role="menuitem" to="#3">License</Link>
              <Link getProps={isActive} onClick={toggleDropdown} href="#4" className="link block px-4 py-2" role="menuitem" to="#4">Something else</Link>
              <a onClick={signUp} className="cursor-pointer self-center text-center py-2 px-4 font-Metric-Medium tracking-1px text-xs uppercase text-333 hover:text-A29F9A font-500">{cookies.user ? "Logout" : "Sign up"}</a>
              <a className="self-center text-center py-2 px-4 font-Metric-Medium tracking-1px text-xs uppercase text-333 hover:text-A29F9A font-500">{cookies.Items ? cookies.Items : "0"} in cart</a>
            </div>
          </div>

        </div>
      </div>
    </Nav>
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
    background-color: rgba(255,255,255,.5);
  display: block;
  padding-top:18px;
  padding-bottom:18px;
  position:fixed;
  margin-left: auto;
  margin-right: auto;
  margin:auto;
  width:100vw;
  :hover{
    background-color: rgba(234,233,231,.5);
  }
`;