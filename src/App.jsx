import Header from "./components/Header";
import styles from "./App.module.scss";
import Editor from "./components/Editor/Editor";
import { useEffect, useState } from "react";
import Form from "./components/Form/Form";

function App() {
    const [schema, setSchema] = useState(null); // stores the UI Schema
    const [json, setJson] = useState({}); // stores the request JSON

    // resetting json whenever schema changes
    useEffect(() => {
        setJson({});
    }, [schema, setJson]);

    return (
        <div className={`${styles.App} p-2`}>
            <Header title={"React Form Builder"} size={4} />
            <div
                className={`${styles["main-section"]} container mx-auto row p-0`}
            >
                <div className="col border border-light-subtle rounded py-2 d-flex flex-column gap-2">
                    <Header title={"UI Schema"} size={5} />
                    <Editor setSchema={setSchema} />
                </div>
                <div className="col h-100 border border-light-subtle rounded py-2 d-flex flex-column gap-2">
                    <Header title={"Output"} size={5} />
                    {schema ? (
                        <Form
                            schema={schema}
                            level={0}
                            json={json}
                            setJson={setJson}
                        />
                    ) : (
                        <div className="fw-bold my-auto text-center text-danger">
                            Invalid Schema!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
