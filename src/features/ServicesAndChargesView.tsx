import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import LoadingComponent from "../layout/LoadingComponent";
import { useStore } from "../store/Store";
import { TreeList } from "devextreme-react";
import { Column, Editing, Lookup, Selection } from "devextreme-react/tree-list";
import { JobOperationalProcess } from "../model/JobOperationalProcess";
import { ServiceLine } from "../model/ServiceLine";
import RequestedByEditor from "./RequestedByEditor";

export default observer(function ServicesAndChargesView() {

    const { servicesAndChargeStore, commonStore } = useStore();
    const { getAllservices, loadServices, serviceRegistry } = servicesAndChargeStore;
    const { getJobOperationalProcess, jobOperationalProcess, loadJobOperationalProcess,
        getCurrencyList, loadCurrencyList,
        getOpProcessPartyList, loadOpProcessPartyList,
        getUomList, loadUomList
    } = commonStore;

    useEffect(() => {
        //console.log('useEffect ServicesAndChargesView');
        if (getUomList?.length === 0 || getUomList === undefined) loadUomList();
        if (jobOperationalProcess?.length === 0 || jobOperationalProcess === undefined) loadJobOperationalProcess();
        if (getCurrencyList?.length === 0 || getCurrencyList === undefined) loadCurrencyList();
        if (serviceRegistry.size <= 1) loadServices();

    }, [jobOperationalProcess?.length, loadJobOperationalProcess, serviceRegistry.size, loadServices, getCurrencyList, loadCurrencyList])

    if (servicesAndChargeStore.loadingInitial) return <LoadingComponent content='Loading Customers...' />


    function operationalProcessLookupDataDisplay(data: JobOperationalProcess) {
        // console.log("JobOperationalProcess", data);
        return `${data.OperationalProcessName} | ${data.ProcessReferenceNumber}`;
    }

    function operationalProcessSetCellValue(newData: ServiceLine, value: any, rowData: ServiceLine) {
        //console.log("newData", newData);
        // console.log("value", value);
        // console.log("rowData", rowData);
    }

    function costCurrencySetCellValue(newData: ServiceLine, value: any, rowData: ServiceLine) {
        console.log("readonly row values", rowData);
        newData.CostCurrencyCode = value;
        newData.CostCurrencyExchangeRate = 50;
    }

    function RequestedByCellTemplate(container: any, options: any) {
        var noBreakSpace = '\u00A0',
            text = ([...options.value] || []).map(element => {
                return options.column.lookup.calculateCellValue(element);
            }).join(', ');
        container.textContent = text || noBreakSpace;
        container.title = text;
    }

    return (
        <>
            <h1>ServicesAndChargesView</h1>
            <TreeList
                id="serviceLineGrid"
                dataSource={getAllservices}
                showRowLines={true}
                showBorders={true}
                columnAutoWidth={true}
                itemsExpr="charges"
                dataStructure="tree"
                keyExpr="JobServiceAndChargeId"
                focusedRowEnabled={true}

            >
                <Selection mode="single" />
                <Editing
                    allowAdding={false}
                    allowUpdating={true}
                    allowDeleting={false}
                    mode="cell" />


                <Column dataField="OperationalProcessName" caption="Operational Process" setCellValue={operationalProcessSetCellValue}>
                    <Lookup
                        dataSource={getJobOperationalProcess}
                        valueExpr="OperationalProcessName"
                        displayExpr={operationalProcessLookupDataDisplay}
                    />
                </Column>

                <Column dataField="Name" caption="Service/Charge Name" />

                <Column dataField="RequestedBy" caption="Requested By"
                    cellTemplate={RequestedByCellTemplate}
                    editCellComponent={RequestedByEditor}>
                    <Lookup
                        dataSource={getOpProcessPartyList}
                        valueExpr="operationalProcessPartyId"
                        displayExpr="commonName"
                    />
                </Column>

                <Column dataField="SupplierName" caption="Supplier" />

                <Column dataField="Quantity" caption="Quantity" />

                <Column dataField="UomCode" caption="UOM" >
                    <Lookup
                        dataSource={getUomList}
                        valueExpr="code"
                        displayExpr="code"
                    />
                </Column>

                <Column dataField="UnitCost" caption="Unit Cost" />

                <Column dataField="CostCurrencyCode" caption="Cost Currency" setCellValue={costCurrencySetCellValue}>
                    <Lookup
                        dataSource={getCurrencyList}
                        valueExpr="code"
                        displayExpr="code"
                    />
                </Column>

                <Column dataField="EstimatedTotalCost" caption="Est. Total Cost" />

                <Column dataField="TaxTypeCode" caption="Tax Type" />

                <Column dataField="TaxRate" caption="Tax Rate %" />

                <Column dataField="TaxAmount" caption="Tax Amount" />

                <Column dataField="EstimatedTotalCostIncTax" caption="Est. Total Cost (incl. Tax)" />

                <Column dataField="ActualTotalCostForeign" caption="Actual Cost (Foreign)" />

                <Column dataField="ActualTaxAmount" caption="Actual Tax Amount" />

                <Column dataField="CostCurrencyExchangeRate" caption="Exchange Rate" />

                <Column dataField="ActualCostLocal" caption="Actual Cost (Local)" />

                <Column dataField="CostVariance" caption="Cost Variance" />

                <Column dataField="ServiceRequestNo" caption="Service Request #" />

                <Column dataField="StatusName" caption="SR Status" />

                <Column dataField="Rating" caption="Rating" />

                <Column dataField="Servicestatus" caption="Service Status" />

                <Column dataField="StartTime" caption="Start Date/Time " />

                <Column dataField="EndTime" caption="End Date/Time  " />

                <Column dataField="CompletedTime" caption="Completed Date/Time" />

                <Column dataField="Remarks" caption="Remarks" />

            </TreeList>
            <pre> {JSON.stringify(getOpProcessPartyList, null, 2)} </pre>
        </>
    )
});