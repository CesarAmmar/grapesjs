import { getRandomColor } from "../utils/Colors";

export const addHardDriveWiping = (editor) => {
  editor.DomComponents.addType("hard-drive-wiping", {
    model: {
      defaults: {
        tagName: "div",
        classes: ["hard-drive-wiping"],
        content: "<p>Hard Drive Wiping Section</p>",
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

  editor.BlockManager.add("hard-drive-wiping-block", {
    label: "Hard Drive Wiping",
    content: { type: "hard-drive-wiping" },
    category: "Custom",
    attributes: { class: "fa fa-hdd" },
  });
};
