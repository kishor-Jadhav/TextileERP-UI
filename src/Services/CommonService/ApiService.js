import { ERP_APIS } from "../../Constants/ApplicationConstants/ApplicationConstants";
import axiosInstance from "../../GlobalService/axiosConfig";


export const ReportService = {
    async exportDesignMasterReportApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.exportDesignMaster, {
                responseType: 'blob' // Important for file download!
            });
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },

    exportDesignMasterReport() {
        return Promise.resolve(this.exportDesignMasterReportApi());
    },

    async exportQualityMasterReportApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.exportQualityMaster, {
                responseType: 'blob' // Important for file download!
            });
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },

    exportQualityMasterReport() {
        return Promise.resolve(this.exportQualityMasterReportApi());
    },
}

export const CityMasterService = {
    async getCityMaster() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getCityMaster);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getCityMasterFormDataAPI(cityId) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getcityData}/${cityId}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveCityMaster(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveCityMaster, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateCityMaster(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updatecitymaster, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getCityMasterJSON() {
        return [{
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
    async getFirmMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getFirmMaster);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getFirmMasterFormDataAPI(firmId) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getfirmData}/${firmId}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveFirmMaster(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveFirmMaster, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateFirmMaster(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updatefirmmaster, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getFirmMaster() {
        return [{
                firmId: "1",
                firmName: "Radha Textile",
                address: "dvdvsvsdv",
                panNo: "24342",
                cityId: "1",
                cityName: "Sangli",
                state: "Maharashtra",
                pinCode: "416416",
                bankName: "",
                accountNo: "",
                bankAddress: "",
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
                bankName: "SBI",
                accountNo: "1234ac",
                bankAddress: "ascaasc acacac",
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
                bankName: "Fedral",
                accountNo: "76445",
                bankAddress: "fgnfn fdfbd",
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
                bankName: "Axis",
                accountNo: "bsdb fgdg",
                bankAddress: "fbdfbd sdfbd",
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
    async getPartyMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getPartyMaster);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getPartyMasterFormDataAPI(partyId) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getpartyData}/${partyId}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async savePartyMaster(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.savePartyMaster, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updatePartyMaster(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updatepartymaster, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getPartyMaster() {
        return [{
                partyId: "1",
                partyName: "Radha Textile",
                partAddress: "dvdvsvsdv",
                partyCategoryId: "1",
                partyCategoryName: "Party",
                panNo: "24342",
                cityId: "1",
                cityName: "Sangli",
                state: "Maharashtra",
                pinCode: "416416",
                mobNo: "",
                phNo: "",
                emailId: "",
                brokerId: "2",
                brokerName: "Manohar Textile",
                gstNo: "sca",
            },
            {
                partyId: "2",
                partyName: "Manohar Textile",
                partAddress: "dvdvsvsdv",
                partyCategoryId: "9",
                partyCategoryName: "Broker",
                panNo: "24342",
                cityId: "21",
                cityName: "Sangli",
                state: "Maharashtra",
                pinCode: "416416",
                mobNo: "",
                phNo: "",
                emailId: "",
                brokerId: "9",
                brokerName: "Usuf",
                gstNo: "sdfs",
            },
            {
                partyId: "3",
                partyName: "Radhe mohan Textile",
                partAddress: "dvdvsvsdv",
                partyCategoryId: "3",
                partyCategoryName: "Warping",
                panNo: "24342",
                cityId: "3",
                cityName: "Sangli",
                state: "Maharashtra",
                pinCode: "416416",
                mobNo: "",
                phNo: "",
                emailId: "",
                brokerId: "4",
                brokerName: "Om Textile",
                gstNo: "",
            },
            {
                partyId: "4",
                partyName: "Om Textile",
                partAddress: "dvdvsvsdv",
                partyCategoryId: "9",
                partyCategoryName: "broker",
                panNo: "24342",
                cityId: "1",
                cityName: "Sangli",
                state: "Maharashtra",
                pinCode: "416416",
                mobNo: "",
                phNo: "",
                emailId: "",
                brokerId: "9",
                brokerName: "broker",
                gstNo: "",
            },
        ];
    },

    getPartyMasterData() {
        return Promise.resolve(this.getPartyMasterApi());
    },
    getBrokerMasterData() {
        let data = [];
        data = Promise.resolve(this.getPartyMasterApi());
        return data.length ? data.filter((item) => item.brokerId == 9) : [];
    },
    getPartyMasterFormData(id) {
        return Promise.resolve(
            this.getPartyMasterFormDataAPI(id)
        );
    },
};

export const CategoryService = {
    getPartyCategoryMaster() {
        return [{
                partyCategoryId: "1",
                partyCategoryName: "Party",
            },
            {
                partyCategoryId: "2",
                partyCategoryName: "Sizing",
            },
            {
                partyCategoryId: "3",
                partyCategoryName: "Warping",
            },
            {
                partyCategoryId: "4",
                partyCategoryName: "Godawoon",
            },
            {
                partyCategoryId: "5",
                partyCategoryName: "Winder",
            },
            {
                partyCategoryId: "6",
                partyCategoryName: "Supplier",
            },
            {
                partyCategoryId: "7",
                partyCategoryName: "Weaver",
            },
            {
                partyCategoryId: "8",
                partyCategoryName: "Transport",
            },
            {
                partyCategoryId: "9",
                partyCategoryName: "Broker",
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
    async saveLoomMaster(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveLoomMaster, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getLoomMaster() {
        return [{
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
    async getLoomMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getLoomMaster);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getLoomMasterPaginationApi(page, size) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getloommasterpageble}?page=${page}&size=${size}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getLoomMasterDataOnScrollApi(page, size) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getloommasteronscroll}?page=${page}&size=${size}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async deleteLoomMasterApi(loomId) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.deleteLoomMaster}/${loomId}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async exportExcelLoomMasterApi() {
        try {
            const response = await axiosInstance.get(`${ERP_APIS.exportLoomMaster}`, {
                responseType: 'blob' // Important for file download!
            });

            return response.data; // This is a Blob
        } catch (error) {
            console.error("Export error:", error);
            return { error: "Something went wrong" };
        }
    },
    async exportPDFLoomMasterApi() {
        try {
            const response = await axiosInstance.get(`${ERP_APIS.exportJasperLoomMaster}`, {
                responseType: 'blob' // Important for file download!
            });

            return response.data; // This is a Blob
        } catch (error) {
            console.error("Export error:", error);
            return { error: "Something went wrong" };
        }
    },
    getLoomMasterData() {
        return Promise.resolve(this.getLoomMasterApi());
    },
    getLoomMasterDataPagination(page, size) {
        return Promise.resolve(this.getLoomMasterPaginationApi(page, size));
    },
    getLoomMasterDataOnScroll(page, size) {
        return Promise.resolve(this.getLoomMasterDataOnScrollApi(page, size));
    },
    deleteLoomMasterData(loomId) {
        return Promise.resolve(this.deleteLoomMasterApi(loomId));
    },
    exportLoomMasterData() {
        return Promise.resolve(this.exportPDFLoomMasterApi());
    },
};

export const CountService = {
    async getCountMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getCountList);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveCountMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveCount, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateCountMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveCount, updateCount);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getCountMasterByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getCount}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getCountMaster() {
        return Promise.resolve(this.getCountMasterApi());
    },
    saveCountMaster(payload) {
        return Promise.resolve(this.saveCountMasterapi(payload));
    },
    updateCountMaster(payload) {
        return Promise.resolve(this.updateCountMasterapi(payload));
    },
    getCountMasterById(Id) {
        return Promise.resolve(this.getCountMasterByIdApi(Id));
    },
}


export const QualityService = {
    async getQualityMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getQualityList);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveQualityMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.savequality, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateQualityMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updateQualityMaster, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getQualityMasterByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getQuality}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getQualityMaster() {
        return Promise.resolve(this.getQualityMasterApi());
    },
    saveQualityMaster(payload) {
        return Promise.resolve(this.saveQualityMasterapi(payload));
    },
    updateQualityMaster(payload) {
        return Promise.resolve(this.updateQualityMasterapi(payload));
    },
    getQualityMasterById(Id) {
        return Promise.resolve(this.getQualityMasterByIdApi(Id));
    },
}


export const DesignService = {
    async getDesignMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getDesignList);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveDesignMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.savedesign, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateDesignMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updatedesign, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getDesignMasterByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getdesign}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getDesignMaster() {
        return Promise.resolve(this.getDesignMasterApi());
    },
    saveDesignMaster(payload) {
        return Promise.resolve(this.saveDesignMasterapi(payload));
    },
    updateDesignMaster(payload) {
        return Promise.resolve(this.updateDesignMasterapi(payload));
    },
    getDesignMasterById(Id) {
        return Promise.resolve(this.getDesignMasterByIdApi(Id));
    },
}


/* Utility Form */

export const utilityService = {
    //User
    async getUserMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getnewuserlist);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveUserMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveregisteruser, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateUserMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updateregisteruser, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getUserMasterByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getregisteruser}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getUserConfigApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getuserconfig}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getUserMenuConfigListApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getusermenuconfiglist}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getUserMaster() {
        return Promise.resolve(this.getUserMasterApi());
    },
    saveUserMaster(payload) {
        return Promise.resolve(this.saveUserMasterapi(payload));
    },
    updateUserMaster(payload) {
        return Promise.resolve(this.updateUserMasterapi(payload));
    },
    getUserMasterById(Id) {
        return Promise.resolve(this.getUserMasterByIdApi(Id));
    },
    getUserConfigData(Id) {
        return Promise.resolve(this.getUserConfigApi(Id));
    },
    getUserMenuConfigList(Id) {
        return Promise.resolve(this.getUserMenuConfigListApi(Id));
    },
    //////

    //Client Master
    async getClientMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getclientlist);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveClientMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveappclient, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateClientMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updateappclient, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async geteClientMasterByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getclient}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getClientMaster() {
        return Promise.resolve(this.getClientMasterApi());
    },
    saveClientMaster(payload) {
        return Promise.resolve(this.saveClientMasterapi(payload));
    },
    updateClientMaster(payload) {
        return Promise.resolve(this.updateClientMasterapi(payload));
    },
    geteClientMasterById(Id) {
        return Promise.resolve(this.geteClientMasterByIdApi(Id));
    },

    //Client project Master
    async getClientProjectMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getclientprojlist);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveClientProjectMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveappclientproj, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateClientProjectMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updateappclientproj, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async geteClientProjectMasterByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getclientproj}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getClientProjectMaster() {
        return Promise.resolve(this.getClientProjectMasterApi());
    },
    saveClientProjectMaster(payload) {
        return Promise.resolve(this.saveClientProjectMasterapi(payload));
    },
    updateClientProjectMaster(payload) {
        return Promise.resolve(this.updateClientProjectMasterapi(payload));
    },
    geteClientProjectMasterById(Id) {
        return Promise.resolve(this.geteClientProjectMasterByIdApi(Id));
    },

    //Menu  Master
    async getMenuMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getMenulist);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveMenuMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveMenu, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateMenuMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updateMenu, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async geteMenuMasterByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getMenu}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async deleteMenuMasterApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.deleteMenu}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getMenuMaster() {
        return Promise.resolve(this.getMenuMasterApi());
    },
    saveMenuMaster(payload) {
        return Promise.resolve(this.saveMenuMasterapi(payload));
    },
    updateMenuMaster(payload) {
        return Promise.resolve(this.updateMenuMasterapi(payload));
    },
    geteMenuMasterById(Id) {
        return Promise.resolve(this.geteMenuMasterByIdApi(Id));
    },
    deleteMenuMaster(Id) {
        return Promise.resolve(this.deleteMenuMasterApi(Id));
    },
    // User Access group/Assign

    async getUserAssignGroupListApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getuserassigngrouplist);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async deleteUserAssignGroupApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.deletegetuserassigngroup}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveUserAssignGroupapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.savegetuserassigngroup, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateUserAssignGroupapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updategetuserassigngroup, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async getUserAssignGroupByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getuserassigngroup}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getUserAssignGroupList() {
        return Promise.resolve(this.getUserAssignGroupListApi());
    },
    saveUserAssignGroup(payload) {
        return Promise.resolve(this.saveUserAssignGroupapi(payload));
    },
    updateUserAssignGroup(payload) {
        return Promise.resolve(this.updateUserAssignGroupapi(payload));
    },
    getUserAssignGroupById(Id) {
        return Promise.resolve(this.getUserAssignGroupByIdApi(Id));
    },
    deleteUserAssignGroup(Id) {
        return Promise.resolve(this.deleteUserAssignGroupApi(Id));
    },


    /////////////////

    //Menu Group  Master
    async getMenuGroupMasterApi() {

        try {
            const response = await axiosInstance.get(ERP_APIS.getMenuGrouplist);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async deleteMenuGroupMasterApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.deleteMenuGroup}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async saveMenuGroupMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.saveMenuGroup, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async updateMenuGroupMasterapi(payLoad) {

        try {
            const response = await axiosInstance.post(ERP_APIS.updateMenuGroup, payLoad);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    async geteMenuGroupMasterByIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getMenuGroup}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },
    getMenuGroupMaster() {
        return Promise.resolve(this.getMenuGroupMasterApi());
    },
    saveMenuGroupMaster(payload) {
        return Promise.resolve(this.saveMenuGroupMasterapi(payload));
    },
    updateMenuGroupMaster(payload) {
        return Promise.resolve(this.updateMenuGroupMasterapi(payload));
    },
    geteMenuGroupMasterById(Id) {
        return Promise.resolve(this.geteMenuGroupMasterByIdApi(Id));
    },
    deleteMenuGroupMaster(Id) {
        return Promise.resolve(this.deleteMenuGroupMasterApi(Id));
    },

}


//Fill Controlls
export const getDropDownsService = {

    async getProjectListByClientIdApi(Id) {

        try {
            const response = await axiosInstance.get(`${ERP_APIS.getclientprojbyClientname}/${Id}`);
            if (response) {

                return response.data;
            }
            console.error(response);
        } catch (error) {
            //  throw error;
            return { error: "Somethig went wrong" }
        }
    },

    getProjectListByClientId(Id) {
        return Promise.resolve(this.getProjectListByClientIdApi(Id));
    },
}