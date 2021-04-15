import React from "react";



function Home() {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="h-screen pt-20">
            <div className="h-full grid grid-rows-5 grid-cols-6 w-full gap-6">
                <div className="col-start-1 col-end-7 flex justify-center px-4">
                    <div className="grid grid-cols-3 gap-6 xl:w-50vw w-full">
                    <input type="text" className="focus:bg-white focus:ring-4 ring-gray-300 col-start-2 rounded-md inline md:text-left text-center h-10 self-center w-full bg-DDDDDD p-3 placeholder-666666 Poppins font-semibold tracking-tight" placeholder="SEARCH" name="" id=""/>
                    <button className="col-start-3 h-10 self-center w-min inline focus:outline-none text-black bg-F9C74F rounded-md p-3 Poppins font-semibold tracking-tight leading-none">Search</button>
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