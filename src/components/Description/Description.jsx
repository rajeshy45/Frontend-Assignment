import React, { useEffect, useRef } from "react";
import Icon from "./circle-info-solid.svg";
import { Tooltip } from "bootstrap";

export default function Description({ description }) {
    const tooltipRef = useRef();

    useEffect(() => {
        var tooltip = new Tooltip(tooltipRef.current, {
            title: description,
            trigger: "hover",
        });
    });

    return (
        <img
            src={Icon}
            alt="description"
            ref={tooltipRef}
            width="16px"
            height="16px"
            className="ms-1"
        />
    );
}
