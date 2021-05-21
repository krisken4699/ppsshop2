import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Home from '../components/Home.js';
import Navbar from '../components/Nav.js';
import Seo from "../components/seo";
import '../styles/App.css';

const IndexPage = () => (
  <Layout>
    <Seo title="Home" description="Description for home page. change at index.js:13" />
    {/* <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p> */}
    <Navbar />
    <div className="w-screen h-screen z-10 content relative">
      <Home />
    </div>
  </Layout>
)

export default IndexPage
