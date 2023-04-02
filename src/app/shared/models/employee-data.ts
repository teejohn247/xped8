import { ValidatorFn } from "@angular/forms";

export interface EmployeeData {
    id: number;
    "Employee ID": string;
    "Image": string;
    "First Name": string;
    "Last Name": string;
    "Email Address": string;
    "Phone Number": string;
    "Department": string;
    "Role": string
}

export interface EmployeeTable {
    key: string,
    label: string,
    order: number,
    columnWidth: string,
    cellStyle: string,
    sortable: boolean
}

export interface EmployeeFormData {
    controlName: string,
    controlType: string,
    controlLabel: string,
    controlWidth: string,
    initialValue: string,
    selectOptions?: {[key: string]: string},
    validators?: ValidatorFn[],
    order: number
}