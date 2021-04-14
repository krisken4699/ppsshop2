import React from "react";



function Home() {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="Home">
            <p>{!data ? "Loading..." : data}</p>
        </div>
    );
}

export default Home;