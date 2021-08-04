import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import ServiceAndChargeStore from "./ServiceAndChargeStore";

interface Store {
    servicesAndChargeStore: ServiceAndChargeStore,
    commonStore: CommonStore
}

export const store: Store = {
    servicesAndChargeStore: new ServiceAndChargeStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}