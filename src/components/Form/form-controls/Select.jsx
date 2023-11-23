import React, { useEffect, useState } from "react";
import Description from "../../Description/Description";

export default function Select({ data, setJson, showAdvanced }) {
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
        setJson((prev) => {
            prev[data.jsonKey] = value;
            return prev;
        });
    }

    try {
        return (
            <div className={`row`}>
                <div className="col-6">
                    <label for={data.jsonKey} className="col-form-label w-100">
                        {data.label.replace(/_/g, " ")}
                        {data.validate.required && (
                            <span className="text-danger">*</span>
                        )}
                    </label>
                </div>
                <div className="col-6">
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleOnChange}
                        id={data.jsonKey}
                    >
                        {data.validate.options.map((option) => {
                            return (
                                <option
                                    value={option.value}
                                    selected={selectedValue === option.value}
                                >
                                    {option.label.replace(/_/g, " ")}
                                    {option.description && (
                                        <Description
                                            description={option.description}
                                        />
                                    )}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        );
    } catch (err) {
        return (
            <div className="fw-bold my-auto text-center text-danger">
                Incorrect Schema in Select {data.label}!
            </div>
        );
    }
}
