export interface JobOperationalProcess {
    JobOperationalProcessId: number;
    Version: number;
    CreatedBy: string;
    CreatedAt: Date;
    ModifiedBy: string;
    ModifiedAt: Date;
    IsActive: boolean;
    JobFk: number;
    ProcessOrder: number;
    ProcessReferenceNumber: string;
    OperationalProcessCode: string;
    OperationalProcessName: string;
    OperationalProcessDetails: string;
    PicCode: string;
    CompanyCode: string;
    CompanyName: string;
    OfficeCode: string;
    OfficeName: string;
    DepartmentCode: string;
    DepartmentName: string;
    CurrencyCode: string;
    CurrencyName: string;
    VesselCallNumber: string;
}
