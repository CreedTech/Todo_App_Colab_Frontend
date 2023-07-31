import { useState } from "react";

export const Organisation= (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: 
    event.target.value });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await callback(); 
    };

    return {
        onChange,
        onSubmit,
        values,
    };

}