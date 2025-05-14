import { ERP_APIS } from "../../Constants/ApplicationConstants/ApplicationConstants";
import axiosInstance from "../../GlobalService/axiosConfig";

export const CityMasterService = {
  async getCityMaster (){
      
      try {
          const response = await axiosInstance.get(ERP_APIS.getCityMaster);        
          if (response) {
               
              return response.data;
          }
          console.error(response);
      } catch (error) {       
        //  throw error;
        return {error:"Somethig went wrong"}
      }
  },
  async getCityMasterFormDataAPI(cityId){
      
    try {
        const response = await axiosInstance.get(`${ERP_APIS.getcityData}/${cityId}`);        
        if (response) {
             
            return response.data;
        }
        console.error(response);
    } catch (error) {       
      //  throw error;
      return {error:"Somethig went wrong"}
    }
},
  async saveCityMaster (payLoad){
      
    try {
        const response = await axiosInstance.post(ERP_APIS.saveCityMaster,payLoad);        
        if (response) {
             
            return response.data;
        }
        console.error(response);
    } catch (error) {       
      //  throw error;
      return {error:"Somethig went wrong"}
    }
},
async updateCityMaster (payLoad){
      
  try {
      const response = await axiosInstance.post(ERP_APIS.updatecitymaster,payLoad);        
      if (response) {
           
          return response.data;
      }
      console.error(response);
  } catch (error) {       
    //  throw error;
    return {error:"Somethig went wrong"}
  }
},
  getCityMasterJSON() {
    return [
      {
        cityId: "1",
        cityName: "Sangli",
        state: "Maharashtra",
        pinCode: "416416",
      },
      {
        cityId: "2",
        cityName: "Mumbai",
        state: "Maharashtra",
        pinCode: "516416",
      },
      {
        cityId: "3",
        cityName: "Kolhapur",
        state: "Maharashtra",
        pinCode: "516416",
      },
      {
        cityId: "4",
        cityName: "Satara",
        state: "Maharashtra",
        pinCode: "516416",
      },
    ];
  },

  getCityMasterData() {
    return Promise.resolve(this.getCityMaster());
  },
  getCityMasterFormData(id) {
    return Promise.resolve(
      this.getCityMasterFormDataAPI(id)
    );
  },
};

export const FirmMasterService = {
  async getFirmMasterApi (){
      
      try {
          const response = await axiosInstance.get(ERP_APIS.getFirmMaster);        
          if (response) {
               
              return response.data;
          }
          console.error(response);
      } catch (error) {       
        //  throw error;
        return {error:"Somethig went wrong"}
      }
  },
  async getFirmMasterFormDataAPI(firmId){
      
    try {
        const response = await axiosInstance.get(`${ERP_APIS.getfirmData}/${firmId}`);        
        if (response) {
             
            return response.data;
        }
        console.error(response);
    } catch (error) {       
      //  throw error;
      return {error:"Somethig went wrong"}
    }
},
  async saveFirmMaster (payLoad){
      
    try {
        const response = await axiosInstance.post(ERP_APIS.saveFirmMaster,payLoad);        
        if (response) {
             
            return response.data;
        }
        console.error(response);
    } catch (error) {       
      //  throw error;
      return {error:"Somethig went wrong"}
    }
},
async updateFirmMaster (payLoad){
      
  try {
      const response = await axiosInstance.post(ERP_APIS.updatefirmmaster,payLoad);        
      if (response) {
           
          return response.data;
      }
      console.error(response);
  } catch (error) {       
    //  throw error;
    return {error:"Somethig went wrong"}
  }
},
  getFirmMaster() {
    return [
      {
        firmId: "1",
        firmName: "Radha Textile",
        address: "dvdvsvsdv",
        panNo: "24342",
        cityId: "1",
        cityName: "Sangli",
        state: "Maharashtra",
        pinCode: "416416",
        bankName:"",
        accountNo:"",
        bankAddress:"",
      },
      {
        firmId: "2",
        firmName: "Rihan Textile",
        address: "dvsvd dgdf",
        panNo: "24342",
        cityId: "2",
        cityName: "Mumbai",
        state: "Maharashtra",
        pinCode: "516416",
        bankName:"SBI",
        accountNo:"1234ac",
        bankAddress:"ascaasc acacac",
      },
      {
        firmId: "3",
        firmName: "Fab Textile",
        address: "refv rvev",
        panNo: "24342",
        cityId: "3",
        cityName: "Kolhapur",
        state: "Maharashtra",
        pinCode: "516416",
        bankName:"Fedral",
        accountNo:"76445",
        bankAddress:"fgnfn fdfbd",
      },
      {
        firmId: "4",
        firmName: "RadNeha Textile",
        address: "cvcfd vfd",
        panNo: "24342",
        cityId: "4",
        cityName: "Satara",
        state: "Maharashtra",
        pinCode: "516416",
        bankName:"Axis",
        accountNo:"bsdb fgdg",
        bankAddress:"fbdfbd sdfbd",
      },
    ];
  },

  getFirmMasterData() {
    return Promise.resolve(this.getFirmMasterApi());
  },
  getFirmMasterFormData(id) {
    return Promise.resolve(
      this.getFirmMasterFormDataAPI(id)
    );
  },
};

