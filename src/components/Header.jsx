import React from "react";

export default function Header({ title, size }) {
    return (
        <div className="header container border border-light-subtle p-2 rounded">
            <p className={`fs-${size} fw-bold m-0`}>{title}</p>
        </div>
    )
}