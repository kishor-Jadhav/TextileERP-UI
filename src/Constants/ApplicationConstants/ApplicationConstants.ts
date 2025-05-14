export enum COMMON_APIS {
    newRegistration= "/authpermit/v1/registration",
    signInApi= "/auth/loginuser",
    getLoggedInUser= "/api/v1/users/getloggedUserProfile/",
    upladprofileImg= "/api/v1/upladprofileImg",     
  }

  export enum TEST_APIS {
     
    getAllUsers= "/api/v1/getAllUsers",
    getadmin= "/api/v2/auth/getadmin",
    getuser= "/api/v2/user/getuser",
     
  }

  export enum ERP_APIS {
     
    getCityMaster= "/api/v1/getcity",
    getcityData= "/api/v1/getcityData",
    saveCityMaster= "/api/v1/savecitymaster",
    updatecitymaster= "/api/v1/updatecitymaster",

    getFirmMaster= "/api/v1/getfirm",
    getfirmData= "/api/v1/getfirmData",
    saveFirmMaster= "/api/v1/savefirmmaster",
    updatefirmmaster= "/api/v1/updatefirmmaster",

    getPartyMaster= "/api/v1/getparty",
    getpartyData= "/api/v1/getpartyData",
    savePartyMaster= "/api/v1/savepartymaster",
    updatepartymaster= "/api/v1/updatepartymaster",

    getLoomMaster= "/api/v1/getloommaster",
    saveLoomMaster= "/api/v1/saveloomaster",
    deleteLoomMaster= "/api/v1/deleteloomaster",
  }

  export const UNIT_ID = 1;