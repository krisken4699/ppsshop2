import React from "react";



function Home() {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="h-screen justify-center">
            <p>test</p>
            <p>{!data ? "Loading..." : data}</p>
            <p>{!data ? "Loading..." : data}</p>
            <p>{!data ? "Loading..." : data}</p>
            <p>{!data ? "Loading..." : data}</p>
            <p>{!data ? "Loading..." : data}</p>
            <p>{!data ? "Loading..." : data}</p>
            <p>If the text above this message is "Loading...", there is a problem communicating with the backend. If not. Everything's good. Have a good day!</p>
        </div>
    );
}

export default Home;