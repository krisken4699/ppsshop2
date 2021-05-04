import $ from 'jquery';
import React, { useEffect, useState, useRef } from 'react';
import './select_category.css';



const Select_category = () => {
    const [Categories, setCategories] = useState([]);
    const categoryForm = useRef(null);
    const selectedValue = useRef(null);
    
    useEffect(() => {
        let temp = document.getElementsByClassName("s-c");
        for (var i = 0; i < temp.length; i++) {
            temp[i].addEventListener("click", function () {
                selectedValue.current.innerText = ($("input[type='radio'][name='category-option']:checked").val())
                document.getElementById('CategoryIcon').src = ($("input[type='radio'][name='category-option']:checked").attr('data-image'))
            });
        }
    }, [Categories]);

    useEffect(() => {
        fetch("/api/category")
            .then((res) => res.json())
            .then((response) => {
                let temp = response.message;
                setCategories(temp);
            })
    }, []);
    return (
        <form id="app-cover" ref={categoryForm}>
            <div id="select-box">
                <input type="checkbox" id="options-view-button" />
                <div id="select-button" className="brd ">
                    <div id="selected-value">
                        <span ref={selectedValue}>All</span>
                    </div>
                    <div id="chevrons">
                        <i aria-hidden className="fas fa-chevron-up"></i>
                        <i aria-hidden className="fas fa-chevron-down"></i>
                    </div>
                </div>
                <div id="options">
                    <div className="option">
                        <input data-image="https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/None.svg" className="s-c top" type="radio" name="category-option" value="None" />
                        <input data-image="https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/None.svg" className="s-c bottom" type="radio" name="category-option" value="None" />
                        {/* <i aria-hidden className="fab fa-codepen"></i> */}
                        <img aria-hidden src="https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/None.svg"/>
                        <span className="label">All</span>
                        {/* <span className="opt-val">CodePen</span> */}
                    </div>
                    {Categories.map((category) => {
                        return (
                            <div className="option" key={category.charAt(0)}>
                                <input data-image={JSON.parse(category.substring(1)).Image} className="s-c top" type="radio" name="category-option" value={JSON.parse(category.substring(1)).Name} />
                                <input data-image={JSON.parse(category.substring(1)).Image} className="s-c bottom" type="radio" name="category-option" value={JSON.parse(category.substring(1)).Name} />
                                {/* <i aria-hidden className="fab fa-codepen"></i> */}
                                <img aria-hidden src={JSON.parse(category.substring(1)).Image} className=""/>
                                <span className="label">{JSON.parse(category.substring(1)).Name}</span>
                                {/* <span className="opt-val">CodePen</span> */}
                            </div>
                        )
                    })}


                    <div id="option-bg"></div>
                </div>
            </div>
        </form>
    );
}

export default Select_category;
