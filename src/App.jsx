import grapesjs from "grapesjs";
import { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import "./App.css";
import customPlugins from "./CustomPlugins";

export default function App() {
  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = grapesjs.init({
        container: "#gjs",
        plugins: [customPlugins],
      });

      editorRef.current = editorInstance;
      setEditor(editorInstance);
    }
  }, []);

  const getOutput = () => {
    if (editorRef.current) {
      const htmlOutput = editorRef.current.getHtml();
      const cssOutput = editorRef.current.getCss();
      console.log("HTML Output:", htmlOutput);
      console.log("CSS Output:", cssOutput);
    }
  };

  return (
    <div className="GrapesJsApp">
      <div className="Editor">
        <div id="gjs" style={{ height: "100%" }} />
      </div>
      <button onClick={getOutput} style={{ marginTop: "10px" }}>
        Generate Template
      </button>
    </div>
  );
}
