import React from "react";

export default function Modal({ title, content }) {
    return (
        <div
            className="modal fade"
            id="modal"
            tabindex="-1"
            aria-labelledby="modalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{title}</h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <pre>
                            <code>{content}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
