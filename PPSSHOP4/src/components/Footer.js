import React from 'react';
import Logo from '../images/logo.png';
import { Link } from 'gatsby';
import isActive from './isActive';
import { PageQueryStore } from './../../.cache/query-result-store';

const Footer = () => {
    return (
        <footer className='h-1/3vh bg-white border-t w-screen grid px-28 pt-14 pb-14 grid-cols-2 lg:grid-cols-3'>
            <div style={{ backgroundImage: `url(${Logo})` }} className='bg-contain bg-no-repeat h-full max-h-full col-start-1 row-start-1'>
            </div>
            <div className='link col-start-2 grid h-full col-span-2 grid-cols-2 lg:grid-cols-3 text-left'>
                <div className="grid">
                    <Link getProps={isActive} className="self-center px-3 link" to="/" href="#1">Home</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="/page-2/" href="#2">Chat</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="#" href="#2">Some other pages</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="#" href="#2">Yup</Link>
                </div>
                <div className="grid">
                    <Link getProps={isActive} className="self-center px-3 link" to="/" href="#1">Home</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="/page-2/" href="#2">Chat</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="#" href="#2">Some other pages</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="#" href="#2">Yup</Link>
                </div>
                <div className="grid">
                    <Link getProps={isActive} className="self-center px-3 link" to="/" href="#1">Home</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="/page-2/" href="#2">Chat</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="#" href="#2">Some other pages</Link>
                    <Link getProps={isActive} className="self-center px-3 link" to="#" href="#2">Yup</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;