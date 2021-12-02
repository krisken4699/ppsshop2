/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import {CookiesProvider} from "react-cookie"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

import Navbar from "./Nav"
import "../styles/layout.css"
import Loading from './Loading';
// import { useEffect, useState } from 'react';
import $ from 'jquery';
import { useLayoutEffect } from 'react';
// import Footer from './Footer';
import SignUp from './signUp.js';

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  useLayoutEffect(() => {
      $('#loading').fadeOut(500);
    });

  return (
    <>
      <CookiesProvider>
        <Loading />
        <Navbar />
        <SignUp/>
        <main className="pt-16">{children}</main>
        {/* <Footer/> */}
      </CookiesProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
