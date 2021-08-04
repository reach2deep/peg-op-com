import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { SampleServices } from "../data/SampleServices";
import { ServiceAndCharges } from "../model/ServiceAndCharges";
import { ServiceLine } from "../model/ServiceLine";


export default class ServiceAndChargeStore {

    editMode = false;
    loading = false;
    loadingInitial = false;

    serviceRegistry = new Map<string, ServiceLine>();
    selectedService: ServiceLine | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    get getAllservices() {
        return Array.from(this.serviceRegistry.values());
    }


    loadServices = async () => {
        // console.log('loadServices');
        this.loadingInitial = true;
        try {
            //console.log(SampleServices as unknown as ServiceAndCharges);
            const serviceAndCharges = await agent.serviceAndCharges.details("5011");
            runInAction(() => {
                //console.log(serviceAndCharges);
                serviceAndCharges.Services.forEach(service => {
                    this.setExpense(service);
                })
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }


    private setExpense = (svc: ServiceLine) => {
        //  console.log(svc);
        this.serviceRegistry.set(svc.JobServiceAndChargeId.toString(), svc)
    }
}