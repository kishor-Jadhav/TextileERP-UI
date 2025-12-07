export enum COMMON_APIS {
  newRegistration = "/authpermit/v1/registration",
  signInApi = "/auth/loginuser",
  getLoggedInUser = "/api/v1/users/getloggedUserProfile/",
  upladprofileImg = "/api/v1/upladprofileImg",
}
//PHP
// export enum COMMON_APIS {
//   newRegistration = "/authpermit/v1/registration",
//   //signInApi = "/auth/loginuser",
//   signInApi = "/controllers/LoginController.php",
//   getLoggedInUser = "/api/v1/users/getloggedUserProfile/",
//   upladprofileImg = "/api/v1/upladprofileImg",
// }
export enum TEST_APIS {

  getAllUsers = "/api/v1/getAllUsers",
  getadmin = "/api/v2/auth/getadmin",
  getuser = "/api/v2/user/getuser",

}
export enum ERP_APIS {

  getCityMaster = "/api/v1/user/getcity",
  getcityData = "/api/v1/user/getcityData",
  saveCityMaster = "/api/v1/user/savecitymaster",
  updatecitymaster = "/api/v1/user/updatecitymaster",

  getFirmMaster = "/api/v1/getfirm",
  getfirmData = "/api/v1/getfirmData",
  saveFirmMaster = "/api/v1/savefirmmaster",
  updatefirmmaster = "/api/v1/updatefirmmaster",

  getPartyMaster = "/api/v1/getparty",
  getpartyData = "/api/v1/getpartyData",
  savePartyMaster = "/api/v1/savepartymaster",
  updatepartymaster = "/api/v1/updatepartymaster",

  getLoomMaster = "/api/v1/getloommaster",
  saveLoomMaster = "/api/v1/saveloomaster",
  deleteLoomMaster = "/api/v1/deleteloomaster",
  getloommasterpageble = "/api/v1/getloommasterpageble",
  getloommasteronscroll = "/api/v1/getloommasteronscroll",


  getCountList = "/api/v1/getCountList",
  getQualityList = "/api/v1/getQualityList",
  getDesignList = "/api/v1/getDesignList",
  getCount = "/api/v1/getCount",
  getQuality = "/api/v1/getQuality",
  getdesign = "/api/v1/getdesign",
  saveCount = "/api/v1/saveCount",
  savequality = "/api/v1/savequality",
  savedesign = "/api/v1/savedesign",
  updateCount = "/api/v1/updateCount",
  updatequality = "/api/v1/updatequality",
  updatedesign = "/api/v1/updatedesign",


  //Reports
  exportLoomMaster = "/api/v1/excel/downloadloom",
  exportPDFLoomMaster = "/api/v1/pdf/downloadloom",
  exportJasperLoomMaster = "/api/v1/jsper/downloadloom",
  exportDesignMaster = "/api/v1/jsper/downloaddesign",
  exportQualityMaster = "/api/v1/jsper/downloadqualitydetailreport",

  //utility
  getregisteruser = "/api/v2/auth/getregisteruser",
  saveregisteruser = "/api/v2/auth/saveregisteruser",
  updateregisteruser = "/api/v2/auth/updateregisteruser",
  getregisteruserlist = "/api/v2/auth/getregisteruserlist",
  getnewuserlist = "/api/v2/auth/getnewuserlist",

  // User Config
  getuserconfig = "/api/v1/getuserconfig",
  getusermenuconfiglist = "/api/v1/getusermenuconfiglist",

  //Client Master
  getclientlist = "/api/v2/auth/getclientlist",
  getclient = "/api/v2/auth/getclient",
  saveappclient = "/api/v2/auth/saveappclient",
  updateappclient = "/api/v2/auth/updateappclient",

  //Client Project Master
  getclientprojlist = "/api/v2/auth/getclientprojlist",
  getclientproj = "/api/v2/auth/getclientproj",
  saveappclientproj = "/api/v2/auth/saveappclientproj",
  updateappclientproj = "/api/v2/auth/updateappclientproj",
   

  //Menu
  getMenulist = "/api/v2/auth/getMenulist",
  getMenu = "/api/v2/auth/getMenu",
  saveMenu = "/api/v2/auth/saveMenu",
  updateMenu = "/api/v2/auth/updateMenu",
  deleteMenu = "/api/v2/auth/deleteMenu",

  //Menu Group
  getMenuGrouplist = "/api/v2/auth/getMenuGrouplist",
  getMenuGroup = "/api/v2/auth/getMenuGroup",
  saveMenuGroup = "/api/v2/auth/saveMenuGroup",
  updateMenuGroup = "/api/v2/auth/updateMenuGroup",
  deleteMenuGroup = "/api/v2/auth/deleteMenuGroup",

  //Menu Group
  getuserassigngrouplist = "/api/v2/auth/getuserassigngrouplist",
  getuserassigngroup = "/api/v2/auth/getuserassigngroup",
  savegetuserassigngroup = "/api/v2/auth/savegetuserassigngroup",
  updategetuserassigngroup = "/api/v2/auth/updategetuserassigngroup",
  deletegetuserassigngroup = "/api/v2/auth/deletegetuserassigngroup",

