import React from "react";
import MonacoEditor from "@monaco-editor/react";
import sampleScehma from "./sample.json";

export default function Editor({ setSchema }) {
    function handleEditorChange(value, event) {
        try {
            setSchema(JSON.parse(value));
        } catch (err) {
            setSchema(null);
        }
    }

    function handleEditorMount(editor, monaco) {
        try {
            setSchema(JSON.parse(editor.getValue()));
        } catch (err) {
            setSchema(null);
        }
    }

    return (
        <MonacoEditor
            defaultLanguage="json"
            defaultValue={JSON.stringify(sampleScehma, undefined, 4)}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
        />
    );
}
