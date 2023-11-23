import React, { useEffect, useState } from "react";
import Description from "../../Description/Description";

export default function Switch({ data, setJson, showAdvanced }) {
    const [checked, setChecked] = useState(data.validate.defaultValue);

    useEffect(() => {
        if (data.validate.required || showAdvanced) {
            setJson((prev) => {
                prev[data.jsonKey] = checked;
                return JSON.parse(JSON.stringify(prev));
            });
        } else {
            setJson((prev) => {
                delete prev[data.jsonKey];
                return JSON.parse(JSON.stringify(prev));
            });
        }
    }, [checked, showAdvanced, data, setJson]);

    function handleOnChange(event) {
        const { checked } = event.target;
        setChecked(checked);
    }

    try {
        return (
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={data.jsonKey}
                    checked={checked}
                    onChange={handleOnChange}
                />
                <label className="form-check-label" for={data.jsonKey}>
                    {data.label.replace(/_/g, " ")}
                    {data.description && (
                        <Description description={data.description} />
                    )}
                </label>
            </div>
        );
    } catch (err) {
        return (
            <div className="fw-bold my-auto text-center text-danger">
                Incorrect Schema in Switch {data.label}!
            </div>
        );
    }
}
