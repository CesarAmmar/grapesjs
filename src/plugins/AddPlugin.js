export const addPlugin = (editor, pluginData) => {
  const { name, icon, content, style = {} } = pluginData;

  editor.DomComponents.addType(name, {
    model: {
      defaults: {
        tagName: "div",
        classes: [name],
        content: content || `<p>${name} Section</p>`,
        style: {
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
          "align-items": "center",
          padding: "100px",
          margin: "10px",
          border: "1px solid black",
          ...style,
        },
        traits: [
          {
            type: "text",
            label: "Title",
            name: "title",
          },
          {
            type: "textarea",
            label: "Description",
            name: "description",
          },
          {
            type: "color",
            label: "Border Color",
            name: "borderColor",
          },
        ],
      },

      init() {
        this.on("change:borderColor", this.handleBorderColorChange);
      },
      handleBorderColorChange() {
        const newBorderColor = this.get("borderColor");
        this.addStyle({ border: `2px solid ${newBorderColor}` });
      },
    },
  });

  editor.BlockManager.add(`${name}-block`, {
    label: name.charAt(0).toUpperCase() + name.slice(1),
    content: { type: name },
    category: "Custom",
    attributes: { class: `fa ${icon}` },
  });
};
