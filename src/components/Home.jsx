import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import be from "../helpers/Api.js";
import Path from "../helpers/paths.js"


const Home = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        be.get('/')
            .then(response => response.data)
            .then(result => {
                const newData = result.data;
                setData(newData);
            })
            .catch(error => console.log(error));
    }, [location.state]);

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    const handleRightClickEvent = (e) => {
        e.preventDefault();
        navigate(Path.EDIT, { state: data[e.target.id - 1] });
    };

    return (
        <>
            <section className="container">

                {data && data.map(data => (
                    <Link
                        key={data.id}
                        id={data.id}
                        type="button"
                        className="btn"
                        to={data.link ? data.link : "#"}
                        style={{
                            backgroundColor: data.color ? data.color : "white",
                            color: data.color ? "white" : "black"
                        }}
                        onContextMenu={handleRightClickEvent}
                    >
                        {data.title ? data.title : "Right click to edit"}
                    </Link>
                ))}

            </section>
        </>
    );
}

export default Home;