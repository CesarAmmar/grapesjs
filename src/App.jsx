import grapesjs from "grapesjs";
import { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import "./App.css";
import { addPlugin } from "./plugins/AddPlugin";
import { pluginsData } from "./plugins/plugins";
import { apiPluginsData } from "./plugins/apiPluginsData";

const HTML_TEMPLATE = `
<body id="iawz"><div id="i0m9" class="hardware-discovery"><p>hardware-discovery Section</p></div></body>
`;
const CSS_TEMPLATE = `
* { box-sizing: border-box; } body {margin: 0;}#i0m9{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:100px;margin:10px;border:1px solid black;}
`;

export default function App() {
  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    async function setupEditor() {
      try {
        if (!editorRef.current) {
          const editorInstance = grapesjs.init({
            container: "#gjs",
            plugins: [
              (editor) => {
                pluginsData.forEach((plugin) => addPlugin(editor, plugin));
              },
            ],
            storageManager: false,
          });

          // Load the saved template
          editorInstance.setComponents(HTML_TEMPLATE);
          editorInstance.setStyle(CSS_TEMPLATE);

          // Reapply custom traits to loaded components
          reapplyCustomTraits(editorInstance);

          editorRef.current = editorInstance;
          setEditor(editorInstance);
        }
      } catch (error) {
        console.error("Error initializing editor:", error);
      }
    }

    setupEditor();
  }, []);

  const reapplyCustomTraits = (editor) => {
    const components = editor.Components.getComponents();
    components.forEach((component) => {
      const classes = component.getClasses();
      apiPluginsData.forEach((plugin) => {
        if (classes.includes(plugin.name)) {
          const traitsWithValues = plugin.traits.map((trait) => ({
            ...trait,
            value: trait?.value || "",
            command: trait?.command
              ? (editor) => {
                  editor.runCommand(trait?.command, trait?.commandOptions);
                }
              : undefined,
          }));
          component.set({ traits: traitsWithValues });
        }
      });
    });
  };

  const getOutput = () => {
    if (editorRef.current) {
      const htmlOutput = editorRef.current.getHtml();
      const cssOutput = editorRef.current.getCss();
      const components = editorRef.current.Components.getComponents();
      const allTraits = components.map((component) => {
        const componentName = component.getClasses()[0];
        const traits = component.get("traits");
        return {
          name: componentName,
          traits: traits.map((trait) => {
            const commandName = trait.attributes?.commandName;
            const commandOptions = trait.attributes?.commandOptions;
            return {
              name: trait.get("name"),
              value: trait.get("value"),
              type: trait.get("type"),
              options: trait.attributes?.options,
              command: commandName,
              commandOptions: commandOptions,
            };
          }),
        };
      });

      console.log("HTML Output:", htmlOutput);
      console.log("CSS Output:", cssOutput);
      console.log("Traits: ", JSON.stringify(allTraits));
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
