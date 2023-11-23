import React, { useEffect, useState } from "react";
import Description from "../../Description/Description";

export default function Input({ data, setJson, showAdvanced }) {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (data.validate.required || showAdvanced) {
            setJson((prev) => {
                prev[data.jsonKey] = value;
                return JSON.parse(JSON.stringify(prev));
            });
        } else {
            setJson((prev) => {
                delete prev[data.jsonKey];
                return JSON.parse(JSON.stringify(prev));
            });
        }
    }, [value, showAdvanced, data, setJson]);

    try {
        function handleOnChange(event) {
            const { value } = event.target;
            setValue(value);
        }

        return (
            <div className={`row m-0`}>
                <label for={data.jsonKey} className="col-6 col-form-label ps-0">
                    {data.label.replace(/_/g, " ")}
                    {data.validate.required && (
                        <span className="text-danger">*</span>
                    )}
                    {data.description && (
                        <Description description={data.description} />
                    )}
                </label>
                <div className="col-6 pe-0">
                    <input
                        type="email"
                        className="form-control"
                        id={data.jsonKey}
                        placeholder={data.placeholder}
                        required={data.validate.required}
                        readOnly={data.validate.immutable}
                        onChange={handleOnChange}
                        pattern={data.validate.pattern}
                    />
                </div>
            </div>
        );
    } catch (err) {
        return (
            <div className="fw-bold my-auto text-center text-danger">
                Incorrect Schema in Input {data.label}!
            </div>
        );
    }
}
