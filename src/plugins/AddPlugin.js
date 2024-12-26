export const addPlugin = (editor, pluginData) => {
  const { name, icon, content, style = {}, traits = [] } = pluginData;

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
        traits: traits,
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

  const addSelectElement = (editor, sender, opts = {}, options) => {
    const selected = editor.getSelected();
    if (selected) {
      let optionsToAdd = options;
      const oldTraits = selected.get("traits").toJSON();
      const categoriesSelected = oldTraits.filter(
        (trait) => trait.type === "checkbox" && trait.value
      );
      if (
        categoriesSelected.length > 0 &&
        categoriesSelected[0].name === "memory"
      ) {
        optionsToAdd.push({
          id: 3,
          name: "Column3",
        });
      }
      const selectName = `columns_${Date.now()}`;

      const traits = oldTraits.concat([
        {
          type: "select",
          label: "Columns",
          name: selectName,
          options: optionsToAdd,
        },
        {
          type: "button",
          label: "Remove Columns",
          text: "Remove",
          name: `remove_${selectName}`,
          command: (editor) => {
            editor.runCommand("remove-column-trait", {
              buttonName: `remove_${selectName}`,
            });
          },
          commandOptions: {
            buttonName: `remove_${selectName}`,
          },
          commandName: "remove-column-trait",
        },
      ]);

      selected.set("traits", traits);

      console.log("New select added:", selectName);
    } else {
      console.warn("No component selected to add a trait!");
    }
  };

  editor.Commands.add("add-column-trait", {
    run(editor, sender, opts = {}) {
      const options = [
        {
          id: "1-customField",
          name: "Custom Field 1",
        },
        {
          id: "1-pseudoColumn",
          name: "Pseudo column 1",
        },
      ];
      addSelectElement(editor, sender, opts, options);
    },
  });

  editor.Commands.add("remove-column-trait", {
    run(editor, sender, opts = {}) {
      const selected = editor.getSelected();
      if (selected) {
        const buttonName = opts.buttonName;
        if (!buttonName) {
          console.warn("Button name not provided in command options!");
          return;
        }

        const selectName = buttonName.replace("remove_", "");

        const updatedTraits = selected
          .get("traits")
          .toJSON()
          .filter(
            (trait) => trait.name !== selectName && trait.name !== buttonName
          );
        const attributes = { ...selected.getAttributes() };
        delete attributes[selectName];
        selected.setAttributes(attributes);

        selected.set("traits", updatedTraits);

        console.log(`Removed trait: ${selectName}`);
      }
    },
  });

  editor.BlockManager.add(`${name}-block`, {
    label: name.charAt(0).toUpperCase() + name.slice(1),
    content: { type: name },
    category: "Custom",
    attributes: { class: `fa ${icon}` },
  });
};