export const PartyMasterService = {
  async getPartyMasterApi (){
      
    try {
        const response = await axiosInstance.get(ERP_APIS.getPartyMaster);        
        if (response) {
             
            return response.data;
        }
        console.error(response);
    } catch (error) {       
      //  throw error;
      return {error:"Somethig went wrong"}
    }
},
async getPartyMasterFormDataAPI(partyId){
    
  try {
      const response = await axiosInstance.get(`${ERP_APIS.getpartyData}/${partyId}`);        
      if (response) {
           
          return response.data;
      }
      console.error(response);
  } catch (error) {       
    //  throw error;
    return {error:"Somethig went wrong"}
  }
},
async savePartyMaster (payLoad){
    
  try {
      const response = await axiosInstance.post(ERP_APIS.savePartyMaster,payLoad);        
      if (response) {
           
          return response.data;
      }
      console.error(response);
  } catch (error) {       
    //  throw error;
    return {error:"Somethig went wrong"}
  }
},
async updatePartyMaster (payLoad){
    
try {
    const response = await axiosInstance.post(ERP_APIS.updatepartymaster,payLoad);        
    if (response) {
         
        return response.data;
    }
    console.error(response);
} catch (error) {       
  //  throw error;
  return {error:"Somethig went wrong"}
}
},
  getPartyMaster() {
    return [
      {
        partyId: "1",
        partyName: "Radha Textile",
        partAddress: "dvdvsvsdv",
        partyCategoryId:"1",
        partyCategoryName:"Party",
        panNo: "24342",
        cityId: "1",
        cityName: "Sangli",
        state: "Maharashtra",
        pinCode: "416416",
        mobNo:"",
        phNo:"",
        emailId:"",
        brokerId:"2",
        brokerName:"Manohar Textile",
        gstNo:"sca",
      },
      {
        partyId: "2",
        partyName: "Manohar Textile",
        partAddress: "dvdvsvsdv",
        partyCategoryId:"9",
        partyCategoryName:"Broker",
        panNo: "24342",
        cityId: "21",
        cityName: "Sangli",
        state: "Maharashtra",
        pinCode: "416416",
        mobNo:"",
        phNo:"",
        emailId:"",
        brokerId:"9",
        brokerName:"Usuf",
        gstNo:"sdfs",
      },
      {
        partyId: "3",
        partyName: "Radhe mohan Textile",
        partAddress: "dvdvsvsdv",
        partyCategoryId:"3",
        partyCategoryName:"Warping",
        panNo: "24342",
        cityId: "3",
        cityName: "Sangli",
        state: "Maharashtra",
        pinCode: "416416",
        mobNo:"",
        phNo:"",
        emailId:"",
        brokerId:"4",
        brokerName:"Om Textile",
        gstNo:"",
      },
      {
        partyId: "4",
        partyName: "Om Textile",
        partAddress: "dvdvsvsdv",
        partyCategoryId:"9",
        partyCategoryName:"broker",
        panNo: "24342",
        cityId: "1",
        cityName: "Sangli",
        state: "Maharashtra",
        pinCode: "416416",
        mobNo:"",
        phNo:"",
        emailId:"",
        brokerId:"9",
        brokerName:"broker",
        gstNo:"",
      },
    ];
  },

  getPartyMasterData() {
    return Promise.resolve(this.getPartyMasterApi());
  },
  getBrokerMasterData() {
    let data = [];
    data =  Promise.resolve(this.getPartyMasterApi());
    return data.length? data.filter((item)=>item.brokerId == 9): [];
  },
  getPartyMasterFormData(id) {
    return Promise.resolve(
      this.getPartyMasterFormDataAPI(id)
    );
  },
};

