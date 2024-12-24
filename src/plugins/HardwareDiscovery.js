import { getRandomColor } from "../utils/Colors";

export const addHardwareDiscovery = (editor) => {
  editor.DomComponents.addType("hardware-discovery", {
    model: {
      defaults: {
        tagName: "div",
        classes: ["hardware-discovery"],
        content: "<p>Hardware Discovery Section</p>",
        style: {
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
          "align-items": "center",
          padding: "100px",
          margin: "10px",
          border: `8px solid ${getRandomColor()}`,
        },
      },
    },
  });

  editor.BlockManager.add("hardware-discovery-block", {
    label: "Hardware Discovery",
    content: { type: "hardware-discovery" },
    category: "Custom",
    attributes: { class: "fa fa-desktop" },
  });
};
