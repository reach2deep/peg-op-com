import axios, { AxiosResponse } from 'axios';
import { SampleServices } from '../data/SampleServices';
import { Currency } from '../model/Currency';
import { JobOperationalProcess } from '../model/JobOperationalProcess';
import { OpProcessParty } from '../model/OpProcessParty';
import { ServiceAndCharges } from '../model/ServiceAndCharges';
import { ServiceLine } from '../model/ServiceLine';
import { Uom } from '../model/Uom';



const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://dev-pegasus.gac.com';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Appian-API-Key'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjMmVmOTYwNi0xNGFlLTQ5NDMtOTQyNy0xMDVmN2RlZmZmYzAifQ.tV_aC4B-Nbkp_5Oquq3o9RAgri75ir5kW75nyl5bYNU';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }

})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

// const operationalProcess = {
//     list: (id: string) => requests.get<OperationalProcess[]>(`/suite/webapi/jobService-getAllOpProcessByJobId?jobId=${id}`),
// }
// const service = {
//     list: (operationalProcessId: string) => requests.get<UomData[]>(`/suite/webapi/jobService-getServicesByOPId?productCode=${operationalProcessId}`),
// }

// const charge = {
//     list: (operationalProcessCode: string, serviceCode: string) =>
//         requests.get<UomData[]>(`/suite/webapi/jobService-getChargesByServiceCode?productCode=${operationalProcessCode}%serviceCode=${serviceCode}`),
// }

// const party = {
//     list: (operationalProcessId: string) => requests.get<UomData[]>(`/suite/webapi/jobService-getAllPartiesByOpId?opId=${operationalProcessId}`),
// }

// const supplier = {
//     list: () => requests.get<UomData[]>(`/suite/webapi/jobService-getSupplierBySearchText`),
// }

// const tax = {
//     list: (companyCode: string) => requests.get<UomData[]>(`/suite/webapi/jobService-getAllTaxDetailsByCompanyCode?companyCode=${companyCode}`),
// }

const uom = {
    list: () => requests.get<Uom[]>(`/suite/webapi/jobService-getMdmUomPicker`),
}

const currency = {
    list: () => requests.get<Currency[]>(`/suite/webapi/jobService-getMdmCurrencyPicker`),
}

const serviceAndCharges = {
    details: (id: string) => requests.get<ServiceAndCharges>(`/suite/webapi/jobService-getAllJobServiceV2?jobId=${id}`)
    // details: (id: string) => { return (SampleServices as unknown as ServiceAndCharges) }
}

const jobOperationalProcess = {
    list: (id: string) => requests.get<JobOperationalProcess[]>(`/suite/webapi/jobService-getAllOpProcessByJobId?jobId=${id}`),
}

const OpProcessParties = {
    list: (operationalProcessId: string) => requests.get<OpProcessParty[]>(`/suite/webapi/jobService-getAllPartiesByOpId?opId=${operationalProcessId}`),
}


// const CustomerServiceAndCharges = {
//     details: (id: string) => requests.get<ServiceLine[]>(`/suite/webapi/jobService-getCustomerDetailsByJobId?jobId=${id}`)
// }

const agent = {
    // operationalProcess,
    // service,
    // charge,
    // supplier,
    // party,
    // tax,
    // uom,
    // currency,
    serviceAndCharges,
    jobOperationalProcess,
    currency,
    OpProcessParties,
    uom
}

export default agent;