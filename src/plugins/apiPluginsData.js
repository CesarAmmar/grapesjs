export const apiPluginsData = [
  {
    name: "hardware-discovery",
    icon: "fa-desktop",
    traits: [
      {
        type: "text",
        label: "Title",
        name: "title",
        value: "Hardware Discovery",
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
      {
        type: "checkbox",
        label: "Memory",
        name: "memory",
        value: true,
      },
      {
        type: "button",
        label: "Add Column",
        text: "Add Column",
        name: "addColumn",
        command: "add-column-trait",
        commandName: "add-column-trait",
      },
      {
        type: "select",
        label: "Columns",
        name: "columns_1735216538755",
        options: [
          {
            id: "1-customField",
            name: "Custom Field 1",
          },
          {
            id: "1-pseudoColumn",
            name: "Pseudo column 1",
          },
        ],
        value: "1-pseudoColumn",
      },
      {
        type: "button",
        label: "Remove Columns",
        text: "Remove",
        name: `remove_columns_1735216538755`,
        command: "remove-column-trait",
        commandName: "remove-column-trait",
        commandOptions: {
          buttonName: `remove_columns_1735216538755`,
        },
      },
      {
        type: "select",
        label: "Columns",
        name: "columns_1735216538756",
        options: [
          {
            id: "1-customField",
            name: "Custom Field 1",
          },
          {
            id: "1-pseudoColumn",
            name: "Pseudo column 1",
          },
        ],
        value: "1-customField",
      },
      {
        type: "button",
        label: "Remove Columns",
        text: "Remove",
        name: `remove_columns_1735216538756`,
        command: "remove-column-trait",
        commandOptions: {
          buttonName: `remove_columns_1735216538756`,
        },
      },
    ],
  },
  {
    name: "hard-drive-wiping",
    icon: "fa-hdd",
  },
];
