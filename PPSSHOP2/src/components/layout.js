import * as React from "react"
import { Link } from "gatsby"
import Footer from './Footer';

const Layout = ({ location, title, children }) => {
  
  return (
    <div className="">
      <title>{title}</title>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
