import $ from 'jquery';
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";

function Loading() {
    const Loading = useRef(null);

    return (
        <div style={{ backgroundColor: "#eee" }} id="loading" ref={Loading} className="z-100 flex justify-center align-middle items-center fixed w-screen h-screen top-0 left-0">
            <h1 className='font-Metric-Regular text-D4D4D4'>PPSSHOP</h1>
        </div>
    );
}

export default Loading;