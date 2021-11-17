import React, { useRef, useState, useEffect } from "react";
// import { mongodb } from 'mongodb';
import Burger from './Burger';

function Home() {
    const [data, setData] = useState([]);
    const cards = useRef(null);
    // const [CategoriesIcon, setCategoriesIcon] = useState("https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/None.svg");
    // let MongoClient = mongodb.MongoClient;

    useEffect(() => {
        // console.log(client);
        fetch("/api/content")
            .then((res) => res.json())
            .then((tempData) => {
                // console.log(data.message)
                let temp = tempData.message;
                for (var i = 0; i < temp.length; i++) {
                    temp[i].key = i;
                }
                setData(temp);
                console.log(data);
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
        <div className="h-screen justify-center align-content-center">
            <div className="grid grid-cols-5 grid-flow-row">
                
            </div>
        </div >



    );
}

export default Home;