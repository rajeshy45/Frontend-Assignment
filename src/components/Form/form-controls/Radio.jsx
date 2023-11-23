import React, { useEffect, useState } from "react";
import Description from "../../Description/Description";

export default function Radio({ data, setJson, showAdvanced }) {
    const [selectedValue, setSelectedValue] = useState(
        data.validate.defaultValue
    );

    useEffect(() => {
        if (data.validate.required || showAdvanced) {
            setJson((prev) => {
                prev[data.jsonKey] = selectedValue;
                return JSON.parse(JSON.stringify(prev));
            });
        } else {
            setJson((prev) => {
                delete prev[data.jsonKey];
                return JSON.parse(JSON.stringify(prev));
            });
        }
    }, [selectedValue, showAdvanced, data, setJson]);

    function handleOnChange(event) {
        const { value } = event.target;
        setSelectedValue(value);
    }

    try {
        return (
            <div className={`row row-cols-2 m-0`}>
                {data.validate.options.map((option, idx) => {
                    return (
                        <div key={idx} className="col p-0">
                            <div
                                className={`form-check p-2 text-center border rounded ${
                                    selectedValue === option.value
                                        ? "bg-info bg-opacity-10 border-info"
                                        : "border-light-subtle"
                                } ${idx % 2 ? "ms-2" : "me-2"}`}
                            >
                                <input
                                    className="form-check-input d-none"
                                    type="radio"
                                    name={data.label}
                                    id={option.value}
                                    value={option.value}
                                    onChange={handleOnChange}
                                    readOnly={data.validate.immutable}
                                />
                                <label
                                    class="form-check-label w-100"
                                    for={option.value}
                                >
                                    {option.label.replace(/_/g, " ")}
                                    {option.description && (
                                        <Description
                                            description={option.description}
                                        />
                                    )}
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } catch (err) {
        return (
            <div className="fw-bold my-auto text-center text-danger">
                Incorrect Schema in Radio {data.label}!
            </div>
        );
    }
}
