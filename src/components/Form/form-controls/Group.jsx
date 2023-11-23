import React, { useEffect, useState } from "react";
import Form from "../Form";
import Description from "../../Description/Description";

export default function Group({ data, setJson, showAdvanced }) {
    const [groupJson, setGroupJson] = useState({});

    useEffect(() => {
        if (data.validate.required || showAdvanced) {
            setJson((prev) => {
                prev[data.jsonKey] = groupJson;
                return JSON.parse(JSON.stringify(prev));
            });
        } else {
            setJson((prev) => {
                delete prev[data.jsonKey];
                return JSON.parse(JSON.stringify(prev));
            });
        }
    }, [groupJson, showAdvanced, data, setJson]);

    try {
        return (
            <>
                <p className="border-bottom pb-1 mb-2">
                    {data.label.replace(/_/g, " ")}
                    {data.description && (
                        <Description description={data.description} />
                    )}
                    {data.validate.required && (
                        <span className="text-danger">*</span>
                    )}
                </p>
                <Form
                    schema={data.subParameters}
                    level={data.level + 1}
                    json={groupJson}
                    setJson={setGroupJson}
                />
            </>
        );
    } catch (err) {
        return (
            <div className="fw-bold my-auto text-center text-danger">
                Incorrect Schema in Group {data.label}!
            </div>
        );
    }
}
