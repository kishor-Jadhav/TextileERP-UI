 // ApplicationConfig.js

export const getHeaderConfig = (navigate, setSearchTerm) => ({
  title: {
    visible: false,
    label: "KJ Controll Lib",
    class: "",
  },
  leftLogo: {
    visible: true,
    logoImgUrl: "https://primefaces.org/cdn/primereact/images/logo.png",
    height: "40",
    class: "",
  },
  menuItems: [
    {
      label: "Master",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "General",
          icon: "pi pi-fw pi-plus",
          items: [
            {
              label: "City Master",
              icon: "pi pi-fw pi-repeat",
              command: () => navigate("cityMaster"), // 🚀 this does the routing
            },
            { label: "Firm Master", icon: "pi pi-fw pi-undo", command: () => navigate("firmMaster"), },
            { label: "Party/Contact/Employee Master", icon: "pi pi-fw pi-repeat", command: () => navigate("partyMaster")},
          ],
        },
        {
          label: "ERP Master",
          icon: "pi pi-fw pi-external-link",
          items: [
            { label: "Loom Master", icon: "pi pi-fw pi-undo",  command: () => navigate("loomMaster"), },
            { label: "Yarn Master", icon: "pi pi-fw pi-undo" },
            { label: "Flange Master", icon: "pi pi-fw pi-undo" },
            { label: "Quality Master", icon: "pi pi-fw pi-repeat" },
            { label: "Design Master", icon: "pi pi-fw pi-repeat" },
          ],
        },
      ],
    },
    {
      label: "Transcation",
      icon: "pi pi-fw pi-pencil",
      items: [
        { label: "Undo", icon: "pi pi-fw pi-undo" },
        { label: "Redo", icon: "pi pi-fw pi-repeat" },
      ],
    },
    {
      label: "Reports",
      icon: "pi pi-fw pi-question",
      items: [{ label: "About", icon: "pi pi-fw pi-info" }],
    },
    {
      label: "Utility",
      icon: "pi pi-fw pi-question",
      items: [{ label: "About", icon: "pi pi-fw pi-info" }],
    },
  ],

  endButtons: {
    visible: true,
    buttonsItem: [
      {
        type: "icon",
        visible: false,
        label: "Add Item",
        icon: "pi pi-plus",
        className: "p-button-success",
        onClick: () => alert("Button Clicked!"),
      },
    ],
  },
  rightSearchBox: {
    visible: false,
    placeholder: "Search in menu...",
    onSearch: (value) => setSearchTerm(value),
  },
  profileMenu: {
    visible: true,
    items: [
      { label: "View Profile", icon: "pi pi-user", command: () => alert("View Profile Clicked") },
      { label: "Settings", icon: "pi pi-cog", command: () => alert("Settings Clicked") },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: () => alert("Logout Clicked"),
      },
    ],
  },
});


   