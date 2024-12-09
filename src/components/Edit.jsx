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
        'silver', 'gray', 'maroon',
        'red', 'purple', 'fuchsia',
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
    }

    const submitHandler = (e) => {
        e.preventDefault();
        be.post('/' + id + '/update', btn)
            .catch(err => console.log(err))
            .then(navigate(Path.HOME, { state: btn }));
    };

    return (
        <form className="form-container">

                <label htmlFor="title">Button Title</label>
                <input
                    type="text"
                    id="title"
                    className="input_field"
                    value={title ? title : ''}
                    onChange={handleInputChange}
                />

                <label htmlFor="link">Button Link</label>
                <input
                    type="url"
                    id="link"
                    className="input_field"
                    value={link ? link : ''}
                    onChange={handleInputChange}
                />

                <label htmlFor="color">Button Color</label>
                <select
                    id='color'
                    className="input_field"
                    onChange={handleInputChange}
                    defaultChecked={color}
                >
                    <option value={color}>{color}</option>
                    {standardColors.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>

            <section className="btn-container">
                <button
                    className="btn btn-submit"
                    onClick={submitHandler}
                >
                    Save
                </button>

                <button
                    className="btn btn-reset"
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