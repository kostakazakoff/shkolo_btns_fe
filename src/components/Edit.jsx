import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import be from "../helpers/Api.js";
import Path from "../helpers/paths.js";


const Edit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [btn, setBtn] = useState(location.state);

    const id = btn.id;
    const title = btn.title;
    const link = btn.link;
    const color = btn.color;

    const standardColors = [
        'silver', 'gray', 'maroon', 'red', 'purple', 'fuchsia',
        'green', 'lime', 'olive',
        'navy', 'blue', 'teal', 'aqua'
    ];

    useEffect(() => {
        console.log(location);
    }, [location]);

    const handleInputChange = (e) => {
        const k = e.target.id;
        const v = e.target.value
        setBtn(oldState => ({ ...oldState, [k]: v }));
    };

    const handleClear = (e) => {
        e.preventDefault();
        be.post('/' + id + '/clear')
        .then(setBtn(oldState => ({
             ...oldState,
             'title': null,
             'link': null,
             'color': null
            })))
            .catch(err => console.log(err))
            // .then(navigate(Path.HOME));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        be.post('/' + id + '/update', btn)
            .catch(err => console.log(err))
            .then(navigate(Path.HOME, { state: btn }));
    };

    return (
        <form className="container">

            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title ? title : ''}
                    onChange={handleInputChange}
                />

                <label htmlFor="link">Link</label>
                <input
                    type="url"
                    id="link"
                    value={link ? link : ''}
                    onChange={handleInputChange}
                />

                <label htmlFor="color">Color</label>
                <select
                    id='color'
                    onChange={handleInputChange}
                    defaultChecked={color}
                >
                    <option value={color}>{color}</option>
                    {standardColors.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            <section className="btn-container">
                <button
                    className="btn"
                    onClick={submitHandler}
                >
                    Save
                </button>

                <button
                    className="btn"
                    onClick={handleClear}
                >
                    Clear
                </button>

                <Link
                    type="button"
                    className="btn"
                    to={Path.HOME}
                >
                    Cancel
                </Link>
            </section>
        </form>
    );
}

export default Edit;