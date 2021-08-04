export interface OpProcessParty {
    remarks:                   string;
    isBillingParty:            boolean;
    partyTypeCode:             string;
    isActive:                  boolean;
    addressFk:                 number;
    code:                      string;
    emailAddress:              string;
    phone:                     string;
    country:                   string;
    city:                      string;
    postalAddress:             string;
    commonName:                string;
    legalName:                 string;
    partyType:                 string;
    jobOperationalProcessFk:   number;
    operationalProcessPartyId: number;
}