  //Fill API
  getclientprojbyClientname = "/api/v2/auth/getclientprojbyClientname",

}
// export enum ERP_APIS {

//   getCityMaster = "/api/v1/user/getcity",
//   getcityData = "/api/v1/user/getcityData",
//   saveCityMaster = "/api/v1/user/savecitymaster",
//   updatecitymaster = "/api/v1/user/updatecitymaster",

//   getFirmMaster = "/api/v1/getfirm",
//   getfirmData = "/api/v1/getfirmData",
//   saveFirmMaster = "/api/v1/savefirmmaster",
//   updatefirmmaster = "/api/v1/updatefirmmaster",

//   getPartyMaster = "/api/v1/getparty",
//   getpartyData = "/api/v1/getpartyData",
//   savePartyMaster = "/api/v1/savepartymaster",
//   updatepartymaster = "/api/v1/updatepartymaster",

//   getLoomMaster = "/api/v1/getloommaster",
//   saveLoomMaster = "/api/v1/saveloomaster",
//   deleteLoomMaster = "/api/v1/deleteloomaster",
//   getloommasterpageble = "/api/v1/getloommasterpageble",
//   getloommasteronscroll = "/api/v1/getloommasteronscroll",


//   getCountList = "/api/v1/getCountList",
//   getQualityList = "/api/v1/getQualityList",
//   getDesignList = "/api/v1/getDesignList",
//   getCount = "/api/v1/getCount",
//   getQuality = "/api/v1/getQuality",
//   getdesign = "/api/v1/getdesign",
//   saveCount = "/api/v1/saveCount",
//   savequality = "/api/v1/savequality",
//   savedesign = "/api/v1/savedesign",
//   updateCount = "/api/v1/updateCount",
//   updatequality = "/api/v1/updatequality",
//   updatedesign = "/api/v1/updatedesign",


//   //Reports
//   exportLoomMaster = "/api/v1/excel/downloadloom",
//   exportPDFLoomMaster = "/api/v1/pdf/downloadloom",
//   exportJasperLoomMaster = "/api/v1/jsper/downloadloom",
//   exportDesignMaster = "/api/v1/jsper/downloaddesign",
//   exportQualityMaster = "/api/v1/jsper/downloadqualitydetailreport",

//   //utility
//   getregisteruser = "/api/v2/auth/getregisteruser",
//   saveregisteruser = "/api/v2/auth/saveregisteruser",
//   updateregisteruser = "/api/v2/auth/updateregisteruser",
//   getregisteruserlist = "/api/v2/auth/getregisteruserlist",

//   // User Config
//   getuserconfig = "/api/v1/getuserconfig",
//   getusermenuconfiglist = "/api/v1/getusermenuconfiglist",

//   //Client Master
//   getclientlist = "/api/v2/auth/getclientlist",
//   getclient = "/api/v2/auth/getclient",
//   saveappclient = "/api/v2/auth/saveappclient",
//   updateappclient = "/api/v2/auth/updateappclient",

//   //Client Project Master
//   //getclientprojlist = "/api/v2/auth/getclientprojlist",
//   //getclientproj = "/api/v2/auth/getclientproj",
//   //saveappclientproj = "/api/v2/auth/saveappclientproj",
//   //updateappclientproj = "/api/v2/auth/updateappclientproj",
//   //php
//   getclientprojlist = "/pages/AppClientProjectMaster/list.php",
//   getclientproj = "/pages/AppClientProjectMaster/view.php",
//   saveappclientproj = "/pages/AppClientProjectMaster/add.php",
//   updateappclientproj = "/pages/AppClientProjectMaster/edit.php",

//   //Menu
//   getMenulist = "/api/v2/auth/getMenulist",
//   getMenu = "/api/v2/auth/getMenu",
//   saveMenu = "/api/v2/auth/saveMenu",
//   updateMenu = "/api/v2/auth/updateMenu",
//   deleteMenu = "/api/v2/auth/deleteMenu",

//   //Menu Group
//   getMenuGrouplist = "/api/v2/auth/getMenuGrouplist",
//   getMenuGroup = "/api/v2/auth/getMenuGroup",
//   saveMenuGroup = "/api/v2/auth/saveMenuGroup",
//   updateMenuGroup = "/api/v2/auth/updateMenuGroup",
//   deleteMenuGroup = "/api/v2/auth/deleteMenuGroup",

//   //Menu Group
//   getuserassigngrouplist = "/api/v2/auth/getuserassigngrouplist",
//   getuserassigngroup = "/api/v2/auth/getuserassigngroup",
//   savegetuserassigngroup = "/api/v2/auth/savegetuserassigngroup",
//   updategetuserassigngroup = "/api/v2/auth/updategetuserassigngroup",
//   deletegetuserassigngroup = "/api/v2/auth/deletegetuserassigngroup",

//   //Fill API
//   getclientprojbyClientname = "/api/v2/auth/getclientprojbyClientname",

// }

export const UNIT_ID = 1;