import React from 'react'
import $ from 'jquery'

import anime from 'animejs';
import { useRef, useEffect, useState } from 'react';

export default function SignUp() {
    const slider = useRef(null)
    const [, forceRender] = useState({});

    useEffect(() => {
        anime({
            targets: slider.current,
            translateX: (2 / 3) * 100 + '%'
        })
        // $(slider.current).css({ "transform": `translateX(${(1 / 3) * 100}%)` });
    }, [])
    function next(event) {
        console.log('test')
        console.log(slider.current)
        $(event.target).prop('disabled',true)
        anime({
            targets: slider.current,
            translateX: {
                value: "-=" + (1 / 3 * 100) + "%",
                duration: 1000,
                easing: 'easeInOutElastic(0.5,1)',
            },
        })
    }
    function clearPopup() {
        $('.next').prop('disabled',false)
        console.log('clear')
        anime({
            targets: "#darkScreen",
            opacity: {
                value: '0',
                delay: 200,
                duration: 200,
            }
        }).finished.then(function () {
            $('#darkScreen').addClass('hidden')

        })
        anime({
            targets: slider.current,
            translateX: (2 / 3) * 100 + '%'
        })
        anime({
            targets: "#signUp",
            translateX: {
                value: ['0%', '100%'],
                duration: 200,
            },
            easing: 'easeInElastic'
        })
    }
    return (
        <>
            <div id='darkScreen' style={{ opacity: 0 }} onClick={clearPopup} className='popup hidden fixed w-screen h-screen top-0 left-0 bg-black opacity-60 z-50'>

            </div>
            <div id='signUp' style={{ transform: 'translateX(100%)' }} className='popup lg:w-1/3vw w-2/3vw overflow-x-hidden fixed top-0 right-0 bg-white z-60 h-screen'>
                <div ref={slider} style={{ width: '300%' }} className='top-0 grid fixed left-0 grid-cols-3 h-screen'>
                    <div className='items-center flex justify-center h-full px-5'>
                        <div>
                            <div className='block'>
                                <label htmlFor="email" className='text-xl font-Metric-Light tracking-widest uppercase'>Email</label>
                                <input type="email" autoCorrect='off' autoFocus autoCapitalize='off' className='px-3 py-1 text-2xl focus:border-2 focus:rounded-sm bg-white font-Metric-Light border mb-8 border-E8E8E1 focus:border-black w-full ' name="email" id="" />
                            </div>
                            <div className='block'>
                                <label htmlFor="password" className='text-xl font-Metric-Light tracking-widest uppercase'>password</label>
                                <input type="password" autoCorrect='off' autoFocus autoCapitalize='off' className='px-3 py-1 text-2xl focus:border-2 focus:rounded-sm bg-white font-Metric-Light border mb-8 border-E8E8E1 focus:border-black w-full ' name="password" id="" />
                            </div>
                            <button onClick={(e)=>next(e)} className='next bg-111111 text-white w-full font-Metric-Regular tracking-tight py-1 text-center'>
                                Next
                            </button>
                        </div>
                    </div>
                    <div className='items-center flex justify-center h-full px-5'>
                        <div>
                            <div className='block'>
                                <label htmlFor="username" className='text-xl font-Metric-Light tracking-widest uppercase'>Username</label>
                                <input type="text" autoCorrect='off' autoFocus autoCapitalize='off' className='px-3 py-1 text-2xl focus:border-2 focus:rounded-sm bg-white font-Metric-Light border mb-8 border-E8E8E1 focus:border-black w-full ' name="username" id="" />
                            </div>
                            <div className='block'>
                                <label htmlFor="Role" className='text-xl font-Metric-Light tracking-widest uppercase'>Role</label>
                                <select autoCorrect='off' autoFocus autoCapitalize='off' className='px-3 py-1 text-2xl focus:border-2 focus:rounded-sm bg-white font-Metric-Light border mb-8 border-E8E8E1 focus:border-black w-full ' name="Role" id="" >
                                    <option className="hover:bg-1C1D1D" value="">dfs</option>
                                    <option className="hover:bg-1C1D1D" value="">df</option>
                                    <option className="hover:bg-1C1D1D" value="">asdf</option>
                                </select>
                            </div>
                            <button onClick={(e)=>next(e)} className='next bg-111111 text-white w-full font-Metric-Regular tracking-tight py-1 text-center'>
                                Next
                            </button>
                        </div>
                    </div>
                    <div className='items-center flex justify-center h-full px-5'>
                        <div>
                            <div className='block'>
                                <label htmlFor="id" className='text-xl font-Metric-Light tracking-widest uppercase'>ID</label>
                                <input type="number" className='px-3 py-1 text-2xl focus:border-2 focus:rounded-sm bg-white font-Metric-Light border mb-8 border-E8E8E1 focus:border-black w-full ' name="id" id="id" />
                            </div>
                            <div className='block'>
                                <label htmlFor="Gender" className='text-xl font-Metric-Light tracking-widest uppercase'>Gender</label>
                                <select autoCorrect='off' autoFocus autoCapitalize='off' className='px-3 py-1 text-2xl focus:border-2 focus:rounded-sm bg-white font-Metric-Light border mb-8 border-E8E8E1 focus:border-black w-full ' name="Role" id="gender" >
                                    <option className="hover:bg-1C1D1D" value="">Male</option>
                                    <option className="hover:bg-1C1D1D" value="">Female</option>
                                    <option className="hover:bg-1C1D1D" value="">Others</option>
                                </select>
                            </div>
                            <button className='next bg-111111 text-white w-full font-Metric-Regular tracking-tight py-1 text-center'>
                                Sign Up 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
