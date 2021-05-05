import React, { useRef, useState, useEffect } from "react";
import Select_category from "./Select_category.js";

function Home() {
    const [data, setData] = useState([]);
    const cards = useRef(null);
    // const [CategoriesIcon, setCategoriesIcon] = useState("https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/None.svg");
    useEffect(() => {
        console.log('test');
        fetch("/api/content")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message)
                let temp = data.message;
                for (var i = 0; i < temp.length; i++) {
                    temp[i].key = i;
                }
                setData(temp);
            });
    }, []);

    function updateSearchIcon() {
        /*
        let selected = document.getElementById('select-category').children[document.getElementById("select-category").selectedIndex].getAttribute("data-image")
        //console.log(selected);
        setCategoriesIcon(`${selected}`)
        document.getElementById('CategoryIcon').setAttribute('src', CategoriesIcon);
    */
    }

    return (
        <div className="h-screen pt-20">
            <div className="h-full grid grid-rows-5 grid-cols-6 w-full gap-6">
                <div className="col-start-1 col-end-7 flex justify-center px-4">
                    <div className="grid grid-cols-3 gap-6 xl:w-50vw w-full">
                        <div className="col-start-1 relative inline-flex self-center w-full justify-self-end">
                            <img id="CategoryIcon" src="https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/None.svg" className="justify-self-start md:inline-block hidden" alt="Logo" />
                            {/* <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.7081 0.958965C11.4963 0.748502 11.2099 0.630371 10.9114 0.630371C10.6129 0.630371 10.3265 0.748502 10.1148 0.958965L6.05809 4.95914L2.05791 0.958965C1.84619 0.748502 1.55979 0.630371 1.26127 0.630371C0.962738 0.630371 0.67634 0.748502 0.464621 0.958965C0.358709 1.06401 0.274643 1.18899 0.217275 1.32669C0.159907 1.46439 0.130371 1.61209 0.130371 1.76126C0.130371 1.91043 0.159907 2.05813 0.217275 2.19583C0.274643 2.33353 0.358709 2.45851 0.464621 2.56356L5.25579 7.35473C5.36084 7.46064 5.48582 7.5447 5.62352 7.60207C5.76122 7.65944 5.90892 7.68898 6.05809 7.68898C6.20726 7.68898 6.35496 7.65944 6.49266 7.60207C6.63036 7.5447 6.75534 7.46064 6.86038 7.35473L11.7081 2.56356C11.814 2.45851 11.898 2.33353 11.9554 2.19583C12.0128 2.05813 12.0423 1.91043 12.0423 1.76126C12.0423 1.61209 12.0128 1.46439 11.9554 1.32669C11.898 1.18899 11.814 1.06401 11.7081 0.958965Z" fill="black" /> </svg> */}
                            <Select_category onChange={updateSearchIcon}></Select_category>
                            {/* <select onChange={updateSearchIcon} id="select-category" className="w-52 link hover:cursor-pointer text-black h-10 bg-transparent pl-5 pr-8 focus:outline-none appearance-none">
                                <option>Select Category</option>
                            </select> */}
                        </div>
                        <input type="text" className="focus:bg-white focus:ring-4 ring-gray-300 col-start-2 rounded-md inline md:text-left text-center h-10 self-center w-full bg-DDDDDD p-3 placeholder-666666 Poppins font-semibold tracking-tight" placeholder="SEARCH" name="" id="" />
                        <button className="col-start-3 h-10 self-center w-min inline focus:outline-none text-black active:bg-yellow-300 bg-F9C74F rounded-md p-3 Poppins font-semibold tracking-tight leading-none">Search</button>
                    </div>
                </div>
                <div ref={cards} className="px-7 col-start-1 row-start-2 gap-6 grid grid-cols-6 row-end-6 col-end-7 grid-rows-2">
                    {data.map((card) => {
                        return (
                            <div key={card.key} className={`p-1 col-start-${1 + (card.key % 6)} col-span-1`}>
                                <div className="bg-C4C4C4 rounded-xl w-full h-full">
                                {card.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* <div className>
        <p>test</p>
        <p>{!data ? "Loading..." : data}</p>
        <p>{!data ? "Loading..." : data}</p>
        <p>{!data ? "Loading..." : data}</p>
        <p>{!data ? "Loading..." : data}</p>
        <p>{!data ? "Loading..." : data}</p>
        <p>{!data ? "Loading..." : data}</p>
        <p>If the text above this message is "Loading...", there is a problem communicating with the backend. If not. Everything's good. Have a good day!</p>
        </div> */}
        </div>



    );
}

export default Home;