export const CategoryService = {
  getPartyCategoryMaster() {
    return [
      {        
        partyCategoryId:"1",
        partyCategoryName:"Party",        
      },
      {        
        partyCategoryId:"2",
        partyCategoryName:"Sizing",       
      },
      {
        partyCategoryId:"3",
        partyCategoryName:"Warping",
      },
      {
        partyCategoryId:"4",
        partyCategoryName:"Godawoon",
      },
      {
        partyCategoryId:"5",
        partyCategoryName:"Winder",
      },
      {
        partyCategoryId:"6",
        partyCategoryName:"Supplier",
      },
      {
        partyCategoryId:"7",
        partyCategoryName:"Weaver",
      },
      {
        partyCategoryId:"8",
        partyCategoryName:"Transport",
      },
      {
        partyCategoryId:"9",
        partyCategoryName:"Broker",
      },
    ];
  },

  getPartyCategoryFormData() {
    return Promise.resolve(
      this.getPartyCategoryMaster() 
    );
  },
}

export const LoomMasterService = {
  async saveLoomMaster (payLoad){
    
  try {
      const response = await axiosInstance.post(ERP_APIS.saveLoomMaster,payLoad);        
      if (response) {
           
          return response.data;
      }
      console.error(response);
  } catch (error) {       
    //  throw error;
    return {error:"Somethig went wrong"}
  }
},
  getLoomMaster() {
    return [
      {
        loomMasterId: "1",
        loomNo: "1",
        shiftId: "1",
        shiftName: "1st shift",
      },
      {
        loomMasterId: "2",
        loomNo: "2",
        shiftId: "2",
        shiftName: "2st shift",
      },
      {
        loomMasterId: "3",
        loomNo: "3",
        shiftId: "2",
        shiftName: "2st shift",
      },
      {
        loomMasterId: "4",
        loomNo: "4",
        shiftId: "2",
        shiftName: "2st shift",
      },
    ];
  },
  async getLoomMasterApi (){
      
    try {
        const response = await axiosInstance.get(ERP_APIS.getLoomMaster);        
        if (response) {
             
            return response.data;
        }
        console.error(response);
    } catch (error) {       
      //  throw error;
      return {error:"Somethig went wrong"}
    }
},
 async deleteLoomMasterApi (loomId){
    
  try {
      const response = await axiosInstance.get(`${ERP_APIS.deleteLoomMaster}/${loomId}`);        
      if (response) {
           
          return response.data;
      }
      console.error(response);
  } catch (error) {       
    //  throw error;
    return {error:"Somethig went wrong"}
  }
},
  getLoomMasterData() {
    return Promise.resolve(this.getLoomMasterApi());
  },
   deleteLoomMasterData(loomId) {
    return Promise.resolve(this.deleteLoomMasterApi(loomId));
  },
};