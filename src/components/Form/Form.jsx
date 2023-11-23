import React, { useState } from "react";
import getFormControl from "./form-controls/getFormControl";
import Modal from "../Modal";

export default function Form({ schema, level, json, setJson }) {
    try {
        // show advanced fields toggle
        const [showAdvanced, setShowAdvanced] = useState(false);

        function handleShowAdvancedChange(event) {
            const { checked } = event.target;
            setShowAdvanced(checked);
        }

        // checking for fields that are optional
        let displayShowAdvanced = false;
        for (const data of schema) {
            if (!data.validate.required) {
                displayShowAdvanced = true;
                break;
            }
        }

        return (
            <div
                className={`d-flex flex-column gap-2 ${
                    level === 0 ? "border border-light-subtle rounded p-2" : ""
                }`}
            >
                {schema &&
                    schema.map((data) => {
                        const Component = getFormControl(data.uiType);
                        return Component ? (
                            <div
                                className={`${
                                    !data.validate.required && !showAdvanced
                                        ? "d-none"
                                        : ""
                                } ${ // border only for outer form elements
                                    level === 0
                                        ? "border border-light-subtle rounded p-2"
                                        : ""
                                }`}
                            >
                                <Component
                                    data={data}
                                    json={json}
                                    setJson={setJson}
                                    showAdvanced={showAdvanced}
                                />
                            </div>
                        ) : (
                            <></>
                        );
                    })}
                <div
                    className={`d-flex mt-2 ${
                        !displayShowAdvanced && level !== 0 ? "d-none" : ""
                    }`}
                >
                    <div
                        class={`form-check form-switch form-check-reverse ${
                            !displayShowAdvanced ? "d-none" : ""
                        }`}
                    >
                        <label
                            class="form-check-label"
                            for="flexSwitchCheckDefault"
                        >
                            {showAdvanced ? "Hide" : "Show"} advanced fields
                        </label>
                        <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            onChange={handleShowAdvancedChange}
                        />
                    </div>
                    {level === 0 && ( // show cancel and submit buttons only on outer (level 0) form
                        <div className="ms-auto">
                            <Modal
                                title="Request JSON"
                                content={JSON.stringify(json, undefined, 4)}
                            />
                            <button
                                type="button"
                                class="btn btn-outline-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                class="btn btn-secondary ms-2"
                                data-bs-toggle="modal"
                                data-bs-target="#modal"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (err) {
        return (
            <div className="fw-bold my-auto text-center text-danger">
                Incorrect Schema in Form level {level}!
            </div>
        );
    }
}
