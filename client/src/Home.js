import React from "react";



function Home() {
    const [data, setData] = React.useState(null);
    const [Categories, setCategories] = React.useState(['null']);
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));

        fetch("/api/category")
            .then((res) => res.json())
            .then((Categories) => { 
                setCategories(Categories.message)
                let temp = Categories.message;
                console.log(temp)
                let i = 0;
                for(i = 0; i < temp.length; i++){
                    temp[i] = `<option key="${temp[i].charAt(0)}">${temp[i].substring(1)}</option>`
                }
                console.log(temp)
                document.getElementById('select-category').innerHTML += temp;
             })
    }, []);

    return (
        <div className="h-screen pt-20">
            <div className="h-full grid grid-rows-5 grid-cols-6 w-full gap-6">
                <div className="col-start-1 col-end-7 flex justify-center px-4">
                    <div className="grid grid-cols-3 gap-6 xl:w-50vw w-full">
                        <div className="col-start-1 relative inline-flex self-center w-min justify-self-end">
                            <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                            <select id="select-category" className="w-min border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-8 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                <option>Select Category</option>
                                {
                                    Categories
                                }
                            </select>
                        </div>
                        <input type="text" className="focus:bg-white focus:ring-4 ring-gray-300 col-start-2 rounded-md inline md:text-left text-center h-10 self-center w-full bg-DDDDDD p-3 placeholder-666666 Poppins font-semibold tracking-tight" placeholder="SEARCH" name="" id="" />
                        <button className="col-start-3 h-10 self-center w-min inline focus:outline-none text-black hover:bg-yellow-300 bg-F9C74F rounded-md p-3 Poppins font-semibold tracking-tight leading-none">Search</button>
                    </div>
                </div>
            </div>
        </div>
        //     <div className>
        //     <p>test</p>
        //     <p>{!data ? "Loading..." : data}</p>
        //     <p>{!data ? "Loading..." : data}</p>
        //     <p>{!data ? "Loading..." : data}</p>
        //     <p>{!data ? "Loading..." : data}</p>
        //     <p>{!data ? "Loading..." : data}</p>
        //     <p>{!data ? "Loading..." : data}</p>
        //     <p>If the text above this message is "Loading...", there is a problem communicating with the backend. If not. Everything's good. Have a good day!</p>
        // </div>
    );
}

export default Home;