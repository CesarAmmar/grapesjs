export const pluginsData = [
  {
    name: "hardware-discovery",
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
      {
        type: "checkbox",
        label: "Memory",
        name: "memory",
      },
      {
        type: "button",
        label: "Add Column",
        text: "Add Column",
        name: "addColumn",
        command: "add-column-trait",
        commandName: "add-column-trait",
      },
    ],
  },
  {
    name: "hard-drive-wiping",
  },
];
