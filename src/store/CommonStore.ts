import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { SampleServices } from "../data/SampleServices";
import { ServiceAndCharges } from "../model/ServiceAndCharges";
import { JobOperationalProcess } from "../model/JobOperationalProcess";
import { Currency } from "../model/Currency";
import { OpProcessParty } from "../model/OpProcessParty";
import { Uom } from "../model/Uom";


export default class CommonStore {

    loadingInitial = false;

    jobOperationalProcess: JobOperationalProcess[] | undefined;
    currencyList: Currency[] | undefined;
    OpProcessPartyList: OpProcessParty[] | undefined;
    UomList: Uom[] | undefined;

    constructor() {
        makeAutoObservable(this)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    get getJobOperationalProcess() {
        //console.log(this.jobOperationalProcess);
        return this.jobOperationalProcess;
    }

    loadJobOperationalProcess = async () => {
        // console.log('loadJobOperationalProcess');
        this.loadingInitial = true;

        try {
            const jobOps = await agent.jobOperationalProcess.list("5011");
            runInAction(() => {
                //console.log(jobOps);
                this.jobOperationalProcess = jobOps;
                // console.log(this.jobOperationalProcess);
                // jobOps.forEach(ops => {
                //     this.setOperationalProcess(ops);
                // })
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    get getCurrencyList() {
        return this.currencyList;
    }

    loadCurrencyList = async () => {
        //console.log('loadCurrencyList');
        this.loadingInitial = true;

        try {
            const currencyList = await agent.currency.list();
            runInAction(() => {
                //console.log(currencyList);
                this.currencyList = currencyList;
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }


    get getOpProcessPartyList() {
        return this.OpProcessPartyList;
    }

    loadOpProcessPartyList = async (operationalProcessId: string) => {
        this.loadingInitial = true;
        try {
            const OpProcessPartyList = await agent.OpProcessParties.list(operationalProcessId);
            runInAction(() => {
                //console.log(currencyList);
                this.OpProcessPartyList = OpProcessPartyList;
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    get getUomList() {
        return this.UomList;
    }

    loadUomList = async () => {
        this.loadingInitial = true;
        try {
            const UomList = await agent.uom.list();
            runInAction(() => {
                //console.log(currencyList);
                this.UomList = UomList;
                this.setLoadingInitial(false);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }
}