import React, { useState, useEffect } from "react";
import Form from "../Form";

export default function Ignore({ data, json, setJson, showAdvanced }) {
    const [ignoreJson, setIgnoreJson] = useState({});
    const [action, setAction] = useState("enable");

    function evaluateConditions() {
        try {
            for (const condition of data.conditions) {
                let props = condition.jsonKey.split(".");

                let val = null;
                for (const prop of props) {
                    val = json[prop];
                }

                if (condition.op === "==") {
                    if (val === condition.value) {
                        setAction(condition.action);
                    } else {
                        setAction(null);
                    }
                } else {
                    setAction(null);
                }
            }
        } catch (err) {
            console.log(err);
            setAction(null);
        }
    }

    useEffect(() => {
        evaluateConditions();
    }, [json]);

    useEffect(() => {
        if ((data.validate.required || showAdvanced) && action === "enable") {
            setJson((prev) => {
                prev[data.jsonKey] = ignoreJson;
                return JSON.parse(JSON.stringify(prev));
            });
        } else {
            setJson((prev) => {
                delete prev[data.jsonKey];
                return JSON.parse(JSON.stringify(prev));
            });
        }
    }, [ignoreJson, showAdvanced, data, setJson, action]);

    try {
        return (
            <div className={`${action !== "enable" ? "d-none" : ""}`}>
                <Form
                    schema={data.subParameters}
                    level={data.level + 1}
                    json={ignoreJson}
                    setJson={setIgnoreJson}
                />
            </div>
        );
    } catch (err) {
        return (
            <div className="fw-bold my-auto text-center text-danger">
                Incorrect Schema in Ignore {data.label}!
            </div>
        );
    }
}
