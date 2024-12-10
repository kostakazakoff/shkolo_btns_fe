import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import be from "../helpers/Api.js";
import Path from "../helpers/paths.js";


const Edit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [btn, setBtn] = useState(location.state);
    const [reset, setReset] = useState(false);

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

    const handleInputChange = (e) => {
        const k = e.target.id;
        const v = e.target.value
        setBtn(oldState => ({ ...oldState, [k]: v }));
    };

    const handleClear = (e) => {
        e.preventDefault();
        setBtn(oldState => ({
            ...oldState,
            'title': null,
            'link': null,
            'color': null
        }))
        setReset(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        reset
        ? be.post(`/${id}/clear`)
            .then(navigate(Path.HOME, { state: btn }))
            .catch(err => console.log(err))
        : be.post(`/${id}/update`, btn)
            .then(navigate(Path.HOME, { state: btn }))
            .catch(err => console.log(err));
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