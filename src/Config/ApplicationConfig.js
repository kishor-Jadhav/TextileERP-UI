 // ApplicationConfig.js
function buildMenuItems(data, navigate) {
    // Helper to get icon by menu name (customize as needed)
    const getIcon = (name) => {
        const icons = {
            "Master": "pi pi-fw pi-file",
            "General": "pi pi-fw pi-plus",
            "ERP Master": "pi pi-fw pi-external-link",
            "Transaction": "pi pi-fw pi-pencil",
            "Reports": "pi pi-fw pi-question",
            "Utility": "pi pi-fw pi-question",
            "City Master": "pi pi-fw pi-repeat",
            "Firm Master": "pi pi-fw pi-undo",
            "Party Master": "pi pi-fw pi-repeat",
            "Loom Master": "pi pi-fw pi-undo",
            "Count Master": "pi pi-fw pi-undo",
            "Quality Master": "pi pi-fw pi-repeat",
            "Design Master": "pi pi-fw pi-repeat",
            "Client Master": "pi pi-fw pi-repeat",
            "Project Master": "pi pi-fw pi-repeat",
            "User Creation": "pi pi-fw pi-repeat",
            "Menu Master": "pi pi-fw pi-repeat",
            "User Menu Access Group": "pi pi-fw pi-repeat",
            "User Access Group": "pi pi-fw pi-repeat",
        };
        return icons[name] || "pi pi-fw pi-file";
    };

    // Build a map of menuId to menu item
    const menuMap = {};
    data.forEach(item => {
        const m = item.userMenuMaster;
        menuMap[m.menuId] = {
            label: m.menuName,
            icon: getIcon(m.menuName),
            ...(m.menuRoute ? { command: () => navigate(m.menuRoute) } : {}),
            items: []
        };
    });

    // Build tree structure
    data.forEach(item => {
        const m = item.userMenuMaster;
        if (m.menuLevel > 0 && menuMap[m.parentMenuId]) {
            menuMap[m.parentMenuId].items.push(menuMap[m.menuId]);
        }
    });

    // Get top-level menus (level 0)
    const menuItems = Object.values(menuMap).filter(m => {
        // Find the menuId for this menu object
        const menuId = Object.keys(menuMap).find(key => menuMap[key] === m);
        // Find the corresponding data item with menuLevel 0
        return data.some(d => d.userMenuMaster.menuId == menuId && d.userMenuMaster.menuLevel === 0);
    });
    // If you want specific order or grouping, sort or group as needed here
    return menuItems;
}


export const getHeaderConfig = (navigate,data, setSearchTerm) => ({
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
     menuItems: buildMenuItems(data,navigate),

     endButtons: {
         visible: true,
         buttonsItem: [{
             type: "icon",
             visible: false,
             label: "Add Item",
             icon: "pi pi-plus",
             className: "p-button-success",
             onClick: () => alert("Button Clicked!"),
         }, ],
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
// Usage:
// const menuItems = buildMenuItems(jsonResponse, navigate);
 export const getHeaderConfig1 = (navigate, setSearchTerm) => ({
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
     menuItems: [{
             label: "Master",
             icon: "pi pi-fw pi-file",
             items: [{
                     label: "General",
                     icon: "pi pi-fw pi-plus",
                     items: [{
                             label: "City Master",
                             icon: "pi pi-fw pi-repeat",
                             command: () => navigate("cityMaster"), // 🚀 this does the routing
                         },
                         { label: "Firm Master", icon: "pi pi-fw pi-undo", command: () => navigate("firmMaster"), },
                         { label: "Party/Contact/Employee Master", icon: "pi pi-fw pi-repeat", command: () => navigate("partyMaster") },
                     ],
                 },
                 {
                     label: "ERP Master",
                     icon: "pi pi-fw pi-external-link",
                     items: [
                         { label: "Loom Master", icon: "pi pi-fw pi-undo", command: () => navigate("loomMaster"), },
                         { label: "Count Master", icon: "pi pi-fw pi-undo", command: () => navigate("countmaster") },
                         { label: "Flange Master", icon: "pi pi-fw pi-undo" },
                         { label: "Quality Master", icon: "pi pi-fw pi-repeat", command: () => navigate("quality") },
                         { label: "Design Master", icon: "pi pi-fw pi-repeat", command: () => navigate("design") },
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
             items: [
                 { label: "Client Master", icon: "pi pi-fw pi-repeat", command: () => navigate("applicationclient") },
                 { label: "Project Master", icon: "pi pi-fw pi-repeat", command: () => navigate("applicationproject") },
                 { label: "User creation", icon: "pi pi-fw pi-repeat", command: () => navigate("createusers") },
                 { label: "Menu Master", icon: "pi pi-fw pi-repeat", command: () => navigate("applicationmenu") },
                 { label: "User Menu Access Group", icon: "pi pi-fw pi-repeat", command: () => navigate("usermenugroup") },
                 { label: "User Access Group", icon: "pi pi-fw pi-repeat", command: () => navigate("useraccessgroup") },
             ],
         },
     ],

     endButtons: {
         visible: true,
         buttonsItem: [{
             type: "icon",
             visible: false,
             label: "Add Item",
             icon: "pi pi-plus",
             className: "p-button-success",
             onClick: () => alert("Button Clicked!"),
         }, ],
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